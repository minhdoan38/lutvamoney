import type { Metadata } from "next";
import { CultureSection } from "@/components/about/culture-section";
import { DictionarySection } from "@/components/about/dictionary-section";
import { HeroAbout } from "@/components/about/hero-about";
import { ManifestoSection } from "@/components/about/manifesto-section";
import { OutroStatement } from "@/components/about/outro-statement";
import { VisionSection } from "@/components/about/vision-section";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Về Nét Nút Studio | Redesign website",
  description:
    "Nét Nút giúp doanh nghiệp làm rõ giá trị đang có, gỡ phần website đang cản và dựng hướng đi phù hợp với hiện tại.",
};

export default function AboutPage() {
  return (
    <>
      <a
        href="#about-content"
        className="fixed left-4 top-4 z-30 -translate-y-20 bg-accent px-4 py-3 text-sm font-semibold text-background opacity-0 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus:translate-y-0 focus:opacity-100"
      >
        Chuyển đến nội dung chính
      </a>
      <main
        id="about-content"
        tabIndex={-1}
        className="w-full max-w-full overflow-x-hidden bg-background text-foreground focus-visible:outline-none"
      >
        <SiteNav brandHref="/" ctaHref="/contact" ctaLabel="Bắt đầu trao đổi" />
        <HeroAbout />
        <DictionarySection />
        <ManifestoSection />
        <VisionSection />
        <CultureSection />
        <OutroStatement />
      </main>
    </>
  );
}
