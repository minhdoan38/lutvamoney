import Link from "next/link";

export function HeroAbout() {
  return (
    <section
      id="about-hero"
      className="relative flex min-h-dvh items-end overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pb-16 lg:px-10 lg:pb-20 lg:pt-32"
    >
      <div className="relative mx-auto grid w-full max-w-[1600px] content-end gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8 lg:col-span-9">
          <h1 className="display-release max-w-[8ch] text-[clamp(4rem,10.5vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-foreground sm:max-w-[7ch] sm:leading-[0.88] md:max-w-[8ch] lg:max-w-none">
            Về Nét Nút
          </h1>
        </div>

        <div className="max-w-xl md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
          <p className="text-base leading-[1.65] text-foreground/68 md:text-lg">
            Doanh nghiệp thay đổi theo thời gian. Website cũng cần thay đổi để phản ánh đúng giá trị, quy mô và cách doanh nghiệp đang vận hành.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center border border-foreground bg-foreground px-5 text-sm font-semibold text-background transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:border-accent hover:bg-accent active:scale-[0.98]"
            >
              Bắt đầu trao đổi
            </Link>
            <Link href="/redesign/nha-moc-demo" className="text-sm leading-relaxed text-foreground/68 underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-accent">
              Xem ví dụ minh họa
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
