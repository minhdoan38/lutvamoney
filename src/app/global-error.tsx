"use client";

import "./globals.css";
import { ErrorPage } from "@/components/error-page";
import type { Dictionary } from "@/i18n/get-dictionary";
import en from "@/messages/en.json";
import vi from "@/messages/vi.json";

const dictionaries: Record<"en" | "vi", Dictionary> = {
  en,
  vi,
};

function readDocumentLocale(): "en" | "vi" {
  if (typeof document === "undefined") return "en";
  return document.documentElement.lang === "vi" ? "vi" : "en";
}

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const locale = readDocumentLocale();
  const dict = dictionaries[locale];

  return (
    <html lang={locale}>
      <body>
        <ErrorPage
          status={dict.errors.global.status}
          title={dict.errors.global.title}
          description={dict.errors.global.description}
          retry={retry}
          locale={locale}
          copy={dict.errors}
        />
      </body>
    </html>
  );
}
