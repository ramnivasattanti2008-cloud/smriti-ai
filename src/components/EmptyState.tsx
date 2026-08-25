import React from 'react';
import { Inbox } from 'lucide-react';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-slate-800/40 border border-slate-700/60 rounded-2xl ${className}`}
    >
      <div className="p-4 bg-slate-800 border border-slate-700 text-teal-400 rounded-2xl mb-4 shadow-sm">
        {icon || <Inbox className="w-10 h-10" />}
      </div>
      <h4 className="text-xl font-bold text-slate-100 tracking-tight mb-1">
        {title}
      </h4>
      <p className="text-base text-slate-300 max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};
