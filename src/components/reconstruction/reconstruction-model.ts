import type { WebsiteSubject } from "@/lib/website-url";

export type ReconstructionPhase = "inspect" | "remove" | "reflow" | "prioritize" | "rebuild";

export type ReconstructionPhaseData = {
  id: ReconstructionPhase;
  label: string;
  title: string;
  copy: string;
  annotation: string;
};

export const reconstructionPhases: ReconstructionPhaseData[] = [
  {
    id: "inspect",
    label: "Nhìn",
    title: "Nhìn thấy cấu trúc đang có.",
    copy: "Bắt đầu bằng việc nhìn vào những phần đã tích lũy, không giả vờ rằng website xuất hiện từ con số không.",
    annotation: "BOUNDARIES / SIGNAL",
  },
  {
    id: "remove",
    label: "Gỡ",
    title: "Gỡ phần đang làm nhiễu.",
    copy: "Tách những lớp thừa, khối lặp và đường vòng để thông tin có chỗ thở.",
    annotation: "NOISE / FRICTION",
  },
  {
    id: "reflow",
    label: "Xếp lại",
    title: "Xếp lại dòng chảy.",
    copy: "Cho nội dung đi theo một logic mới, gần với cách doanh nghiệp đang vận hành hôm nay.",
    annotation: "FLOW / RHYTHM",
  },
  {
    id: "prioritize",
    label: "Ưu tiên",
    title: "Ưu tiên điều cần được nhớ.",
    copy: "Tăng trọng lượng cho thông điệp, bằng chứng và hành động mà người dùng cần thấy đúng lúc.",
    annotation: "HIERARCHY / ACTION",
  },
  {
    id: "rebuild",
    label: "Dựng",
    title: "Dựng một hệ thống có thể chạy.",
    copy: "Khóa lại một hệ thống rõ ràng, linh hoạt và đủ nhẹ để đồng hành với giai đoạn tiếp theo.",
    annotation: "SYSTEM / RELEASE",
  },
];

export function getPhaseIndex(phase: ReconstructionPhase): number {
  return reconstructionPhases.findIndex((item) => item.id === phase);
}

export function getPhaseByIndex(index: number): ReconstructionPhase {
  return reconstructionPhases[Math.min(reconstructionPhases.length - 1, Math.max(0, index))].id;
}

export function stageContextLabel(subject: WebsiteSubject | null): string {
  return subject ? `INSPECTING: ${subject.domain}` : "DEMO SITE";
}
