"use client";

import { useState } from "react";
import type { RedesignProject } from "@/data/redesigns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Panel = "original" | "redesign";
type Viewport = "desktop" | "tablet" | "mobile";

const viewportOptions: { id: Viewport; label: string }[] = [
  { id: "desktop", label: "Máy tính" },
  { id: "tablet", label: "Máy tính bảng" },
  { id: "mobile", label: "Điện thoại" },
];

const panelCopy: Record<Panel, { label: string; eyebrow: string }> = {
  original: { label: "Website cũ", eyebrow: "Điểm xuất phát" },
  redesign: { label: "Bản redesign", eyebrow: "Hướng tái cấu trúc" },
};

function Frame({
  html,
  panel,
  viewport,
}: {
  html: string;
  panel: Panel;
  viewport: Viewport;
}) {
  const widthClass = viewport === "tablet" ? "w-[768px]" : viewport === "mobile" ? "w-[390px]" : "w-full";

  return (
    <div className="overflow-auto bg-[#171717] p-2 sm:p-3">
      <iframe
        title={`${panelCopy[panel].label} preview`}
        srcDoc={html}
        sandbox=""
        loading="lazy"
        referrerPolicy="no-referrer"
        className={`block h-155 min-h-155 border-0 bg-white ${widthClass}`}
      />
    </div>
  );
}

function PanelHeader({ panel, originalUrl }: { panel: Panel; originalUrl: string | null }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{panelCopy[panel].eyebrow}</p>
        <h3 className="mt-1 text-sm font-medium text-foreground">{panelCopy[panel].label}</h3>
      </div>
      {panel === "original" && originalUrl ? (
        <a
          href={originalUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-muted underline decoration-white/25 underline-offset-4 transition-colors hover:text-foreground"
        >
          Mở website gốc
        </a>
      ) : null}
    </div>
  );
}

export function RedesignCompare({ project }: { project: RedesignProject }) {
  const [activePanel, setActivePanel] = useState<Panel>("redesign");
  const [viewport, setViewport] = useState<Viewport>("desktop");

  return (
    <section aria-labelledby="compare-title" className="border-y border-white/15 bg-[#0f0f0f]">
      <div className="flex flex-col gap-5 border-b border-white/10 px-4 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent">Khung so sánh tương tác</p>
          <h2 id="compare-title" className="mt-3 max-w-[12ch] text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[0.88] tracking-tighter">
            Nhìn cùng một bài toán.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Bản redesign chạy trong một khung cô lập và không thực thi JavaScript. Trên máy tính, hai phiên bản nằm cạnh nhau; trên điện thoại, có thể chuyển qua lại bằng hai tab.
        </p>
      </div>

      <div className="flex flex-col gap-4 border-b border-white/10 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Tabs
          value={activePanel}
          onValueChange={(value) => {
            if (value === "original" || value === "redesign") setActivePanel(value);
          }}
        >
          <TabsList aria-label="Chọn phiên bản website trên màn hình nhỏ" className="border-0 bg-transparent p-0">
            {(["original", "redesign"] as Panel[]).map((panel) => (
              <TabsTrigger
                key={panel}
                value={panel}
                className="min-h-11 border border-white/20 px-3 py-2 text-xs data-active:border-accent data-active:bg-accent data-active:text-background"
              >
                {panelCopy[panel].label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <ToggleGroup
          value={[viewport]}
          onValueChange={(value) => {
            const nextViewport = value[0];
            if (nextViewport === "desktop" || nextViewport === "tablet" || nextViewport === "mobile") {
              setViewport(nextViewport);
            }
          }}
          spacing={0}
          aria-label="Chọn kích thước khung xem"
          className="flex flex-wrap"
        >
          {viewportOptions.map((option) => (
            <ToggleGroupItem
              key={option.id}
              value={option.id}
              className="min-h-11 border border-white/20 px-3 py-2 text-xs data-[state=on]:border-foreground data-[state=on]:text-foreground"
            >
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="grid gap-px bg-white/10 md:grid-cols-2">
        <article className={activePanel === "original" ? "block" : "hidden md:block"}>
          <PanelHeader panel="original" originalUrl={project.originalUrl} />
          <Frame html={project.originalHtml} panel="original" viewport={viewport} />
        </article>
        <article className={activePanel === "redesign" ? "block" : "hidden md:block"}>
          <PanelHeader panel="redesign" originalUrl={project.originalUrl} />
          <Frame html={project.redesignHtml} panel="redesign" viewport={viewport} />
        </article>
      </div>

      <p className="px-4 py-4 text-xs leading-relaxed text-muted sm:px-6 lg:px-8">
        Đây là bản dựng minh họa bằng HTML giả định, không phải website của khách hàng. Hai phiên bản được cô lập trong sandbox để so sánh an toàn.
      </p>
    </section>
  );
}
