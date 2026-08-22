export type RedesignProject = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  originalLabel: string;
  originalUrl: string | null;
  diagnosis: readonly string[];
  decisions: readonly string[];
  nextStep: string;
  originalHtml: string;
  redesignHtml: string;
};

const originalHtml = `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Nhà Mộc | Nội thất thủ công</title>
  <style>
    :root { color-scheme: light; font-family: Arial, sans-serif; color: #263238; background: #f1eee8; }
    * { box-sizing: border-box; }
    body { margin: 0; background: #f1eee8; }
    header { display: flex; align-items: center; justify-content: space-between; padding: 18px 7%; background: #fff; border-bottom: 1px solid #d7d0c6; }
    .logo { font-size: 18px; font-weight: 700; color: #526b50; }
    nav { display: flex; gap: 22px; font-size: 12px; color: #63706b; }
    .hero { padding: 72px 7%; text-align: center; background: #dce4d5; }
    .hero h1 { max-width: 620px; margin: 0 auto 14px; font-size: clamp(34px, 6vw, 68px); line-height: 1.05; color: #526b50; }
    .hero p { max-width: 460px; margin: 0 auto 26px; line-height: 1.6; color: #66736b; }
    .button { display: inline-block; padding: 13px 20px; background: #526b50; color: #fff; text-decoration: none; font-size: 12px; }
    .content { max-width: 1040px; margin: 0 auto; padding: 48px 7%; }
    .content h2 { margin: 0 0 24px; font-size: 28px; color: #526b50; }
    .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .card { min-height: 150px; padding: 18px; background: #fff; border: 1px solid #ddd6cc; }
    .card strong { display: block; margin-bottom: 10px; font-size: 14px; }
    .card p { margin: 0; font-size: 12px; line-height: 1.6; color: #78827c; }
    footer { padding: 28px 7%; background: #263238; color: #fff; font-size: 12px; }
    @media (max-width: 620px) { nav { display: none; } .hero { padding: 48px 7%; } .cards { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <header><div class="logo">Nhà Mộc</div><nav><span>Sản phẩm</span><span>Câu chuyện</span><span>Liên hệ</span></nav><a class="button" href="#contact">Xem sản phẩm</a></header>
  <main>
    <section class="hero"><h1>Không gian sống gần với tự nhiên</h1><p>Nội thất thủ công được làm chậm, chọn kỹ và dành cho những căn nhà có câu chuyện riêng.</p><a class="button" href="#products">Khám phá bộ sưu tập</a></section>
    <section class="content" id="products"><h2>Sản phẩm nổi bật</h2><div class="cards"><article class="card"><strong>Bàn gỗ nguyên khối</strong><p>Gỗ tự nhiên, hoàn thiện bằng dầu lau.</p></article><article class="card"><strong>Ghế tựa mây</strong><p>Khung gỗ chắc, mặt đan thủ công.</p></article><article class="card"><strong>Kệ thấp phòng khách</strong><p>Thiết kế gọn cho nhịp sống hàng ngày.</p></article></div></section>
  </main>
  <footer id="contact">Đặt một món đồ có thể ở lại lâu hơn.</footer>
</body>
</html>`;

