'use client';

import { useState, useMemo } from 'react';
import type { UIMessage } from '@ai-sdk/react';

const DEFAULT_SUGGESTIONS = [
  'Show me a map of the largest ports in the US, and plot their throughput over the past 5 years.',
  'Make a report on expected future electricty demand in the USA.',
];

/**
 * Hook to manage chat suggestions based on messages
 */
export const useSuggestions = (messages: UIMessage[]) => {
  const [manualSuggestions, setManualSuggestions] = useState<string[] | null>(null);

  // Derive suggestions from messages
  const derivedSuggestions = useMemo(() => {
    // Extract suggestions from the latest assistant message
    // Find the most recent generate_suggestions tool CALL (not output)
    const latestAssistantMessage = messages
      .filter((m) => m.role === 'assistant')
      .at(-1);

    const suggestionsToolCall = latestAssistantMessage?.parts.find(
      (part) => part.type === 'tool-generate_suggestions'
    );

    // Extract suggestions from the tool call INPUT (where the AI fills them in)
    const newSuggestions = suggestionsToolCall
      ? (suggestionsToolCall as { input?: { suggestions?: string[] } }).input
          ?.suggestions
      : undefined;

    return newSuggestions || DEFAULT_SUGGESTIONS;
  }, [messages]);

  // Use manual suggestions if set, otherwise use derived
  const suggestions = manualSuggestions ?? derivedSuggestions;

  return { suggestions, setSuggestions: setManualSuggestions };
};
