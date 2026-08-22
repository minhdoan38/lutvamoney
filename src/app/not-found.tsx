import { ErrorPage } from "@/components/error-page";

export default function NotFound() {
  return (
    <ErrorPage
      status="Đường dẫn không tồn tại / 404"
      title="Không tìm thấy bản dựng."
      description="Đường dẫn này không tồn tại hoặc đã được chuyển đi. Hãy quay về trang đầu để tiếp tục."
    />
  );
}
