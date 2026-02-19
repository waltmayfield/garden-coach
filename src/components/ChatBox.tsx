'use client';

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { AgentCoreChatTransport } from '@/lib/agentCoreTransport';
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/sources';
import { Loader } from '@/components/ai-elements/loader';
import { MessageRenderer } from '@/components/chat/MessageRenderer';
import { EmptyState } from '@/components/chat/EmptyState';
import { SuggestionList } from '@/components/chat/SuggestionList';
import { useSuggestions } from '@/components/chat/useSuggestions';
import { useChatPersistence } from '@/components/chat/useChatPersistence';
// import '@/components/chat/RagToolRenderer'; // Register RAG tool renderers

const models: { name: string, id: string }[] = [
  {
    name: 'Claude Sonnet 4.5',
    id: 'us.anthropic.claude-sonnet-4-5-20250929-v1:0'
  },
  {
    name: 'Claude Haiku 3.5',
    id: 'us.anthropic.claude-3-5-haiku-20241022-v1:0'
  },
  {
    name: 'Nova Premier',
    id: 'us.amazon.nova-premier-v1:0'
  },
  {
    name: 'Claude Haiku 4.5',
    id: 'us.anthropic.claude-haiku-4-5-20251001-v1:0'
  },
  {
    name: 'Lamma3 70B Instruct',
    id: 'meta.llama3-70b-instruct-v1:0',
  },
];

interface ChatBoxProps {
  chatSessionId: string;
}

export const ChatBox = ({ chatSessionId }: ChatBoxProps) => {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<string>(models[0].id);

  const { messages, setMessages, sendMessage, status, error, regenerate } = useChat({
    transport: new AgentCoreChatTransport(),
    onFinish: async ({ messages }) => {
      console.log('onFinish called.');
      await saveNewMessages(messages);
    },
  });

  // Use custom hooks for cleaner state management
  const { suggestions, setSuggestions } = useSuggestions(messages);
  const { saveNewMessages } = useChatPersistence(chatSessionId, messages, setMessages);

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    sendMessage(
      {
        text: message.text || 'Sent with attachments',
        files: message.files,
        metadata: {
          createdAt: new Date().toISOString(),
        },
      },
      {
        body: {
          modelId: model,
          chatSessionId,
        },
      }
    );
    setInput('');
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="w-full p-6 relative h-full">
      <div className="flex flex-col h-full max-w-6xl mx-auto">
        <Conversation className="h-full">
          <ConversationContent>
            {messages.length === 0 && <EmptyState />}

            {messages.map((message, index) => (
              <div key={message.id}>
                {/* Sources */}
                {message.role === 'assistant' &&
                  message.parts.filter((part) => part.type === 'source-url')
                    .length > 0 && (
                    <Sources>
                      <SourcesTrigger
                        count={
                          message.parts.filter(
                            (part) => part.type === 'source-url'
                          ).length
                        }
                      />
                      {message.parts
                        .filter((part) => part.type === 'source-url')
                        .map((part, i) => (
                          <SourcesContent key={`${message.id}-${i}`}>
                            <Source
                              key={`${message.id}-${i}`}
                              href={part.url}
                              title={part.url}
                            />
                          </SourcesContent>
                        ))}
                    </Sources>
                  )}

                {/* Message content */}
                <MessageRenderer
                  message={message}
                  chatSessionId={chatSessionId}
                  isLastMessage={index === messages.length - 1}
                  isStreaming={status === 'streaming'}
                  onRegenerate={regenerate}
                />
              </div>
            ))}

            {status === 'submitted' && <Loader />}

            {/* Suggestions */}
            {status === 'ready' && (
              <SuggestionList
                suggestions={suggestions}
                onSuggestionClick={handleSuggestionClick}
              />
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {error && (
          <>
            <div>An error occurred.</div>
            <button type="button" onClick={() => regenerate()}>
              Retry
            </button>
            <p>{error.message}</p>
          </>
        )}



        <PromptInput onSubmit={handleSubmit} className="mt-4" globalDrop multiple>
          <PromptInputHeader>
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
          </PromptInputHeader>
          <PromptInputBody>
            <PromptInputTextarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>
              {/* <PromptInputButton
                variant={webSearch ? 'default' : 'ghost'}
                onClick={() => setWebSearch(!webSearch)}
              >
                <GlobeIcon size={16} />
                <span>Search</span>
              </PromptInputButton> */}
              <PromptInputModelSelect
                onValueChange={(value) => {
                  setModel(value);
                }}
                value={model}
              >
                <PromptInputModelSelectTrigger>
                  <PromptInputModelSelectValue />
                </PromptInputModelSelectTrigger>
                <PromptInputModelSelectContent>
                  {models.map((model) => (
                    <PromptInputModelSelectItem key={model.id} value={model.id}>
                      {model.name}
                    </PromptInputModelSelectItem>
                  ))}
                </PromptInputModelSelectContent>
              </PromptInputModelSelect>
            </PromptInputTools>
            <PromptInputSubmit disabled={!input && !status} status={status} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
};
