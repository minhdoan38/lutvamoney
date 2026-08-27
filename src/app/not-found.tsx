import { headers } from "next/headers";

import { ErrorPage } from "@/components/error-page";
import { LOCALE_HEADER, defaultLocale, getLocaleFromPathname, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function NotFound() {
  const headerList = await headers();
  const raw = headerList.get(LOCALE_HEADER);
  const referer = headerList.get("x-url") ?? headerList.get("referer") ?? "";
  let locale = raw && isLocale(raw) ? raw : defaultLocale;
  if (!raw) {
    try {
      const path = referer ? new URL(referer).pathname : "/";
      locale = getLocaleFromPathname(path);
    } catch {
      locale = defaultLocale;
    }
  }

  const dict = await getDictionary(locale);

  return (
    <ErrorPage
      status={dict.errors.notFound.status}
      title={dict.errors.notFound.title}
      description={dict.errors.notFound.description}
      locale={locale}
      copy={dict.errors}
    />
  );
}
