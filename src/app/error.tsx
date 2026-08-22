"use client";

import { ErrorPage } from "@/components/error-page";

export default function Error({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <ErrorPage
      status="Lỗi kết nối / 500"
      title="Bản dựng bị lệch."
      description="Một phần trải nghiệm không thể hiển thị đúng lúc này. Hãy thử dựng lại, hoặc quay về trang đầu để tiếp tục."
      retry={retry}
    />
  );
}
