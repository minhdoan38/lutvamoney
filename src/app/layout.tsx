import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { Geist, Geist_Mono, Roboto_Flex } from "next/font/google";
import "./globals.css";
import { NoiseBg } from "@/components/noise-bg";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LOCALE_HEADER, defaultLocale, isLocale } from "@/i18n/config";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://netnut.studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nét Nút Studio | Website redesign for growing businesses",
  description:
    "Nét Nút clarifies the message, restructures information, and redesigns websites so they reflect the business as it is today.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "Nét Nút Studio",
    title: "Nét Nút Studio | Website redesign for growing businesses",
    description:
      "Nét Nút clarifies the message, restructures information, and redesigns websites so they reflect the business as it is today.",
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: "Nét Nút Studio | Website redesign for growing businesses",
    description:
      "Nét Nút clarifies the message, restructures information, and redesigns websites so they reflect the business as it is today.",
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headerList = await headers();
  const raw = headerList.get(LOCALE_HEADER);
  const locale = raw && isLocale(raw) ? raw : defaultLocale;

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} ${display.variable}`}>
      <body>
        <div
          hidden
          aria-hidden="true"
          data-design-contract="THESIS: Website cũ được bóc tách thành chuyển động rõ ràng, từ chối hero agency cân đối. OWN WORLD: Nền đen, chữ off white, vermilion, tile phẳng, hairline, typography khổng lồ. STORY: Người xem nhận ra website đã tụt lại, hiểu cách Nét Nút làm, rồi mở case study minh họa. FIRST VIEWPORT: Headline chiếm gần toàn khung, khối vermilion cắt lệch bên phải, CTA nằm dưới phần giải thích. FORM: Editorial fields fused with reconstruction, labeled synthetic visuals, and a truthful path to the demo."
        />
        <NoiseBg />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
