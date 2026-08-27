"use client";

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

export default function Error({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const locale = readDocumentLocale();
  const dict = dictionaries[locale];

  return (
    <ErrorPage
      status={dict.errors.error.status}
      title={dict.errors.error.title}
      description={dict.errors.error.description}
      retry={retry}
      locale={locale}
      copy={dict.errors}
    />
  );
}
