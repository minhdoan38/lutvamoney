"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useHomeExperience } from "@/components/home-experience-provider";
import type { WebsiteParseError } from "@/lib/website-url";

const parseErrorCopy: Record<WebsiteParseError, string> = {
  empty: "Nhập link website trước khi chuẩn bị brief.",
  invalid: "Link website chưa đúng định dạng.",
  "unsupported-protocol": "Chỉ nhận link bắt đầu bằng http:// hoặc https://.",
};

export function FinalCTA() {
  const { subject, submitWebsite, clearWebsite } = useHomeExperience();
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const lastSubjectUrl = useRef<string | null>(null);

  useEffect(() => {
    const subjectUrl = subject?.normalizedUrl ?? null;
    if (subjectUrl === lastSubjectUrl.current) return;

    setDraft(subjectUrl ?? "");
    setError(null);
    setSubmitted(false);
    lastSubjectUrl.current = subjectUrl;
  }, [subject?.normalizedUrl]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parseError = submitWebsite(draft);

    if (parseError) {
      setError(parseErrorCopy[parseError]);
      setSubmitted(false);
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  const clear = () => {
    clearWebsite();
    setDraft("");
    setError(null);
    setSubmitted(false);
  };

  return (
    <section id="contact" className="px-4 pb-8 pt-20 sm:px-6 md:pt-28 lg:px-10">
      <div className="mx-auto max-w-[1500px] bg-accent px-5 py-12 text-[#090909] sm:px-8 md:px-12 md:py-16 lg:px-16 lg:py-20">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <h2 className="display-release max-w-[12ch] text-[clamp(3.2rem,8.6vw,8rem)] font-semibold leading-[0.82] tracking-[-0.04em]">
              Gửi website hiện tại.
            </h2>
            <p className="mt-8 max-w-[42rem] text-base leading-relaxed text-black/90 md:text-lg">
              Chúng tôi chuẩn bị một brief phía client ngay trong trình duyệt. Không gửi dữ liệu, không lưu website, không giả vờ đã phân tích.
            </p>
            {subject ? (
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.1em] text-black/75">
                Ta đang nói về {subject.domain}.
              </p>
            ) : null}
          </div>

          <form onSubmit={submit} className="self-end md:col-span-4">
            <label htmlFor="website" className="mb-3 block text-sm font-semibold">
              Link website hiện tại
            </label>
            <input
              id="website"
              name="website"
              type="url"
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value);
                setError(null);
                setSubmitted(false);
              }}
              placeholder="https://websitecuaban.vn"
              aria-invalid={Boolean(error)}
              aria-describedby="website-help website-feedback"
              className="min-h-14 w-full rounded-none border border-black/70 bg-transparent px-4 text-base text-[#090909] outline-none placeholder:text-black/80 focus:border-black"
            />
            <p id="website-help" className="mt-2 text-xs leading-relaxed text-black/85">
              Chỉ xử lý trên trình duyệt. Không gửi, không lưu.
            </p>
            <button
              type="submit"
              className="mt-5 min-h-14 w-full bg-[#090909] px-5 font-mono text-sm text-foreground transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 active:scale-[0.98]"
            >
              Chuẩn bị brief ↗
            </button>
            <p id="website-feedback" aria-live="polite" className="mt-3 text-sm text-black/80">
              {error ?? (submitted ? "Brief phía client đã được chuẩn bị trong trình duyệt." : "")}
            </p>
            {subject ? (
              <button
                type="button"
                onClick={clear}
                className="mt-3 min-h-11 border-b border-black/60 text-left text-xs font-semibold text-black/80 transition-colors hover:border-black hover:text-black"
              >
                Xóa website đã nhập
              </button>
            ) : null}
          </form>
        </div>
      </div>

      <footer className="mx-auto flex max-w-[1500px] flex-col gap-4 border-t editorial-rule py-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>Nét Nút Studio</p>
        <p>Redesign website doanh nghiệp tại Việt Nam</p>
      </footer>
    </section>
  );
}
