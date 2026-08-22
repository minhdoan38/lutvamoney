"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface HoverTextRotateProps {
  children: string;
  className?: string;
  staggerDuration?: number;
}

const characterVariants = {
  initial: { y: "0%" },
  hover: { y: "-100%" },
  reduced: { y: "0%" },
};

const replacementVariants = {
  initial: { y: "100%" },
  hover: { y: "0%" },
  reduced: { y: "100%" },
};

export function HoverTextRotate({
  children,
  className,
  staggerDuration = 0.02,
}: HoverTextRotateProps) {
  const shouldReduceMotion = useReducedMotion();
  const hoverState = shouldReduceMotion ? "reduced" : "hover";
  const characters = Array.from(children);

  return (
    <motion.span
      initial="initial"
      whileHover={hoverState}
      whileFocus={hoverState}
      className={cn("relative inline-flex overflow-hidden select-none leading-[1.25]", className)}
    >
      <span className="sr-only">{children}</span>
      <span className="inline-flex leading-[1.25]" aria-hidden="true">
        {characters.map((character, index) => {
          const visibleCharacter = character === " " ? "\u00a0" : character;

          return (
            <span
              key={`${character}-${index}`}
              className="relative inline-block h-[1.25em] overflow-hidden leading-[1.25]"
            >
              <motion.span
                variants={characterVariants}
                transition={{
                  duration: 0.18,
                  ease: [0.33, 1, 0.68, 1],
                  delay: index * staggerDuration,
                }}
                className="inline-block leading-[1.25]"
              >
                {visibleCharacter}
              </motion.span>
              <motion.span
                variants={replacementVariants}
                transition={{
                  duration: 0.18,
                  ease: [0.33, 1, 0.68, 1],
                  delay: index * staggerDuration,
                }}
                className="absolute left-0 top-0 inline-block leading-[1.25] text-inherit"
              >
                {visibleCharacter}
              </motion.span>
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
