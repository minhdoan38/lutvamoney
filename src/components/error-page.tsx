"use client";

import Link from "next/link";

import type { Dictionary } from "@/i18n/get-dictionary";
import { localePath, type Locale } from "@/i18n/config";

type ErrorCopy = Dictionary["errors"];

interface ErrorPageProps {
  status: string;
  title: string;
  description: string;
  retry?: () => void;
  locale?: Locale;
  copy: ErrorCopy;
}

export function ErrorPage({
  status,
  title,
  description,
  retry,
  locale = "en",
  copy,
}: ErrorPageProps) {
  const homeHref = localePath(locale, "/");

  return (
    <main className="error-page" aria-labelledby="error-title">
      <header className="error-page__bar">
        <Link href={homeHref} className="error-page__brand">
          Nét Nút <span>Studio</span>
        </Link>
        <p className="error-page__signal">{copy.signal}</p>
      </header>

      <div className="error-page__layout">
        <section className="error-page__copy" aria-describedby="error-description">
          <p className="error-page__code">{status}</p>
          <h1 id="error-title" className="error-page__title">
            {title}
          </h1>
          <p id="error-description" className="error-page__description">
            {description}
          </p>
          <div className="error-page__actions">
            {retry ? (
              <button
                type="button"
                onClick={retry}
                className="error-page__action error-page__action--primary"
              >
                {copy.retry}
              </button>
            ) : (
              <Link href={homeHref} className="error-page__action error-page__action--primary">
                {copy.home}
              </Link>
            )}
            {retry ? (
              <Link href={homeHref} className="error-page__action error-page__action--secondary">
                {copy.home}
              </Link>
            ) : null}
          </div>
        </section>

        <section
          className="error-page__stage"
          aria-label={copy.stageAria}
        >
          <div className="error-page__legend">
            <span>{copy.legend}</span>
            <span aria-hidden="true">01 / 01</span>
          </div>
          <div className="error-page__canvas" aria-hidden="true">
            <span className="error-page__rule error-page__rule--horizontal" />
            <span className="error-page__rule error-page__rule--vertical" />
            <div className="error-page__sheet error-page__sheet--ghost">
              <div className="error-page__sheet-header">
                <span>{copy.ghostHeader}</span>
                <span>{copy.ghostMeta}</span>
              </div>
              <div className="error-page__sheet-body">
                <span className="error-page__sheet-copy">
                  {copy.sheetCopy}
                </span>
                <span className="error-page__sheet-blocks">
                  <span className="error-page__sheet-block" />
                  <span className="error-page__sheet-block error-page__sheet-block--accent" />
                  <span className="error-page__sheet-block" />
                </span>
              </div>
            </div>
            <div className="error-page__sheet error-page__sheet--paper">
              <div className="error-page__sheet-header">
                <span>{copy.paperHeader}</span>
                <span>{copy.paperMeta}</span>
              </div>
              <div className="error-page__sheet-body">
                <span className="error-page__sheet-copy">
                  {copy.sheetCopy}
                </span>
                <span className="error-page__sheet-blocks">
                  <span className="error-page__sheet-block" />
                  <span className="error-page__sheet-block error-page__sheet-block--accent" />
                  <span className="error-page__sheet-block" />
                </span>
              </div>
            </div>
            <span className="error-page__scan" />
          </div>
        </section>
      </div>

      <footer className="error-page__footer">
        <span>{copy.footerLeft}</span>
        <span>{copy.footerRight}</span>
      </footer>
    </main>
  );
}
