import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AboutRouteTransition } from "@/components/about-route-transition";
import { SmoothScroll } from "@/components/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "vietnamese"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Nét Nút Studio | Redesign website cho doanh nghiệp",
  description:
    "Nét Nút loại bỏ những thứ cồng kềnh, giữ lại cốt lõi, và thiết kế một trải nghiệm xứng tầm.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div
          hidden
          aria-hidden="true"
          data-design-contract="THESIS: Website cũ được bóc tách thành chuyển động rõ ràng, từ chối hero agency cân đối. OWN WORLD: Nền đen, chữ off white, vermilion, tile phẳng, hairline, typography khổng lồ. STORY: Khách nhận ra website đã tụt lại, hiểu cách Nét Nút làm, rồi gửi URL. FIRST VIEWPORT: Headline chiếm gần toàn khung, khối vermilion cắt lệch bên phải, CTA nằm dưới phần giải thích. FORM: Metro typographic tiles fused with editorial redesign, seed f7b4dd0d. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md"
        />
        <AboutRouteTransition />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
