import type { MetadataRoute } from "next";

import { redesignProjects } from "@/data/redesigns";
import { localePath, locales, type Locale } from "@/i18n/config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://netnut.studio";

const publicPaths = ["/", "/about", "/contact"] as const;

function absoluteUrl(locale: Locale, path: string): string {
  return new URL(localePath(locale, path), siteUrl).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedPages = locales.flatMap((locale) =>
    publicPaths.map((path) => ({
      url: absoluteUrl(locale, path),
      changeFrequency: path === "/" ? "weekly" as const : "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
  );

  const localizedCaseStudies = locales.flatMap((locale) =>
    redesignProjects.map((project) => ({
      url: absoluteUrl(locale, `/redesign/${project.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...localizedPages, ...localizedCaseStudies];
}
