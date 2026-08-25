import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  className = '',
}) => {
  return (
    <div
      role="alert"
      className={`p-6 bg-rose-950/40 border border-rose-800/60 rounded-2xl text-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-rose-900/60 border border-rose-700/60 text-rose-300 rounded-xl shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-rose-200">{title}</h4>
          <p className="text-base text-rose-300/90 mt-0.5">{message}</p>
        </div>
      </div>
      {onRetry && (
        <Button variant="destructive" onClick={onRetry} className="shrink-0">
          Try Again
        </Button>
      )}
    </div>
  );
};
