"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
          "transition-all duration-200 resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
export default Textarea;
