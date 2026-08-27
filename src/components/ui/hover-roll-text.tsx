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
  activeColor = "text-foreground",
}: HoverRollTextProps) {
  return (
    <span
      className={cn(
        "hover-roll relative inline-block overflow-hidden align-top leading-tight select-none",
        className,
      )}
    >
      <span className="hover-roll__line block">{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "hover-roll__line hover-roll__line--duplicate absolute left-0 top-0 block",
          activeColor,
        )}
      >
        {children}
      </span>
    </span>
  );
}
