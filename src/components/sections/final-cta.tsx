"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const terminalFrames = ["> Đang phân tích website của bạn", "> Đang đọc cấu trúc", "> Đã nhận website"];

export function FinalCTA() {
  const [status, setStatus] = useState<"idle" | "analyzing" | "done">("idle");
  const [frame, setFrame] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== "idle") return;

    // TODO: Implement Supabase/n8n backend logic later
    setStatus("analyzing");
    setFrame(0);
    let nextFrame = 0;
    timerRef.current = setInterval(() => {
      nextFrame += 1;
      setFrame(nextFrame);
      if (nextFrame === terminalFrames.length - 1) {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        setStatus("done");
      }
    }, 720);
  };

  return (
    <section id="contact" className="px-4 pb-8 pt-32 sm:px-6 md:pt-48 lg:px-10">
      <div className="mx-auto max-w-[1500px] bg-accent px-5 py-12 text-[#090909] sm:px-8 md:px-12 md:py-16 lg:px-16 lg:py-20">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <h2 className="max-w-[12ch] text-[clamp(3.2rem,8.6vw,8rem)] font-semibold leading-[0.82] tracking-[-0.04em]">
              Website của bạn đã cũ chưa?
            </h2>
            <p className="mt-8 max-w-[42rem] text-base leading-relaxed text-black/90 md:text-lg">
              Để lại link website của bạn. Chúng tôi sẽ cho bạn biết chính xác những gì cần thay đổi.
            </p>
          </div>

          <form onSubmit={submit} className="self-end md:col-span-4">
            <label htmlFor="website" className="mb-3 block text-sm font-semibold">
              Link website hiện tại
            </label>
            <input
              id="website"
              name="website"
              type="url"
              required
              disabled={status !== "idle"}
              placeholder="https://websitecuaban.vn"
              className="min-h-14 w-full rounded-none border border-black/70 bg-transparent px-4 text-base text-[#090909] outline-none placeholder:text-black/80 focus:border-black disabled:opacity-60"
            />
            <p className="mt-2 text-xs leading-relaxed text-black/85">
              Bản MVP chỉ mô phỏng giao diện. Chưa gửi dữ liệu ra ngoài.
            </p>
            <button
              type="submit"
              disabled={status !== "idle"}
              className="mt-5 min-h-14 w-full bg-[#090909] px-5 font-mono text-sm text-foreground transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 active:scale-[0.98] disabled:translate-y-0 disabled:cursor-wait"
            >
              {status === "idle" ? "Phân tích ngay" : terminalFrames[frame]}
            </button>
            <p aria-live="polite" className="sr-only">
              {status === "analyzing" ? "Đang phân tích website" : status === "done" ? "Đã nhận website" : ""}
            </p>
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
