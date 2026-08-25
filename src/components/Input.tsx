import React, { type InputHTMLAttributes, forwardRef, useId } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, helperText, leftIcon, rightIcon, className = '', id, disabled, ...props },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-base font-semibold text-slate-200 select-none"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-4 text-slate-400 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={`w-full min-h-[48px] px-4 py-3 bg-slate-900/90 text-slate-100 placeholder-slate-500 rounded-xl border text-base transition-colors duration-150 focus:outline-none focus:ring-4 select-text disabled:opacity-50 disabled:cursor-not-allowed ${
              leftIcon ? 'pl-11' : ''
            } ${rightIcon ? 'pr-11' : ''} ${
              error
                ? 'border-rose-500/80 focus:ring-rose-500/40'
                : 'border-slate-700 focus:border-teal-500 focus:ring-teal-500/30'
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 text-slate-400 pointer-events-none flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm font-medium text-rose-400 mt-0.5">{error}</p>
        )}
        {!error && helperText && (
          <p className="text-sm text-slate-400 mt-0.5">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
