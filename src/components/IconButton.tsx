import React, { type ButtonHTMLAttributes, forwardRef } from 'react';

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  ariaLabel: string;
  variant?: IconButtonVariant;
  size?: 'md' | 'lg';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      ariaLabel,
      variant = 'secondary',
      size = 'md',
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      md: 'w-11 h-11 text-base',
      lg: 'w-14 h-14 text-xl',
    };

    const variantStyles: Record<IconButtonVariant, string> = {
      primary:
        'bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white shadow-md focus-visible:ring-teal-400 border border-teal-500/30',
      secondary:
        'bg-slate-800 hover:bg-slate-700 active:bg-slate-850 text-slate-200 border border-slate-700 focus-visible:ring-slate-400 shadow-sm',
      ghost:
        'bg-transparent hover:bg-slate-800 active:bg-slate-700 text-slate-300 hover:text-slate-100 focus-visible:ring-slate-400 border border-transparent',
      destructive:
        'bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white shadow-md focus-visible:ring-rose-400 border border-rose-500/30',
    };

    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        disabled={disabled}
        className={`inline-flex items-center justify-center rounded-xl transition-all duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-0 active:scale-[0.96] select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
