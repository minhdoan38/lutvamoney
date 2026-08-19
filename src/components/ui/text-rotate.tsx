"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  AnimatePresence,
  type AnimatePresenceProps,
  motion,
  type MotionProps,
  type Transition,
} from "motion/react";

import { cn } from "@/lib/utils";

interface TextRotateProps {
  texts: string[];
  rotationInterval?: number;
  initial?: MotionProps["initial"];
  animate?: MotionProps["animate"];
  exit?: MotionProps["exit"];
  animatePresenceMode?: AnimatePresenceProps["mode"];
  animatePresenceInitial?: boolean;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number | "random";
  transition?: Transition;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "words" | "characters" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

export interface TextRotateRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

const splitIntoCharacters = (text: string): string[] => {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("vi", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }

  return Array.from(text);
};

const TextRotate = forwardRef<TextRotateRef, TextRotateProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...props
    },
    ref,
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const safeTexts = texts.length > 0 ? texts : [""];
    const safeIndex = Math.min(currentTextIndex, safeTexts.length - 1);
    const currentText = safeTexts[safeIndex];

    const elements = useMemo(() => {
      if (splitBy === "characters") {
        const words = currentText.split(" ");
        return words.map((word, index) => ({
          characters: splitIntoCharacters(word),
          needsSpace: index !== words.length - 1,
        }));
      }

      const parts =
        splitBy === "words"
          ? currentText.split(" ")
          : splitBy === "lines"
            ? currentText.split("\n")
            : currentText.split(splitBy);

      return parts.map((part, index) => ({
        characters: [part],
        needsSpace: index !== parts.length - 1 && splitBy !== "lines",
      }));
    }, [currentText, splitBy]);

    const getStaggerDelay = useCallback(
      (index: number, totalCharacters: number) => {
        if (staggerFrom === "first") return index * staggerDuration;
        if (staggerFrom === "last") {
          return (totalCharacters - 1 - index) * staggerDuration;
        }
        if (staggerFrom === "center") {
          return Math.abs(Math.floor(totalCharacters / 2) - index) * staggerDuration;
        }
        if (staggerFrom === "random") {
          return Math.floor(Math.random() * totalCharacters) * staggerDuration;
        }
        return Math.abs(staggerFrom - index) * staggerDuration;
      },
      [staggerFrom, staggerDuration],
    );

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex);
        onNext?.(newIndex);
      },
      [onNext],
    );

    const next = useCallback(() => {
      const nextIndex =
        safeIndex === safeTexts.length - 1
          ? loop
            ? 0
            : safeIndex
          : safeIndex + 1;

      if (nextIndex !== safeIndex) handleIndexChange(nextIndex);
    }, [handleIndexChange, loop, safeIndex, safeTexts.length]);

    const previous = useCallback(() => {
      const previousIndex =
        safeIndex === 0
          ? loop
            ? safeTexts.length - 1
            : safeIndex
          : safeIndex - 1;

      if (previousIndex !== safeIndex) handleIndexChange(previousIndex);
    }, [handleIndexChange, loop, safeIndex, safeTexts.length]);

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, safeTexts.length - 1));
        if (validIndex !== safeIndex) handleIndexChange(validIndex);
      },
      [handleIndexChange, safeIndex, safeTexts.length],
    );

    const reset = useCallback(() => {
      if (safeIndex !== 0) handleIndexChange(0);
    }, [handleIndexChange, safeIndex]);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
      jumpTo,
      next,
      previous,
      reset,
    ]);

    useEffect(() => {
      if (!auto || safeTexts.length < 2 || rotationInterval <= 0) return;

      const intervalId = window.setInterval(next, rotationInterval);
      return () => window.clearInterval(intervalId);
    }, [auto, next, rotationInterval, safeTexts.length]);

    useEffect(() => {
      if (currentTextIndex >= safeTexts.length) {
        setCurrentTextIndex(0);
      }
    }, [currentTextIndex, safeTexts.length]);

    const totalCharacters = elements.reduce(
      (sum, word) => sum + word.characters.length,
      0,
    );

    return (
      <motion.span
        className={cn("flex flex-wrap whitespace-pre-wrap", mainClassName)}
        {...props}
        layout
        transition={transition}
      >
        <span className="sr-only">{currentText}</span>
        <AnimatePresence
          mode={animatePresenceMode}
          initial={animatePresenceInitial}
        >
          <motion.span
            key={safeIndex}
            className={cn(
              "flex flex-wrap",
              splitBy === "lines" && "w-full flex-col",
            )}
            layout
            aria-hidden="true"
          >
            {elements.map((word, wordIndex) => {
              const previousCharacters = elements
                .slice(0, wordIndex)
                .reduce((sum, item) => sum + item.characters.length, 0);

              return (
                <span
                  key={`${safeIndex}-${wordIndex}`}
                  className={cn("inline-flex", splitLevelClassName)}
                >
                  {word.characters.map((character, characterIndex) => (
                    <motion.span
                      key={`${safeIndex}-${wordIndex}-${characterIndex}`}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={{
                        ...transition,
                        delay: getStaggerDelay(
                          previousCharacters + characterIndex,
                          totalCharacters,
                        ),
                      }}
                      className={cn("inline-block", elementLevelClassName)}
                    >
                      {character}
                    </motion.span>
                  ))}
                  {word.needsSpace && <span className="whitespace-pre"> </span>}
                </span>
              );
            })}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    );
  },
);

TextRotate.displayName = "TextRotate";

export { TextRotate };
