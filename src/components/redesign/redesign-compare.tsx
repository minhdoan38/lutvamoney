"use client";

import { useState } from "react";
import type { RedesignProject } from "@/data/redesigns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { Dictionary } from "@/i18n/get-dictionary";

type Panel = "original" | "redesign";
type Viewport = "desktop" | "tablet" | "mobile";
type CompareCopy = Dictionary["redesign"]["compare"];

function Frame({
  html,
  viewport,
  label,
}: {
  html: string;
  viewport: Viewport;
  label: string;
}) {
  const widthClass = viewport === "tablet" ? "w-[768px]" : viewport === "mobile" ? "w-[390px]" : "w-full";

  return (
    <div className="overflow-auto bg-card p-2 sm:p-3">
      <iframe
        title={`${label} preview`}
        srcDoc={html}
        sandbox=""
        loading="lazy"
        referrerPolicy="no-referrer"
        className={`block h-155 min-h-155 border-0 bg-foreground ${widthClass}`}
      />
    </div>
  );
}

function PanelHeader({
  panel,
  originalUrl,
  copy,
}: {
  panel: Panel;
  originalUrl: string | null;
  copy: CompareCopy;
}) {
  const eyebrow = panel === "original" ? copy.panelOriginalEyebrow : copy.panelRedesignEyebrow;
  const label = panel === "original" ? copy.panelOriginal : copy.panelRedesign;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-foreground/10 px-4 py-3">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{eyebrow}</p>
        <h3 className="mt-1 text-sm font-medium text-foreground">{label}</h3>
      </div>
      {panel === "original" && originalUrl ? (
        <a
          href={originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground"
        >
          {copy.openOriginal}
        </a>
      ) : null}
    </div>
  );
}

type RedesignCompareProps = {
  project: RedesignProject;
  copy: CompareCopy;
};

export function RedesignCompare({ project, copy }: RedesignCompareProps) {
  const [activePanel, setActivePanel] = useState<Panel>("redesign");
  const [viewport, setViewport] = useState<Viewport>("desktop");

  const viewportOptions: { id: Viewport; label: string }[] = [
    { id: "desktop", label: copy.desktop },
    { id: "tablet", label: copy.tablet },
    { id: "mobile", label: copy.mobile },
  ];

  return (
    <section aria-labelledby="compare-title" className="border-y border-line bg-card">
      <div className="flex flex-col gap-5 border-b border-foreground/10 px-4 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent">{copy.eyebrow}</p>
          <h2 id="compare-title" className="mt-3 max-w-[12ch] text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[0.88] tracking-tighter">
            {copy.title}
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          {copy.lede}
        </p>
      </div>

      <div className="flex flex-col gap-4 border-b border-foreground/10 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Tabs
          value={activePanel}
          onValueChange={(value) => {
            if (value === "original" || value === "redesign") setActivePanel(value);
          }}
        >
          <TabsList aria-label={copy.tabsAria} className="border-0 bg-transparent p-0">
            {(["original", "redesign"] as Panel[]).map((panel) => (
              <TabsTrigger
                key={panel}
                value={panel}
                className="min-h-11 border border-foreground/20 px-3 py-2 text-xs data-active:border-accent data-active:bg-accent data-active:text-background"
              >
                {panel === "original" ? copy.panelOriginal : copy.panelRedesign}
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
          aria-label={copy.viewportAria}
          className="flex flex-wrap"
        >
          {viewportOptions.map((option) => (
            <ToggleGroupItem
              key={option.id}
              value={option.id}
              className="min-h-11 border border-foreground/20 px-3 py-2 text-xs data-[state=on]:border-foreground data-[state=on]:text-foreground"
            >
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="grid gap-px bg-foreground/10 md:grid-cols-2">
        <article className={activePanel === "original" ? "block" : "hidden md:block"}>
          <PanelHeader panel="original" originalUrl={project.originalUrl} copy={copy} />
          <Frame html={project.originalHtml} viewport={viewport} label={copy.panelOriginal} />
        </article>
        <article className={activePanel === "redesign" ? "block" : "hidden md:block"}>
          <PanelHeader panel="redesign" originalUrl={project.originalUrl} copy={copy} />
          <Frame html={project.redesignHtml} viewport={viewport} label={copy.panelRedesign} />
        </article>
      </div>

      <p className="px-4 py-4 text-xs leading-relaxed text-muted sm:px-6 lg:px-8">
        {copy.footnote}
      </p>
    </section>
  );
}
