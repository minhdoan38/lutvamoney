"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface HoverRollTextProps {
  children: ReactNode;
  className?: string;
  activeColor?: string;
}

export function HoverRollText({
  children,
  className,
  activeColor = "text-white",
}: HoverRollTextProps) {
  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden align-top leading-tight select-none",
        className,
      )}
    >
      <span className="block transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        tabIndex={-1}
        className={cn(
          "absolute left-0 top-0 block translate-y-full transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0",
          activeColor,
        )}
      >
        {children}
      </span>
    </span>
  );
}
