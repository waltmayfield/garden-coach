'use client';

import { Action, Actions } from '@/components/ai-elements/actions';
import { CopyIcon, RefreshCcwIcon } from 'lucide-react';

interface MessageActionsProps {
  text: string;
  isLastMessage: boolean;
  onRegenerate: () => void;
}

export const MessageActions = ({
  text,
  isLastMessage,
  onRegenerate,
}: MessageActionsProps) => {
  return (
    <Actions className="mt-2">
      {isLastMessage && (
        <Action onClick={onRegenerate} label="Retry">
          <RefreshCcwIcon className="size-3" />
        </Action>
      )}
      <Action
        onClick={() => navigator.clipboard.writeText(text)}
        label="Copy"
      >
        <CopyIcon className="size-3" />
      </Action>
    </Actions>
  );
};
