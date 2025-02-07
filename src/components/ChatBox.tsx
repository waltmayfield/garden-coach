import React, { useState, useEffect } from 'react';
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
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSend = async () => {
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
  };

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
        }
      })

      return () => {
        messagesSub.unsubscribe();
      };

    }

    messageSubscriptionHandler()

  }, [params])

  return (
    <Box sx={{
      width: '100%',
      height: '90%',
      maxHeight: '90%',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <List
        sx={{ flexGrow: 1, overflow: 'auto' }}
      // ref={(el) => {
      //   if (el) { // Scroll to the bottom when the list updates
      //     el.scrollTop = el.scrollHeight;
      //   }
      // }}
      >
        {messages.map((message, index) => (
          <ListItem key={index}>
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