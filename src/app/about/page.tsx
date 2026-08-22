import type { Metadata } from "next";
import { CultureSection } from "@/components/about/culture-section";
import { DictionarySection } from "@/components/about/dictionary-section";
import { HeroAbout } from "@/components/about/hero-about";
import { ManifestoSection } from "@/components/about/manifesto-section";
import { OutroStatement } from "@/components/about/outro-statement";
import { VisionSection } from "@/components/about/vision-section";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "About Nét Nút | Nét Nút Studio",
  description:
    "Nét Nút Studio thu hẹp khoảng cách giữa doanh nghiệp đã phát triển và website còn dừng lại ở một phiên bản cũ.",
};

export default function AboutPage() {
  return (
    <>
      <a
        href="#about-content"
        className="fixed left-4 top-4 z-30 -translate-y-20 bg-accent px-4 py-3 text-sm font-semibold text-background opacity-0 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus:translate-y-0 focus:opacity-100"
      >
        Bỏ qua đến nội dung
      </a>
      <main
        id="about-content"
        className="w-full max-w-full overflow-x-hidden bg-background text-foreground"
      >
        <SiteNav brandHref="/" ctaHref="/#contact" ctaLabel="Gửi website" />
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
