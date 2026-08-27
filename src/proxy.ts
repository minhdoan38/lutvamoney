import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { LOCALE_HEADER, defaultLocale } from "@/i18n/config";

function withLocaleHeader(request: NextRequest, locale: string) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  return requestHeaders;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  // Explicit /en → redirect to unprefixed English URL (never show /en in the bar).
  if (first === "en") {
    const rest = "/" + segments.slice(1).join("/");
    const url = request.nextUrl.clone();
    url.pathname = rest === "/" ? "/" : rest;
    return NextResponse.redirect(url);
  }

  // Prefixed Vietnamese.
  if (first === "vi") {
    return NextResponse.next({
      request: { headers: withLocaleHeader(request, "vi") },
    });
  }

  // Unprefixed paths → rewrite internally to /en/... (URL stays unprefixed).
  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url, {
    request: { headers: withLocaleHeader(request, defaultLocale) },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml|woff2?)$).*)",
  ],
};
