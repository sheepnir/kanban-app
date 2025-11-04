"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
          "transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
export default Input;
