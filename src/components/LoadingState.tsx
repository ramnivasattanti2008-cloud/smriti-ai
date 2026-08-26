import React from 'react';
import { Sparkles } from 'lucide-react';

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading information, please wait...',
  className = '',
}) => {
  return (
    <div
      role="status"
      className={`flex flex-col items-center justify-center p-8 text-center bg-slate-800/55 border border-teal-800/50 rounded-2xl ${className}`}
    >
      <div className="mb-4 rounded-2xl border border-teal-700/70 bg-teal-950/70 p-3 text-teal-300">
        <Sparkles className="h-8 w-8 animate-pulse text-amber-300" aria-hidden="true" />
      </div>
      <p className="text-lg font-medium text-slate-200">{message}</p>
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 animate-pulse rounded-full bg-teal-300" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-teal-300 [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-teal-300 [animation-delay:300ms]" />
      </div>
    </div>
  );
};
