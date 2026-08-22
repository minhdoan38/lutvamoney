"use client";

import Link from "next/link";

interface ErrorPageProps {
  status: string;
  title: string;
  description: string;
  retry?: () => void;
}

export function ErrorPage({
  status,
  title,
  description,
  retry,
}: ErrorPageProps) {
  return (
    <main className="error-page" aria-labelledby="error-title">
      <header className="error-page__bar">
        <Link href="/" className="error-page__brand">
          Nét Nút <span>Studio</span>
        </Link>
        <p className="error-page__signal">Không thể hoàn tất bản dựng hiện tại</p>
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
                Thử dựng lại
              </button>
            ) : (
              <Link href="/" className="error-page__action error-page__action--primary">
                Về trang đầu
              </Link>
            )}
            {retry ? (
              <Link href="/" className="error-page__action error-page__action--secondary">
                Về trang đầu
              </Link>
            ) : null}
          </div>
        </section>

        <section
          className="error-page__stage"
          aria-label="Minh họa bản dựng đang tự căn chỉnh"
        >
          <div className="error-page__legend">
            <span>Hệ thống đang căn chỉnh</span>
            <span aria-hidden="true">01 / 01</span>
          </div>
          <div className="error-page__canvas" aria-hidden="true">
            <span className="error-page__rule error-page__rule--horizontal" />
            <span className="error-page__rule error-page__rule--vertical" />
            <div className="error-page__sheet error-page__sheet--ghost">
              <div className="error-page__sheet-header">
                <span>Vùng không ổn định</span>
                <span>Offset</span>
              </div>
              <div className="error-page__sheet-body">
                <span className="error-page__sheet-copy">
                  Cấu trúc cần trở về đúng chỗ.
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
                <span>Bản dựng mới</span>
                <span>Ready</span>
              </div>
              <div className="error-page__sheet-body">
                <span className="error-page__sheet-copy">
                  Cấu trúc cần trở về đúng chỗ.
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
        <span>Nét Nút Studio / Editorial reconstruction</span>
        <span>Trang này không lưu dữ liệu nào</span>
      </footer>
    </main>
  );
}
