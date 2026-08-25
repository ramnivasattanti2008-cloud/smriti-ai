import React from 'react';

export interface CardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  action,
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  const isInteractive = Boolean(onClick) || hoverable;

  return (
    <div
      onClick={onClick}
      className={`bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-lg shadow-slate-950/20 text-slate-100 ${
        isInteractive
          ? 'cursor-pointer transition-all duration-150 hover:border-slate-500 hover:bg-slate-800 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] focus-within:ring-2 focus-within:ring-teal-400'
          : ''
      } ${className}`}
    >
      {(title || icon || action) && (
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-3 bg-teal-950/60 border border-teal-800/60 rounded-xl text-teal-400 shrink-0">
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-xl font-bold text-slate-50 tracking-tight">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-base text-slate-300 mt-1 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      {children && <div className="mt-3">{children}</div>}
    </div>
  );
};
