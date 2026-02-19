'use client';

import { Zap } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <Zap className="h-16 w-16 text-gray-300" />
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-700">
          Ready to Get Started
        </h3>
        <p className="text-gray-500 max-w-md">
          Ask questions about your operations, analyze production data, or manage work orders.
        </p>
      </div>
    </div>
  );
};
