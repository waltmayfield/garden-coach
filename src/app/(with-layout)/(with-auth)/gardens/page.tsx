'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../../amplify/data/resource';
import { createChat } from '@/../utils/chatStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sprout, Plus, MessageSquare } from 'lucide-react';

const client = generateClient<Schema>();

type GardenItem = {
  id: string;
  name: string;
  description?: string | null;
  type?: string | null;
  coordinateSystem?: string | null;
  isActive?: boolean | null;
};

export default function GardensPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [gardens, setGardens] = useState<GardenItem[]>([]);

  const loadGardens = React.useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const query = `
        query ListGardens($limit: Int, $nextToken: String) {
          listGardens(limit: $limit, nextToken: $nextToken) {
            items {
              id
              name
              description
              type
              coordinateSystem
              isActive
            }
          }
        }
      `;

      const result = await client.graphql({
        query,
        variables: { limit: 200 },
      }) as {
        data?: { listGardens?: { items?: GardenItem[] | null } };
        errors?: Array<{ message?: string }>;
      };

      if (result.errors?.length) {
        throw new Error(result.errors.map((error) => error.message ?? 'Unknown error').join('; '));
      }

      setGardens(result.data?.listGardens?.items ?? []);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to load gardens.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGardens();
  }, [loadGardens]);

  const openChatWithPrompt = async (prompt: string) => {
    try {
      const sessionId = await createChat();
      const encodedPrompt = encodeURIComponent(prompt);
      router.push(`/chat?id=${sessionId}&prompt=${encodedPrompt}`);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to open chat.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500">Gardens</p>
            <h1 className="text-3xl font-semibold text-slate-900">My Gardens</h1>
            <p className="text-slate-600 mt-2">Manage all your gardens and create new ones through natural-language chat.</p>
          </div>
          <Button
            onClick={() =>
              openChatWithPrompt(
                'Help me create a new garden. Ask me questions about space, sun exposure, dimensions, orientation, and goals, then create the garden record.'
              )
            }
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Garden in Chat
          </Button>
        </div>

        {errorMessage && (
          <Card className="p-4 border border-red-200 bg-red-50 text-red-700">
            {errorMessage}
          </Card>
        )}

        <Card className="p-5">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() =>
                openChatWithPrompt(
                  'Create two gardens for me: one raised bed for vegetables and one container garden for herbs. Ask any clarifying questions you need, then create both gardens.'
                )
              }
            >
              <MessageSquare className="h-4 w-4" />
              Create Multiple Gardens
            </Button>
            <Button variant="outline" onClick={loadGardens}>
              Refresh Gardens
            </Button>
            <Button variant="outline" onClick={() => router.push('/planner')}>
              Open Planner
            </Button>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <Card className="p-6 text-slate-500">Loading gardens...</Card>
          ) : gardens.length === 0 ? (
            <Card className="p-8 text-center md:col-span-2 lg:col-span-3">
              <Sprout className="h-8 w-8 mx-auto text-slate-400 mb-3" />
              <p className="text-slate-700 font-medium">No gardens yet</p>
              <p className="text-sm text-slate-500 mt-1 mb-4">Start with a chat and the agent can help you create one or more gardens.</p>
              <Button
                onClick={() =>
                  openChatWithPrompt(
                    'I am new to gardening. Help me set up my first garden and create it in the app.'
                  )
                }
              >
                Start Garden Setup Chat
              </Button>
            </Card>
          ) : (
            gardens.map((garden) => (
              <Card key={garden.id} className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-slate-900">{garden.name}</h3>
                <p className="text-sm text-slate-600">{garden.description || 'No description yet.'}</p>
                <div className="text-xs text-slate-500 space-y-1">
                  <p>Type: {garden.type || 'Unknown'}</p>
                  <p>Units: {garden.coordinateSystem || 'Not set'}</p>
                  <p>Status: {garden.isActive ? 'Active' : 'Inactive'}</p>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
