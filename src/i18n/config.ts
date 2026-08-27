export const locales = ["en", "vi"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_HEADER = "x-locale";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Build a locale-aware href. Default locale stays unprefixed; `vi` gets `/vi`. */
export function localePath(locale: Locale, href: string): string {
  const hashIndex = href.indexOf("#");
  const pathPart = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : href.slice(hashIndex);
  const path = pathPart === "" ? "/" : pathPart;

  if (locale === defaultLocale) {
    return `${path}${hash}`;
  }

  if (path === "/") {
    return `/vi${hash}`;
  }

  return `/vi${path}${hash}`;
}

export function stripLocale(pathname: string): string {
  if (pathname === "/vi" || pathname === "/en") return "/";
  if (pathname.startsWith("/vi/")) {
    const rest = pathname.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  if (pathname.startsWith("/en/")) {
    const rest = pathname.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname || "/";
}

export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname === "/vi" || pathname.startsWith("/vi/")) return "vi";
  return "en";
}

/** Swap the locale for the current path, preserving query and hash. */
export function switchLocalePath(
  pathname: string,
  nextLocale: Locale,
  search = "",
  hash = "",
): string {
  const bare = stripLocale(pathname);
  const nextPath = localePath(nextLocale, bare);
  return `${nextPath}${search}${hash}`;
}
