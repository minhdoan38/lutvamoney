import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { ContactIntro } from "@/components/contact/contact-intro";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Bắt đầu trao đổi | Nét Nút Studio",
  description:
    "Chia sẻ bối cảnh website hiện tại để bắt đầu một cuộc trao đổi rõ ràng hơn về redesign.",
};

export default function ContactPage() {
  return (
    <>
      <a
        href="#contact-content"
        className="fixed left-4 top-4 z-30 -translate-y-20 bg-accent px-4 py-3 text-sm font-semibold text-background opacity-0 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus:translate-y-0 focus:opacity-100"
      >
        Chuyển đến nội dung chính
      </a>
      <main id="contact-content" tabIndex={-1} className="w-full max-w-full overflow-x-hidden bg-background text-foreground focus-visible:outline-none">
        <SiteNav brandHref="/" ctaHref="#contact-form" ctaLabel="Bắt đầu trao đổi" />
        <section id="contact" className="min-h-[100dvh] bg-background text-foreground">
          <ContactIntro />
          <ContactForm />
        </section>
      </main>
    </>
  );
}
