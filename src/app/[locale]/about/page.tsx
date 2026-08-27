import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CultureSection } from "@/components/about/culture-section";
import { DictionarySection } from "@/components/about/dictionary-section";
import { HeroAbout } from "@/components/about/hero-about";
import { ManifestoSection } from "@/components/about/manifesto-section";
import { OutroStatement } from "@/components/about/outro-statement";
import { VisionSection } from "@/components/about/vision-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw);
  return {
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    alternates: {
      canonical: localePath(raw as Locale, "/about"),
    },
    openGraph: {
      title: dict.meta.about.title,
      description: dict.meta.about.description,
      type: "website",
      url: localePath(raw as Locale, "/about"),
    },
    twitter: {
      card: "summary",
      title: dict.meta.about.title,
      description: dict.meta.about.description,
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  const navLinks = [
    { label: dict.nav.services, href: localePath(locale, "/#services") },
    { label: dict.nav.work, href: localePath(locale, "/#work") },
    { label: dict.nav.about, href: localePath(locale, "/about") },
    { label: dict.nav.contact, href: localePath(locale, "/contact") },
  ];

  return (
    <>
      <a
        href="#about-content"
        className="fixed left-4 top-4 z-30 -translate-y-20 bg-accent px-4 py-3 text-sm font-semibold text-background opacity-0 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus:translate-y-0 focus:opacity-100"
      >
        {dict.a11y.skipToContent}
      </a>
      <main
        id="about-content"
        tabIndex={-1}
        className="w-full max-w-full overflow-x-hidden bg-background text-foreground focus-visible:outline-none"
      >
        <SiteNav
          links={navLinks}
          brandHref={localePath(locale, "/")}
          ctaHref={localePath(locale, "/contact")}
          ctaLabel={dict.nav.ctaStart}
          a11y={dict.a11y}
        />
        <HeroAbout locale={locale} copy={dict.about.hero} />
        <DictionarySection copy={dict.about.dictionary} />
        <ManifestoSection copy={dict.about.manifesto} />
        <VisionSection copy={dict.about.vision} />
        <CultureSection copy={dict.about.culture} />
        <OutroStatement locale={locale} copy={dict.about.outro} />
      </main>
      <SiteFooter locale={locale} copy={dict.footer} a11y={dict.a11y} />
    </>
  );
}
