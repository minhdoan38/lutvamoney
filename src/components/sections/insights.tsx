const insights = [
  "Redesign website các trường đại học Việt Nam",
  "Website doanh nghiệp 15 năm tuổi đang sai ở đâu",
  "Một homepage tốt thực sự cần gì",
];

export function Insights() {
  return (
    <section id="insights" className="px-4 py-32 sm:px-6 md:py-48 lg:px-10">
      <div className="mx-auto max-w-[1500px]">
        <h2 className="mb-14 max-w-[10ch] text-[clamp(3.4rem,8vw,8rem)] font-semibold leading-[0.84] tracking-[-0.04em] md:mb-20">
          Đập web ra xem
        </h2>

        <div className="border-t editorial-rule">
          {insights.map((insight) => (
            <article key={insight} className="grid gap-6 border-b editorial-rule py-7 md:grid-cols-12 md:items-center md:px-3 md:py-10">
              <h3 className="max-w-[22ch] text-[clamp(1.7rem,3.9vw,4rem)] font-medium leading-[0.95] tracking-[-0.035em] md:col-span-9">
                {insight}
              </h3>
              <span className="text-sm text-white/55 md:col-span-3 md:text-right">
                Sắp ra mắt
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
