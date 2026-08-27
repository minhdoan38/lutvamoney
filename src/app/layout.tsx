import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, Roboto_Flex } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "vietnamese"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "vietnamese"],
});

const display = Roboto_Flex({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  axes: ["wdth", "opsz", "GRAD"],
});

export const metadata: Metadata = {
  title: "Nét Nút Studio | Redesign website cho doanh nghiệp",
  description:
    "Nét Nút làm rõ thông điệp, sắp lại cấu trúc và redesign website để phản ánh đúng vị thế doanh nghiệp.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable} ${display.variable}`}>
      <body>
        <div
          hidden
          aria-hidden="true"
          data-design-contract="THESIS: Website cũ được bóc tách thành chuyển động rõ ràng, từ chối hero agency cân đối. OWN WORLD: Nền đen, chữ off white, vermilion, tile phẳng, hairline, typography khổng lồ. STORY: Người xem nhận ra website đã tụt lại, hiểu cách Nét Nút làm, rồi mở case study minh họa. FIRST VIEWPORT: Headline chiếm gần toàn khung, khối vermilion cắt lệch bên phải, CTA nằm dưới phần giải thích. FORM: Editorial fields fused with reconstruction, labeled synthetic visuals, and a truthful path to the demo."
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
