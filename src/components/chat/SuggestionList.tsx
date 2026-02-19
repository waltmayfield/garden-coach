'use client';

import { Suggestion } from '@/components/ai-elements/suggestion';

interface SuggestionListProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export const SuggestionList = ({
  suggestions,
  onSuggestionClick,
}: SuggestionListProps) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 flex flex-col gap-2">
      {suggestions.map((suggestion, i) => (
        <Suggestion
          key={i}
          suggestion={suggestion}
          onClick={onSuggestionClick}
          className="w-full justify-start"
        />
      ))}
    </div>
  );
};
