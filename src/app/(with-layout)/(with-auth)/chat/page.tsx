'use client';

import { useSearchParams } from 'next/navigation';
import { ChatBox } from '@/components/ChatBox';

const ChatPage = () => {
  const searchParams = useSearchParams();
  const chatSessionId = searchParams.get('id');
  const initialPrompt = searchParams.get('prompt') ?? undefined;

  if (!chatSessionId) throw new Error("No chat session Id");

  return (
    <div className="h-full flex overflow-hidden">
      {/* Chat Box - Right Side */}
      <div className="flex-1 overflow-hidden">
        <ChatBox key={`${chatSessionId}-${initialPrompt ?? 'noprompt'}`} chatSessionId={chatSessionId} initialPrompt={initialPrompt} />
      </div>
    </div>
  );
};

export default ChatPage;
