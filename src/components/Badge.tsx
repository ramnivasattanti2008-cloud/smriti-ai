import React from 'react';

export type BadgeVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'info',
  children,
  icon,
  className = '',
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    info: 'bg-teal-950/80 text-teal-300 border-teal-700/80',
    success: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80',
    warning: 'bg-amber-950/80 text-amber-300 border-amber-700/80',
    danger: 'bg-rose-950/80 text-rose-300 border-rose-700/80',
    neutral: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-semibold rounded-full border ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="inline-flex items-center shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
