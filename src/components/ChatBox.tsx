import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, TextField, Button, List, ListItem, Typography } from '@mui/material';

import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/../amplify/data/resource";
import { combineAndSortMessages } from '../../utils/amplifyUtils';
import { Message, PlannedSteps } from '../../utils/types';

import ChatMessage from './ChatMessage';

const amplifyClient = generateClient<Schema>();

const ChatBox = (params: {
  gardenId: string,
  setPlannedSteps: (newPlannedSteps: PlannedSteps) => void,
  setGarden: (newGarden: Schema["Garden"]["createType"]) => void,
}) => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [, setResponseStreamChunks] = useState<(Schema["recieveResponseStreamChunk"]["returnType"] | null)[]>([]);
  const [streamChunkMessage, setStreamChunkMessage] = useState<Message>();
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const listRef = useRef<HTMLUListElement>(null);

  //Subscribe to the chat messages for the garden
  useEffect(() => {
    const messageSubscriptionHandler = async () => {
      console.log('Creating message subscription for garden: ', params.gardenId)
      const messagesSub = amplifyClient.models.ChatMessage.observeQuery({
        filter: {
          gardenId: { eq: params.gardenId }
        }
      }).subscribe({
        next: ({ items }) => {
          console.log('Received new messages: ', items)
          //If any of the items have the isResposeComplete flag set to true, set isLoading to false
          const isResponseComplete = items.some((message) => message.responseComplete)
          if (isResponseComplete) setIsLoading(false)
          setMessages((prevMessages) => combineAndSortMessages(prevMessages, items))
          setStreamChunkMessage(undefined)
        }
      })

      return () => {
        messagesSub.unsubscribe();
      };

    }

    messageSubscriptionHandler()

  }, [params])

  //Subscribe to the response stream chunks for the garden
  useEffect(() => {
    const responseStreamChunkSubscriptionHandler = async () => {
      console.log('Creating response stream chunk subscription for garden: ', params.gardenId)
      const responseStreamChunkSub = amplifyClient.subscriptions.recieveResponseStreamChunk({gardenId: params.gardenId}).subscribe({
        error: (error) => console.error('Error subscribing stream chunks: ', error),
        next: (newChunk) => {
          console.log('Received new response stream chunk: ', newChunk)
          setResponseStreamChunks((prevChunks) => {
            //Now Insert the new chunk into the correct position in the array
            if (newChunk.index >= 0 && newChunk.index < prevChunks.length) {
              prevChunks[newChunk.index] = newChunk;
            } else {
              // Extend the list with nulls up to the specified index
              while (prevChunks.length < newChunk.index) {
                prevChunks.push(null)
              }
              prevChunks.push(newChunk)
            }

            //Only set the chunk message if the inital chunk is defined. This prevents the race condition between the message and the chunk
            if (prevChunks[0]){
              setStreamChunkMessage({
                id: 'streamChunkMessage',
                role: 'ai',
                content: {
                  text: prevChunks.map((chunk) => chunk?.chunkText).join("")
                },
                createdAt: new Date().toISOString()
              })
            }

            return prevChunks
          })
        }
      })

      return () => {
        responseStreamChunkSub.unsubscribe();
      };

    }

    responseStreamChunkSubscriptionHandler()
  }, [params])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, streamChunkMessage]);

  const handleSend = useCallback(async () => {
    if (input.trim()) {
      setIsLoading(true);

      const newMessage: Schema['ChatMessage']['createType'] = {
        role: 'human',
        content: {
          text: input
        },
        gardenId: params.gardenId
      }
      const { data: newMessageData } = await amplifyClient.models.ChatMessage.create(newMessage)
      if (newMessageData) setMessages([...messages, {
        ...newMessage,
        id: newMessageData.id,
        createdAt: newMessageData.createdAt
      }]);

      const invokeResponse = await amplifyClient.queries.generateGarden({
        gardenId: params.gardenId,
        userInput: input
      })

      console.log('invokeResponse: ', invokeResponse)

      setInput('');
    }
  }, [input, messages, params.gardenId]);

  return (
    <Box sx={{
      width: '100%',
      height: '90%',
      maxHeight: '90%',
      // border: '1px solid #ccc',
      // borderRadius: '8px',
      padding: '8px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <List
        sx={{ flexGrow: 1, overflow: 'auto' }}
        ref={listRef}
      >
        {[
          ...messages,
          ...(streamChunkMessage ? [streamChunkMessage] : [])
        ].map((message) => (
          <ListItem key={message.id}>
            <ChatMessage 
            message={message} 
            setPlannedSteps={params.setPlannedSteps} 
            setGarden={params.setGarden}
            />
          </ListItem>
        ))}
      </List>
      {isLoading && <Box sx={{ textAlign: 'center', margin: '8px 0' }}>Loading...</Box>}
      {messages.length === 0 &&
        <Box sx={{ textAlign: 'center', margin: '8px 0' }}>
          <Typography variant="body2">Tell me about your dream garden</Typography>
        </Box>
      }
      <TextField
        fullWidth
        multiline
        variant="outlined"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            handleSend();
          }
        }}
        disabled={isLoading}
      />
      <Button variant="contained" color="primary" onClick={handleSend} sx={{ marginTop: '8px' }}>
        Send
      </Button>
    </Box>
  );
};

export default ChatBox;