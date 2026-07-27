import { forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-label-caps uppercase tracking-widest text-on-surface-variant mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-surface-container-low border rounded-lg px-4 py-3 text-on-surface focus:outline-none transition-colors",
            error 
              ? "border-error/50 focus:border-error" 
              : "border-white/10 focus:border-primary-container",
            className
          )}
          {...props}
        />
        {error && <p className="text-error text-xs mt-2 font-body-md">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-primary-container text-on-primary-fixed hover:opacity-90",
      secondary: "bg-surface-container-high text-on-surface hover:bg-white/10",
      danger: "bg-error/10 text-error hover:bg-error/20 border border-error/20",
      ghost: "bg-transparent text-on-surface-variant hover:text-on-surface hover:bg-white/5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "font-label-caps tracking-widest uppercase py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2",
          variants[variant],
          className
        )}
        {...props}
      >
        {isLoading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
