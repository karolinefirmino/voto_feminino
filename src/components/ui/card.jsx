import * as React from "react";
import { cn } from "@/lib/utils"

export function Card({ className, ...props }) {
  return (
    <div className={`rounded-lg border bg-white shadow-sm ${className}`} {...props} />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={`p-6 ${className}`} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={`text-lg font-semibold ${className}`} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={`p-6 pt-0 ${className}`} {...props} />;
}