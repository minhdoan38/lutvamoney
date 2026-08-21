import { HomeExperienceProvider } from "@/components/home-experience-provider";
import { Capabilities } from "@/components/sections/capabilities";
import { Diagnosis } from "@/components/sections/diagnosis";
import { FinalCTA } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Insights } from "@/components/sections/insights";
import { ProcessAbout } from "@/components/sections/process-about";
import { SelectedWork } from "@/components/sections/selected-work";
import { SiteNav } from "@/components/site-nav";

export default function Home() {
  return (
    <HomeExperienceProvider>
      <a
        href="#content"
        className="fixed left-4 top-4 z-30 -translate-y-20 bg-accent px-4 py-3 text-sm font-semibold text-background opacity-0 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus:translate-y-0 focus:opacity-100"
      >
        Bỏ qua đến nội dung
      </a>
      <main id="content" className="w-full max-w-full overflow-x-hidden bg-background text-foreground">
        <SiteNav />
        <Hero />
        <Diagnosis />
        <SelectedWork />
        <Capabilities />
        <ProcessAbout />
        <Insights />
        <FinalCTA />
      </main>
    </HomeExperienceProvider>
  );
}
