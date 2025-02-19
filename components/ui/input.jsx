"use client";
import React from 'react';

export const Input = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm 
        placeholder:text-muted-foreground focus:outline-none focus:ring-2 
        focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed 
        disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';