'use client';

import { Fragment } from 'react';
import type { UIMessage } from '@ai-sdk/react';
import type { ToolUIPart } from 'ai';
import { Message, MessageContent } from '@/components/ai-elements/message';
import { Response } from '@/components/ai-elements/response';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from '@/components/ai-elements/tool';
import { preprocessContent } from '@/lib/htmlPreprocessing';
import { MessageActions } from '@/components/chat/MessageActions';
import { ToolRenderer } from '@/components/chat/ToolRenderer';
import { MessageImage } from '@/components/chat/MessageImage';

interface MessageRendererProps {
  message: UIMessage;
  chatSessionId: string;
  isLastMessage: boolean;
  isStreaming: boolean;
  onRegenerate: () => void;
}

// Type for message parts
type MessagePart = {
  type: string;
  text?: string;
  url?: string;
  mediaType?: string;
  filename?: string;
  [key: string]: unknown;
};

export const MessageRenderer = ({
  message,
  chatSessionId,
  isLastMessage,
  isStreaming,
  onRegenerate,
}: MessageRendererProps) => {
  return (
    <div key={message.id}>
      {message.parts.map((part: MessagePart, i: number) => {
        switch (part.type) {
          case 'text':
            return (
              <Fragment key={`${message.id}-${i}`}>
                <Message from={message.role}>
                  <MessageContent>
                    <Response>
                      {preprocessContent(part.text || '', chatSessionId)}
                    </Response>
                  </MessageContent>
                </Message>
                {message.role === 'assistant' && (
                  <MessageActions
                    text={part.text || ''}
                    isLastMessage={isLastMessage}
                    onRegenerate={onRegenerate}
                  />
                )}
              </Fragment>
            );

          case 'file':
            // Handle image/file attachments
            return (
              <Fragment key={`${message.id}-${i}`}>
                <Message from={message.role}>
                  <MessageContent>
                    <MessageImage
                      url={part.url}
                      mediaType={part.mediaType}
                      filename={part.filename}
                    />
                  </MessageContent>
                </Message>
              </Fragment>
            );

          case 'step-start':
            return null;

          case 'reasoning':
            return (
              <Reasoning
                key={`${message.id}-${i}`}
                className="w-full"
                isStreaming={
                  isStreaming &&
                  i === message.parts.length - 1 &&
                  isLastMessage
                }
              >
                <ReasoningTrigger />
                <ReasoningContent>{part.text || ''}</ReasoningContent>
              </Reasoning>
            );

          default:
            // Handle tool invocations
            if (part.type.startsWith('tool-')) {
              const toolPart = part as ToolUIPart;

              // Check if there's a custom renderer for this tool
              const customRenderer = ToolRenderer.getRenderer(toolPart.type);
              if (customRenderer) {
                return (
                  <Fragment key={`${message.id}-${i}`}>
                    {customRenderer({
                      toolPart,
                      messageId: message.id,
                      partIndex: i,
                      chatSessionId,
                    })}
                  </Fragment>
                );
              }

              // Default tool rendering
              return (
                <Tool key={`${message.id}-${i}`}>
                  <ToolHeader type={toolPart.type} state={toolPart.state} />
                  <ToolContent>
                    <ToolInput input={toolPart.input} />
                    {(toolPart.state === 'output-available' ||
                      toolPart.state === 'output-error') && (
                      <ToolOutput
                        output={toolPart.output}
                        errorText={toolPart.errorText}
                      />
                    )}
                  </ToolContent>
                </Tool>
              );
            }

            // Fallback for unhandled parts
            console.warn('Unhandled message part type:', part.type);
            return null;
        }
      })}
    </div>
  );
};