const redesignHtml = `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Nhà Mộc / Một khoảng thở</title>
  <style>
    :root { color-scheme: dark; font-family: Arial, sans-serif; color: #f3f0e9; background: #111; }
    * { box-sizing: border-box; }
    body { margin: 0; background: #111; }
    header { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 22px 6%; border-bottom: 1px solid #383838; }
    .logo { font-size: 14px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    nav { display: flex; gap: 22px; font-size: 11px; color: #a4a09a; }
    .button { display: inline-block; padding: 12px 16px; background: #f4512a; color: #111; text-decoration: none; font-size: 11px; font-weight: 700; }
    .hero { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(170px, .7fr); gap: 8%; min-height: 430px; padding: 8% 6%; border-bottom: 1px solid #383838; }
    .eyebrow { margin: 0 0 28px; color: #f4512a; font-size: 10px; letter-spacing: .18em; text-transform: uppercase; }
    .hero h1 { max-width: 680px; margin: 0; font-size: clamp(48px, 9vw, 108px); line-height: .86; letter-spacing: -.07em; }
    .hero-copy { align-self: end; max-width: 250px; color: #aaa59e; font-size: 14px; line-height: 1.55; }
    .hero-copy p { margin: 0 0 26px; }
    .signal { align-self: end; display: grid; gap: 10px; }
    .signal div { min-height: 46px; padding: 12px; background: #f4512a; color: #111; font-size: 11px; font-weight: 700; }
    .content { padding: 7% 6%; }
    .content h2 { max-width: 480px; margin: 0 0 36px; font-size: clamp(30px, 5vw, 58px); line-height: .92; letter-spacing: -.05em; }
    .cards { display: grid; grid-template-columns: 1.4fr .8fr .8fr; gap: 1px; background: #383838; border: 1px solid #383838; }
    .card { min-height: 160px; padding: 18px; background: #1a1a1a; }
    .card:first-child { background: #f4512a; color: #111; }
    .card strong { display: block; margin-bottom: 40px; font-size: 16px; }
    .card p { max-width: 18ch; margin: 0; font-size: 12px; line-height: 1.45; color: #aaa59e; }
    .card:first-child p { color: #111; }
    footer { display: flex; justify-content: space-between; gap: 18px; padding: 22px 6%; border-top: 1px solid #383838; color: #aaa59e; font-size: 11px; }
    @media (max-width: 620px) { header nav { display: none; } .hero { display: block; min-height: auto; padding: 14% 6%; } .hero h1 { margin-bottom: 56px; } .hero-copy { margin-bottom: 34px; } .signal { grid-template-columns: 1fr 1fr; } .cards { grid-template-columns: 1fr; } .card strong { margin-bottom: 28px; } footer { display: block; } }
  </style>
</head>
<body>
  <header><div class="logo">Nhà Mộc / 01</div><nav><span>Không gian</span><span>Vật liệu</span><span>Câu chuyện</span></nav><a class="button" href="#contact">Bắt đầu từ căn nhà</a></header>
  <main>
    <section class="hero"><div><p class="eyebrow">Nội thất thủ công / Demo</p><h1>Một khoảng thở cho căn nhà.</h1></div><div class="hero-copy"><p>Thay vì mở đầu bằng một danh sách sản phẩm, trang mới bắt đầu bằng cảm giác mà thương hiệu muốn để lại.</p><a class="button" href="#products">Xem cách làm</a></div><div class="signal"><div>Gỗ thật</div><div>Làm chậm</div></div></section>
    <section class="content" id="products"><h2>Ít món hơn. Đúng chỗ hơn.</h2><div class="cards"><article class="card"><strong>Bộ sưu tập theo nhịp sống</strong><p>Ba nhóm sản phẩm, một đường đi rõ ràng từ cảm hứng đến lựa chọn.</p></article><article class="card"><strong>01 / Bàn</strong><p>Một mặt phẳng để ngày bắt đầu.</p></article><article class="card"><strong>02 / Ghế</strong><p>Một chỗ ngồi để ở lại lâu hơn.</p></article></div></section>
  </main>
  <footer id="contact"><span>Nhà Mộc / Một khoảng thở</span><span>Gửi yêu cầu tư vấn</span></footer>
</body>
</html>`;

export const redesignProjects: readonly RedesignProject[] = [
  {
    slug: "nha-moc-demo",
    title: "Một website dịch vụ cần một điểm bắt đầu rõ ràng",
    kicker: "Demo / website nội thất thủ công",
    summary:
      "Một bản dựng mẫu cho thấy cách chuyển một homepage nhiều thông tin thành một đường đi có thứ tự, có nhịp và có lý do.",
    originalLabel: "Mẫu website cũ",
    originalUrl: null,
    diagnosis: [
      "Hero giới thiệu sản phẩm trước khi nói rõ cảm giác và khác biệt của thương hiệu.",
      "Ba nhóm sản phẩm đứng ngang nhau nên người xem không biết nên bắt đầu từ đâu.",
      "Nút hành động xuất hiện nhiều nhưng chưa gắn với một bước tiếp theo cụ thể.",
    ],
    decisions: [
      "Đưa một ý chính lên đầu trang thay cho nhiều thông điệp cạnh tranh.",
      "Dùng màu cam như tín hiệu dẫn đường, không dùng như lớp trang trí.",
      "Chuyển danh sách sản phẩm thành các điểm vào theo nhịp sống.",
    ],
    nextStep:
      "Khi có HTML thật, bản demo này sẽ đổi phần nội dung và giữ nguyên khung so sánh, case study và cấu trúc SEO.",
    originalHtml,
    redesignHtml,
  },
];

export function getRedesignProject(slug: string) {
  return redesignProjects.find((project) => project.slug === slug);
}
