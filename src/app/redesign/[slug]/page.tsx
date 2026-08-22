import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RedesignCompare } from "@/components/redesign/redesign-compare";
import { SiteNav } from "@/components/site-nav";
import { getRedesignProject, redesignProjects } from "@/data/redesigns";

type RedesignPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return redesignProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: RedesignPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getRedesignProject(slug);

  if (!project) return {};

  return {
    title: `${project.title} | Nét Nút Studio`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Nét Nút Studio`,
      description: project.summary,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${project.title} | Nét Nút Studio`,
      description: project.summary,
    },
  };
}

export default async function RedesignPage({ params }: RedesignPageProps) {
  const { slug } = await params;
  const project = getRedesignProject(slug);

  if (!project) notFound();

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
      <SiteNav brandHref="/" ctaHref="/#contact" ctaLabel="Gửi website" />
      <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
        <article>
          <header className="px-4 pb-16 pt-36 sm:px-6 md:pb-24 lg:px-10 lg:pt-44">
            <div className="mx-auto max-w-[1500px]">
              <Link
                href="/#work"
                className="inline-flex min-h-11 items-center border-b border-accent pb-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent"
              >
                ← Quay về khung tái cấu trúc
              </Link>
              <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-8">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent">{project.kicker}</p>
                  <h1 className="display-expansion mt-6 max-w-[10ch] text-[clamp(3.8rem,8vw,8.5rem)] font-semibold leading-[0.84] tracking-[-0.06em]">
                    {project.title}
                  </h1>
                </div>
                <div className="max-w-md self-end md:col-span-4 md:col-start-9">
                  <p className="text-lg leading-relaxed text-foreground/80">{project.summary}</p>
                  <div className="mt-8 grid grid-cols-2 gap-px border border-white/15 bg-white/15">
                    <div className="bg-[#111111] p-4">
                      <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted">Nguồn</p>
                      <p className="mt-2 text-sm">{project.originalLabel}</p>
                    </div>
                    <div className="bg-[#111111] p-4">
                      <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted">Trạng thái</p>
                      <p className="mt-2 text-sm">Demo có thể thay HTML</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <RedesignCompare project={project} />

          <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-10">
            <div className="mx-auto max-w-[1500px]">
              <div className="grid gap-12 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-5">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent">01 / Chẩn đoán</p>
                  <h2 className="mt-5 max-w-[9ch] text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.86] tracking-[-0.055em]">
                    Cũ không có nghĩa là sai.
                  </h2>
                </div>
                <div className="md:col-span-6 md:col-start-7">
                  <div className="border-t border-white/15">
                    {project.diagnosis.map((item, index) => (
                      <div key={item} className="grid gap-4 border-b border-white/15 py-6 sm:grid-cols-[3rem_1fr]">
                        <span className="font-mono text-xs text-accent">0{index + 1}</span>
                        <p className="max-w-xl text-base leading-relaxed text-muted">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-white/15 bg-[#111111] px-4 py-20 sm:px-6 md:py-28 lg:px-10">
            <div className="mx-auto max-w-[1500px]">
              <div className="grid gap-12 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-5">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent">02 / Quyết định</p>
                  <h2 className="mt-5 max-w-[9ch] text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.86] tracking-[-0.055em]">
                    Dựng lại đường đi.
                  </h2>
                </div>
                <div className="md:col-span-6 md:col-start-7">
                  <div className="border-t border-white/15">
                    {project.decisions.map((item, index) => (
                      <div key={item} className="grid gap-4 border-b border-white/15 py-6 sm:grid-cols-[3rem_1fr]">
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
            <div className="mx-auto grid max-w-[1500px] gap-10 border-t border-white/15 pt-6 md:grid-cols-12 md:gap-8">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent md:col-span-3">03 / Ghi chú</p>
              <p className="max-w-2xl text-[clamp(1.5rem,3vw,3rem)] leading-[1.05] tracking-[-0.04em] md:col-span-7 md:col-start-6">
                {project.nextStep}
              </p>
            </div>
          </section>

          <section className="border-t border-white/15 px-4 py-20 sm:px-6 md:py-28 lg:px-10">
            <div className="mx-auto flex max-w-[1500px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent">Có một website cần nhìn lại?</p>
                <h2 className="mt-5 max-w-[9ch] text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.86] tracking-[-0.055em]">
                  Gửi nó sang đây.
                </h2>
              </div>
              <Link
                href="/#contact"
                className="inline-flex min-h-12 items-center justify-center border border-accent bg-accent px-5 py-3 text-sm font-semibold text-background transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Gửi website
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
