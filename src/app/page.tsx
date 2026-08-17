import { Capabilities } from "@/components/sections/capabilities";
import { FinalCTA } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Insights } from "@/components/sections/insights";
import { ProcessAbout } from "@/components/sections/process-about";
import { SelectedWork } from "@/components/sections/selected-work";
import { Services } from "@/components/sections/services";
import { CursorFollower } from "@/components/cursor-follower";
import { SiteNav } from "@/components/site-nav";

export default function Home() {
  return (
    <>
      <div className="page-loader" aria-hidden="true">
        <div className="page-loader__tile page-loader__tile--left" />
        <div className="page-loader__tile page-loader__tile--top" />
        <div className="page-loader__tile page-loader__tile--core" />
        <div className="page-loader__tile page-loader__tile--east" />
        <div className="page-loader__tile page-loader__tile--south" />
        <div className="page-loader__accent hero-mark-geometry" />
      </div>

      {/*
        THESIS: Website cũ được bóc tách và tái cấu trúc thành chuyển động rõ ràng, không dùng hero agency cân đối quen thuộc.
        OWN-WORLD: Nền đen, chữ off white, vermilion duy nhất, tile phẳng, hairline và typography khổng lồ bị crop.
        STORY: Khách nhận ra website đã tụt lại, thấy cách Nét Nút làm, rồi gửi URL để được phân tích.
        FIRST VIEWPORT: Chữ chiếm gần toàn khung, khối vermilion cắt lệch bên phải, CTA nằm dưới phần giải thích.
        FORM: Metro typographic tiles fused with editorial redesign, seed f7b4dd0d. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
      */}
      <a
        href="#content"
        className="fixed left-4 top-4 z-30 -translate-y-20 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-background opacity-0 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus:translate-y-0 focus:opacity-100"
      >
        Bỏ qua đến nội dung
      </a>
      <main id="content" className="w-full max-w-full overflow-x-hidden bg-background text-foreground">
        <SiteNav />
        <CursorFollower />
        <Hero />
        <Services />
        <SelectedWork />
        <Capabilities />
        <ProcessAbout />
        <Insights />
        <FinalCTA />
      </main>
    </>
  );
}
