'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, BookOpen, MessageSquare, Settings } from 'lucide-react';

export default function AppHome() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-4 mb-10">
          <p className="text-sm uppercase tracking-wide text-slate-500">Garden Coach Console</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Plan, track, and optimize your garden
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl">
            Use the workspace to chat with the assistant, review prior sessions, and adjust garden settings.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
              <MessageSquare className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Garden Chat</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Ask for planting plans, step previews, and care recommendations.
            </p>
            <Button variant="outline" onClick={() => router.push('/chat')} className="mt-auto">
              Open Chat
              <ArrowRight />
            </Button>
          </Card>

          <Card className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
              <BookOpen className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Chat History</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Revisit past conversations and continue planning where you left off.
            </p>
            <Button variant="outline" onClick={() => router.push('/chats')} className="mt-auto">
              View History
              <ArrowRight />
            </Button>
          </Card>

          <Card className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
              <Settings className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Settings</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Configure defaults and preferences for your gardening workflow.
            </p>
            <Button onClick={() => router.push('/settings')} className="mt-auto">
              Open Settings
              <ArrowRight />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
