import React, { type ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    // Base styles with 44px+ minimum height for accessibility & large touch target
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-xl min-h-[48px] px-6 text-base tracking-wide transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const sizeStyles = {
      md: 'min-h-[48px] py-3 text-base font-medium',
      lg: 'min-h-[56px] py-4 px-8 text-lg font-semibold',
    };

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white shadow-md shadow-teal-950/30 focus-visible:ring-teal-400 border border-teal-500/30',
      secondary:
        'bg-slate-800 hover:bg-slate-700 active:bg-slate-850 text-slate-100 border border-slate-600 focus-visible:ring-slate-400 shadow-sm',
      ghost:
        'bg-transparent hover:bg-slate-800/60 active:bg-slate-800 text-slate-200 focus-visible:ring-slate-400 border border-transparent',
      destructive:
        'bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white shadow-md shadow-rose-950/30 focus-visible:ring-rose-400 border border-rose-500/30',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
        {...props}
      >
        {leftIcon && <span className="mr-2.5 inline-flex items-center">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="ml-2.5 inline-flex items-center">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
