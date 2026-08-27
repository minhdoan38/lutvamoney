import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RedesignCompare } from "@/components/redesign/redesign-compare";
import { SiteNav } from "@/components/site-nav";
import { getLocalizedRedesignProject, redesignProjects } from "@/data/redesigns";
import { isLocale, localePath, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type RedesignPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    redesignProjects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: RedesignPageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const project = getLocalizedRedesignProject(slug, raw);
  if (!project) return {};

  return {
    title: `${project.title} | Nét Nút Studio`,
    description: project.summary,
    alternates: {
      canonical: localePath(raw as Locale, `/redesign/${slug}`),
    },
    openGraph: {
      title: `${project.title} | Nét Nút Studio`,
      description: project.summary,
      type: "article",
      url: localePath(raw as Locale, `/redesign/${slug}`),
    },
    twitter: {
      card: "summary",
      title: `${project.title} | Nét Nút Studio`,
      description: project.summary,
    },
  };
}

export default async function RedesignPage({ params }: RedesignPageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const project = getLocalizedRedesignProject(slug, locale);

  if (!project) notFound();

  const chrome = dict.redesign;
  const navLinks = [
    { label: dict.nav.services, href: localePath(locale, "/#services") },
    { label: dict.nav.work, href: localePath(locale, "/#work") },
    { label: dict.nav.about, href: localePath(locale, "/about") },
    { label: dict.nav.contact, href: localePath(locale, "/contact") },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.summary,
    author: {
      "@type": "Organization",
      name: "Nét Nút Studio",
    },
    publisher: {
      "@type": "Organization",
      name: "Nét Nút Studio",
    },
    about: project.kicker,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteNav
        links={navLinks}
        brandHref={localePath(locale, "/")}
        ctaHref={localePath(locale, "/about")}
        ctaLabel={dict.nav.ctaAbout}
        a11y={dict.a11y}
      />
      <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
        <article>
          <header className="px-4 pb-16 pt-36 sm:px-6 md:pb-24 lg:px-10 lg:pt-44">
            <div className="mx-auto max-w-[1500px]">
              <Link
                href={localePath(locale, "/#work")}
                className="inline-flex min-h-11 items-center border-b border-accent pb-2 font-mono text-xs uppercase tracking-[0.14em] text-accent"
              >
                {chrome.back}
              </Link>
              <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-8">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{project.kicker}</p>
                  <h1 className="display-expansion mt-6 max-w-[10ch] text-[clamp(3.8rem,8vw,8.5rem)] font-semibold leading-[0.84] tracking-[-0.04em]">
                    {project.title}
                  </h1>
                </div>
                <div className="max-w-md self-end md:col-span-4 md:col-start-9">
                  <p className="text-lg leading-relaxed text-foreground/80">{project.summary}</p>
                  <div className="mt-8 grid grid-cols-2 gap-px border border-line bg-line">
                    <div className="bg-card p-4">
                      <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{chrome.sourceLabel}</p>
                      <p className="mt-2 text-sm">{project.originalLabel}</p>
                    </div>
                    <div className="bg-card p-4">
                      <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{chrome.statusLabel}</p>
                      <p className="mt-2 text-sm">{chrome.statusValue}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <RedesignCompare project={project} copy={chrome.compare} />

          <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-10">
            <div className="mx-auto max-w-[1500px]">
              <div className="grid gap-12 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-5">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{chrome.diagnosisEyebrow}</p>
                  <h2 className="mt-5 max-w-[9ch] text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.86] tracking-[-0.04em]">
                    {chrome.diagnosisTitle}
                  </h2>
                </div>
                <div className="md:col-span-6 md:col-start-7">
                  <div className="border-t border-line">
                    {project.diagnosis.map((item, index) => (
                      <div key={item} className="grid gap-4 border-b border-line py-6 sm:grid-cols-[3rem_1fr]">
                        <span className="font-mono text-xs text-accent">0{index + 1}</span>
                        <p className="max-w-xl text-base leading-relaxed text-muted">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-line bg-card px-4 py-20 sm:px-6 md:py-28 lg:px-10">
            <div className="mx-auto max-w-[1500px]">
              <div className="grid gap-12 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-5">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{chrome.decisionsEyebrow}</p>
                  <h2 className="mt-5 max-w-[9ch] text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.86] tracking-[-0.04em]">
                    {chrome.decisionsTitle}
                  </h2>
                </div>
                <div className="md:col-span-6 md:col-start-7">
                  <div className="border-t border-line">
                    {project.decisions.map((item, index) => (
                      <div key={item} className="grid gap-4 border-b border-line py-6 sm:grid-cols-[3rem_1fr]">
                        <span className="font-mono text-xs text-accent">0{index + 1}</span>
                        <p className="max-w-xl text-base leading-relaxed text-muted">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-10">
            <div className="mx-auto grid max-w-[1500px] gap-10 border-t border-line pt-6 md:grid-cols-12 md:gap-8">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent md:col-span-3">{chrome.noteEyebrow}</p>
              <p className="max-w-2xl text-[clamp(1.5rem,3vw,3rem)] leading-[1.05] tracking-[-0.04em] md:col-span-7 md:col-start-6">
                {project.nextStep}
              </p>
            </div>
          </section>

          <section className="border-t border-line px-4 py-20 sm:px-6 md:py-28 lg:px-10">
            <div className="mx-auto flex max-w-[1500px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{chrome.afterEyebrow}</p>
                <h2 className="mt-5 max-w-[10ch] text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.86] tracking-[-0.04em]">
                  {chrome.afterTitle}
                </h2>
              </div>
              <Link
                href={localePath(locale, "/about")}
                className="inline-flex min-h-12 items-center justify-center border border-accent bg-accent px-5 py-3 text-sm font-semibold text-background transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {chrome.afterCta}
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
