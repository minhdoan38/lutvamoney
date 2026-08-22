export function HeroAbout() {
  return (
    <section
      id="about-hero"
      className="relative flex min-h-dvh items-end overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pb-16 lg:px-10 lg:pb-20 lg:pt-32"
    >
      <div className="relative mx-auto w-full max-w-[1600px]">
        <h1 className="display-release w-[80%] max-w-none text-[clamp(2.8rem,10vw,9.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-foreground sm:leading-[0.98] md:leading-[0.94] lg:leading-[0.9]">
          About Nét Nút
        </h1>

        <div className="mt-14 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-12">
          <p
            className="max-w-2xl text-base leading-[1.72] text-foreground/68 md:col-span-5 md:col-start-8 md:justify-self-end md:text-lg lg:col-span-4 lg:col-start-9"
          >
            Khi doanh nghiệp đã đi xa hơn website của mình. Sau khoảng thời gian dài phát triển, một doanh nghiệp có thể đã rất khác so với ngày đầu. Sản phẩm tốt hơn. Đội ngũ lớn hơn. Khách hàng nhiều hơn. Giá trị tích lũy qua từng năm cũng ngày một rõ ràng hơn. Nhưng website đại diện cho họ đôi khi vẫn dừng lại ở một phiên bản từ nhiều năm trước. Nét Nút Studio ra đời để thu hẹp khoảng cách đó.
          </p>
        </div>
      </div>
    </section>
  );
}
