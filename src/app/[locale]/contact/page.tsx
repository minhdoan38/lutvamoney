import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/contact/contact-form";
import { ContactIntro } from "@/components/contact/contact-intro";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw);
  return {
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: {
      canonical: localePath(raw as Locale, "/contact"),
    },
    openGraph: {
      title: dict.meta.contact.title,
      description: dict.meta.contact.description,
      type: "website",
      url: localePath(raw as Locale, "/contact"),
    },
    twitter: {
      card: "summary",
      title: dict.meta.contact.title,
      description: dict.meta.contact.description,
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
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
        href="#contact-content"
        className="fixed left-4 top-4 z-30 -translate-y-20 bg-accent px-4 py-3 text-sm font-semibold text-background opacity-0 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus:translate-y-0 focus:opacity-100"
      >
        {dict.a11y.skipToContent}
      </a>
      <main
        id="contact-content"
        tabIndex={-1}
        className="w-full max-w-full overflow-x-hidden bg-background text-foreground focus-visible:outline-none"
      >
        <SiteNav
          links={navLinks}
          brandHref={localePath(locale, "/")}
          ctaHref="#contact-form"
          ctaLabel={dict.nav.ctaStart}
          a11y={dict.a11y}
        />
        <section id="contact" className="min-h-[100dvh] bg-background text-foreground">
          <ContactIntro copy={dict.contact.intro} />
          <ContactForm copy={dict.contact.form} />
        </section>
      </main>
      <SiteFooter locale={locale} copy={dict.footer} a11y={dict.a11y} />
    </>
  );
}
