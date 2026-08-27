import type { Locale } from "@/i18n/config";
import type en from "@/messages/en.json";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/messages/en.json").then((m) => m.default),
  vi: () => import("@/messages/vi.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
