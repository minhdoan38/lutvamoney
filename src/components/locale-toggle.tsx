"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  useCallback,
  useId,
  type KeyboardEvent,
} from "react";

import { cn } from "@/lib/utils";
import {
  switchLocalePath,
  type Locale,
} from "@/i18n/config";

export type { Locale };

type LocaleToggleProps = {
  locale: Locale;
  languageLabel: string;
  className?: string;
};

export function LocaleToggle({
  locale,
  languageLabel,
  className,
}: LocaleToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const groupId = useId();
  const enId = `${groupId}-en`;
  const viId = `${groupId}-vi`;
  const isVi = locale === "vi";

  const select = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      const search = typeof window !== "undefined" ? window.location.search : "";
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      const target = switchLocalePath(pathname, next, search, hash);
      router.push(target);
      requestAnimationFrame(() => {
        document.getElementById(next === "vi" ? viId : enId)?.focus();
      });
    },
    [enId, locale, pathname, router, viId],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft" || event.key === "Home") {
        event.preventDefault();
        select("en");
        return;
      }
      if (event.key === "ArrowRight" || event.key === "End") {
        event.preventDefault();
        select("vi");
        return;
      }
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        select(isVi ? "en" : "vi");
      }
    },
    [isVi, select],
  );

  return (
    <div
      role="radiogroup"
      aria-label={languageLabel}
      aria-orientation="horizontal"
      data-locale={locale}
      data-ready="true"
      className={cn("locale-toggle", className)}
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        id={enId}
        role="radio"
        aria-checked={!isVi}
        tabIndex={!isVi ? 0 : -1}
        className="locale-toggle__label"
        data-active={!isVi ? "true" : "false"}
        onClick={() => select("en")}
      >
        EN
      </button>

      <span className="locale-toggle__track" aria-hidden="true">
        <span className="locale-toggle__thumb" />
      </span>

      <button
        type="button"
        id={viId}
        role="radio"
        aria-checked={isVi}
        tabIndex={isVi ? 0 : -1}
        className="locale-toggle__label"
        data-active={isVi ? "true" : "false"}
        onClick={() => select("vi")}
      >
        VI
      </button>
    </div>
  );
}
