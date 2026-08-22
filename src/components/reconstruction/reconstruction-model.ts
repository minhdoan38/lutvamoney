import type { WebsiteSubject } from "@/lib/website-url";

export type ReconstructionPhase = "inspect" | "remove" | "reflow" | "prioritize" | "rebuild";

export type ReconstructionPhaseData = {
  id: ReconstructionPhase;
  label: string;
  title: string;
  copy: string;
  annotation: string;
  visualClass: string;
  density: string;
  hierarchy: string;
  ctaScale: string;
  columnFlow: string;
};

export const reconstructionPhases: ReconstructionPhaseData[] = [
  {
    id: "inspect",
    label: "Nhìn",
    title: "Nhìn thấy cấu trúc đang có.",
    copy: "Bắt đầu bằng việc nhìn vào những phần đã tích lũy, không giả vờ rằng website xuất hiện từ con số không.",
    annotation: "BOUNDARIES / SIGNAL",
    visualClass: "stage-phase--inspect",
    density: "1",
    hierarchy: "0.38",
    ctaScale: "0.78",
    columnFlow: "12",
  },
  {
    id: "remove",
    label: "Gỡ",
    title: "Gỡ phần đang làm nhiễu.",
    copy: "Tách những lớp thừa, khối lặp và đường vòng để thông tin có chỗ thở.",
    annotation: "NOISE / FRICTION",
    visualClass: "stage-phase--remove",
    density: "0.82",
    hierarchy: "0.48",
    ctaScale: "0.84",
    columnFlow: "10",
  },
  {
    id: "reflow",
    label: "Xếp lại",
    title: "Xếp lại dòng chảy.",
    copy: "Cho nội dung đi theo một logic mới, gần với cách doanh nghiệp đang vận hành hôm nay.",
    annotation: "FLOW / RHYTHM",
    visualClass: "stage-phase--reflow",
    density: "0.68",
    hierarchy: "0.62",
    ctaScale: "0.9",
    columnFlow: "9",
  },
  {
    id: "prioritize",
    label: "Ưu tiên",
    title: "Ưu tiên điều cần được nhớ.",
    copy: "Tăng trọng lượng cho thông điệp, bằng chứng và hành động mà người dùng cần thấy đúng lúc.",
    annotation: "HIERARCHY / ACTION",
    visualClass: "stage-phase--prioritize",
    density: "0.5",
    hierarchy: "0.8",
    ctaScale: "1.08",
    columnFlow: "8",
  },
  {
    id: "rebuild",
    label: "Dựng",
    title: "Dựng một hệ thống có thể chạy.",
    copy: "Khóa lại một hệ thống rõ ràng, linh hoạt và đủ nhẹ để đồng hành với giai đoạn tiếp theo.",
    annotation: "SYSTEM / RELEASE",
    visualClass: "stage-phase--rebuild",
    density: "0.32",
    hierarchy: "1",
    ctaScale: "1.24",
    columnFlow: "8",
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
