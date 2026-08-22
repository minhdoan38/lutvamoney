"use client";

import "./globals.css";
import { ErrorPage } from "@/components/error-page";

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="vi">
      <body>
        <ErrorPage
          status="Lỗi hệ thống / 500-503"
          title="Bản dựng bị lệch."
          description="Hệ thống không thể hoàn tất trải nghiệm lúc này. Hãy thử dựng lại, hoặc quay về trang đầu để tiếp tục."
          retry={retry}
        />
      </body>
    </html>
  );
}
