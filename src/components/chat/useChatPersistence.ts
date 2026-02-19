'use client';

import { useEffect, useRef } from 'react';
import type { UIMessage } from '@ai-sdk/react';
import { saveChat, loadChat } from '@/../utils/chatStore';

/**
 * Hook to handle chat message persistence
 */
export const useChatPersistence = (
  chatSessionId: string,
  messages: UIMessage[],
  setMessages: (messages: UIMessage[]) => void
) => {
  const savedMessages = useRef<UIMessage[]>([]);

  // Load messages on mount
  useEffect(() => {
    if (chatSessionId) {
      loadChat(chatSessionId)
        .then((loadedMessages) => {
          setMessages(loadedMessages);
          savedMessages.current = loadedMessages;
        })
        .catch((error) => {
          console.error('Error loading messages:', error);
        });
    }
  }, [chatSessionId, setMessages]);

  // Save new messages
  const saveNewMessages = async (allMessages: UIMessage[]) => {
    if (!chatSessionId) {
      console.log('No Chat Session Id');
      return;
    }

    const newMessages = allMessages.filter(
      (msg) =>
        !savedMessages.current.some((savedMsg) => savedMsg.id === msg.id)
    );

    if (newMessages.length === 0) {
      return;
    }

    try {
      await saveChat({
        chatSessionId,
        messages: newMessages,
      });
      // Update the ref with all messages to prevent duplicate saves
      savedMessages.current = allMessages;
      console.log('Completed the saveChat call');
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  return { saveNewMessages };
};
