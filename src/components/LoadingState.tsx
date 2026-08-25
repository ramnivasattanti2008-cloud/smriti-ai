import React from 'react';
import { Loader2 } from 'lucide-react';

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
      className={`flex flex-col items-center justify-center p-8 text-center bg-slate-800/40 border border-slate-700/50 rounded-2xl ${className}`}
    >
      <Loader2 className="w-10 h-10 text-teal-400 animate-spin mb-3" />
      <p className="text-lg font-medium text-slate-200">{message}</p>
      <span className="sr-only">Loading</span>
    </div>
  );
};
