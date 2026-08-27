import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Capabilities } from "@/components/sections/capabilities";
import { FinalCTA } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { ProcessAbout } from "@/components/sections/process-about";
import { SelectedWork } from "@/components/sections/selected-work";
import { Services } from "@/components/sections/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw);
  return {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    alternates: {
      canonical: localePath(raw as Locale, "/"),
    },
    openGraph: {
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      type: "website",
      url: localePath(raw as Locale, "/"),
    },
    twitter: {
      card: "summary",
      title: dict.meta.home.title,
      description: dict.meta.home.description,
    },
  };
}

export default async function Home({ params }: HomePageProps) {
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
        href="#content"
        className="fixed left-4 top-4 z-30 -translate-y-20 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-background opacity-0 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus:translate-y-0 focus:opacity-100"
      >
        {dict.a11y.skipToContent}
      </a>
      <main id="content" className="w-full max-w-full overflow-x-hidden bg-background text-foreground">
        <SiteNav
          links={navLinks}
          brandHref={localePath(locale, "/")}
          ctaHref={localePath(locale, "/redesign/nha-moc-demo")}
          ctaLabel={dict.nav.ctaCaseStudy}
          a11y={dict.a11y}
        />
        <Hero locale={locale} copy={dict.home.hero} />
        <Services copy={dict.home.services} />
        <SelectedWork copy={dict.home.work} />
        <Capabilities copy={dict.home.capabilities} />
        <ProcessAbout copy={dict.home.process} />
        <FinalCTA locale={locale} copy={dict.home.finalCta} />
      </main>
      <SiteFooter locale={locale} copy={dict.footer} a11y={dict.a11y} />
    </>
  );
}
