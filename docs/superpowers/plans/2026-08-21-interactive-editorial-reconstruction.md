# Nét Nút Interactive Editorial Reconstruction Implementation Plan

> **For agentic workers:** Implement task-by-task and verify each checkpoint before continuing. Treat the current dirty working tree as the baseline; never reset or overwrite unrelated user changes.

**Goal:** Recompose homepage và About thành một “interactive editorial diagnostic instrument” cho studio redesign website Việt Nam, ưu tiên desktop nhưng không làm regression mobile.

**Architecture:** Giữ route và anchor công khai hiện tại, thay cấu trúc trình bày bên trong. Homepage dùng một client-side context cho URL, một Reconstruction Stage năm pha và section-aware navigation. Motion dùng GSAP, Lenis và Roboto Flex có kiểm soát; không thêm backend, WebGL hay test dependency.

**Tech Stack:** Next.js 16.3 App Router, React 19, TypeScript, Tailwind CSS v4, GSAP, Lenis, `next/font`.

**Spec sources:** `PRODUCT.md`, `DESIGN.md` và direction gốc trong attachment.

## Success criteria

- Nhập `abc.vn` ở hero được chuẩn hóa thành `https://abc.vn`, domain xuất hiện tại Reconstruction Stage và CTA cuối.
- Không có request phân tích, lưu trữ, fake loading, fake metric hay kết quả được trình bày như dữ liệu thật.
- Desktop có section-context nav, variable typography và Reconstruction Stage đủ năm pha.
- Scroll, phase controls, keyboard và reduced-motion cùng dẫn tới một trạng thái nhất quán.
- `/` và `/about` không còn màn transition che nội dung lúc tải.
- Mobile 390px không tràn ngang; menu, form và reconstruction toggle vẫn dùng được.
- `npm run lint` và `npm run build` đều thành công, không có console error trên hai route.

## Interfaces and fixed decisions

Không thêm public network API. Các contract nội bộ phải dùng đúng tên sau:

```ts
export type WebsiteSubject = {
  rawInput: string;
  normalizedUrl: string;
  domain: string;
};

export type WebsiteParseError =
  | "empty"
  | "invalid"
  | "unsupported-protocol";

export type WebsiteParseResult =
  | { ok: true; subject: WebsiteSubject }
  | { ok: false; error: WebsiteParseError };

export type ReconstructionPhase =
  | "inspect"
  | "remove"
  | "reflow"
  | "prioritize"
  | "rebuild";
```

`parseWebsiteInput(rawInput)` phải trim khoảng trắng, tự thêm `https://` nếu thiếu scheme, chỉ chấp nhận `http:`/`https:`, từ chối credentials hoặc hostname rỗng, giữ URL chuẩn hóa cho input, và hiển thị hostname lowercase bỏ tiền tố `www.`. Không fetch, persist, ghi local storage hoặc truyền dữ liệu ra ngoài.

Homepage context cung cấp `subject`, `submitWebsite(rawInput)` và `clearWebsite()`. Provider chỉ bọc homepage, không bọc toàn bộ root layout.

## Implementation tasks

### Task 1 — Freeze baseline and replace conflicting documentation

**Files:** `PRODUCT.md`, `DESIGN.md`, hai plan/spec premium cũ.

- [ ] Ghi nhận `git status --short` và `git diff`; không reset các thay đổi hiện có trong navigation, cursor, spacing hoặc selected-work.
- [ ] Không đưa `next.config.ts`, `.agents/`, `opencode.json` hay thay đổi ngoài feature vào commit.
- [ ] Cập nhật `PRODUCT.md` với SME 20–100 nhân sự, decision makers, ngân sách từ dưới 50 đến khoảng 150 triệu VNĐ, user tension “giữ equity nhưng bỏ legacy friction”, ba cấp conversion và desktop-first/mobile-no-regression.
- [ ] Khóa truth boundary: synthetic UI và hypothetical examples được phép khi có nhãn; cấm fake audit, score, client, testimonial, result hoặc loading.
- [ ] Viết lại `DESIGN.md` với ba màu `#090909`, `#EDEDED`, `#FF3300`; tonal depth chỉ dùng alpha của ba màu này.
- [ ] Ghi rõ typography states, composition modes, density rhythm, interaction grammar, motion families, semantic red và danh sách anti-pattern.
- [ ] Đánh dấu plan/spec “Obsidian + Champagne” cũ là `Superseded`, trỏ tới plan này để agent sau không triển khai nhầm.

**Checkpoint:** PRODUCT và DESIGN không còn champagne, glass, pill-nav hay mobile art-direction đầy đủ trái với scope mới.

### Task 2 — Establish typography, motion and material foundation

**Files:** `src/app/layout.tsx`, `src/app/globals.css`, `src/components/smooth-scroll.tsx`, tạo `src/lib/motion.ts`.

- [ ] Thêm `Roboto_Flex` qua `next/font/google` với subset `latin`, `vietnamese`, axes `wdth`, `opsz`, `GRAD` và CSS variable `--font-display`.
- [ ] Giữ Geist Sans cho body và Geist Mono chỉ cho machine voice/metadata.
- [ ] Định nghĩa token motion duy nhất: fast `160–240ms`, editorial `500–900ms`, reconstruction `900–1600ms`; dùng tối đa ba easing family.
- [ ] Tạo typography states bằng `font-variation-settings`, không mô phỏng width bằng scale toàn bộ chữ khi làm giảm độ đọc.
- [ ] Cho Lenis cập nhật một CSS variable velocity đã clamp, không dùng React state theo frame và không thêm raw scroll listener.
- [ ] Grain là overlay CSS tĩnh, monochrome, opacity rất thấp; không dùng ảnh bitmap lớn hoặc filter animation.
- [ ] Loại bỏ `AboutRouteTransition` khỏi layout và xóa CSS/component liên quan sau khi xác nhận không còn import.
- [ ] Bảo đảm headline và CTA có trong HTML trước choreography; JS chỉ nâng cấp chuyển động.

**Checkpoint:** build pass; tải trực tiếp `/` và `/about` không bị màn đỏ/đen che nội dung.

### Task 3 — Build shared URL flow, context navigation and hero

**Files:** tạo `src/lib/website-url.ts`, `src/components/home-experience-provider.tsx`; sửa `src/app/page.tsx`, `src/components/site-nav.tsx`, `src/components/sections/hero.tsx`.

- [ ] Viết parser và context theo contract đã khóa; provider không phụ thuộc DOM để có thể kiểm tra logic độc lập.
- [ ] Hero H1 dùng copy: “Website cũ. Không có nghĩa là phải bỏ.”
- [ ] Supporting copy: “Ta giữ phần còn giá trị. Gỡ những gì đang làm doanh nghiệp chậm lại. Dựng lại một website rõ hơn, nhanh hơn, đúng với công ty hiện tại.”
- [ ] Hero form dùng label “Website đang có vấn đề ở đâu?”, CTA “Bắt đầu soi ↗” và helper “Chỉ xử lý trên trình duyệt. Không gửi, không lưu.”
- [ ] Submit hợp lệ cập nhật context rồi cuộn tới `#work`; submit lỗi giữ focus tại input và hiển thị message bằng `aria-live`.
- [ ] Nav desktop thành thin rectangular rail: logo trái, context hiện tại giữa, CTA phải; bỏ translucent pill.
- [ ] Dùng `IntersectionObserver` theo các anchor hiện có để cập nhật `/ CHẨN ĐOÁN`, `/ TÁI CẤU TRÚC`, `/ NĂNG LỰC`, `/ STUDIO`, `/ GÓC NHÌN`.
- [ ] About dùng context tĩnh `/ STUDIO`; mobile giữ menu disclosure và touch target tối thiểu 44px.
- [ ] Pill chỉ còn cho state/toggle; CTA và navigation action dùng geometry vuông.

**Checkpoint:** thử `abc.vn`, URL hợp lệ/không hợp lệ, back/forward, nav anchor và link About trong browser.

### Task 4 — Replace generic sections with diagnostic editorial fields

**Files:** đổi `services.tsx` thành `diagnosis.tsx`; sửa `capabilities.tsx`, `page.tsx`.

- [ ] Diagnosis dùng H2 “Cũ ở đâu, phải nhìn cho đúng.” và bốn dimensions: Cấu trúc, Thứ bậc, Nội dung, Chuyển đổi.
- [ ] Mỗi dimension là ruled track, không phải card; hover/focus chỉ tiết lộ câu hỏi chẩn đoán chung, không tuyên bố đã phân tích URL của người dùng.
- [ ] Gắn nhãn “Khung chẩn đoán minh họa” tại nơi machine UI có thể bị hiểu thành dữ liệu thật.
- [ ] Capabilities đổi từ magnetic chips sang typographic field với các mục: Information architecture, Content hierarchy, UI system, Responsive behavior, Front-end motion, Performance, Conversion path, Design system.
- [ ] Hover và keyboard focus stretch type trong giới hạn đọc được, hiện micro-description và system annotation; click khóa/mở active item.
- [ ] Desktop composition lần lượt dùng Compression và Expansion; không tạo equal-column grid.

**Checkpoint:** toàn bộ mục dùng được bằng Tab/Enter/Escape, không có thông tin chỉ xuất hiện bằng hover.

### Task 5 — Build the five-phase Reconstruction Stage

**Files:** đổi `selected-work.tsx` thành `reconstruction-stage.tsx`; tạo `src/components/reconstruction/reconstruction-model.ts` và contextual cursor component.

- [ ] Dữ liệu pha dùng đúng thứ tự: `Inspect → Remove → Reflow → Prioritize → Rebuild`, với visible copy `Nhìn → Gỡ → Xếp lại → Ưu tiên → Dựng`.
- [ ] Desktop dùng một sticky stage và năm scroll sentinels; mỗi sentinel cập nhật cùng một `activePhase`, tránh tách React state khỏi GSAP state.
- [ ] Phase controls cuộn tới sentinel tương ứng; ArrowLeft/ArrowRight chuyển pha; focus không bị giữ trong sticky scene.
- [ ] Synthetic old-site art gồm rigid nav, crowded grid, weak CTA và placeholder corporate blocks; các pha lần lượt hiện bounding boxes, bỏ noise, đổi column flow, tăng hierarchy và khóa hệ thống mới.
- [ ] Khi có `WebsiteSubject`, chỉ hiển thị `INSPECTING: domain`; khi chưa có dùng `DEMO SITE`. Không sinh score hay claim riêng cho domain.
- [ ] Drag ở pha `rebuild` điều khiển `--compare-progress`, đồng thời thay density, hierarchy, CTA size và column geometry — không dùng wipe-image slider truyền thống.
- [ ] Có nút Before/After và keyboard fallback đặt progress về `0/100`.
- [ ] Contextual cursor chỉ render trong stage trên fine pointer; label `GIỮ ĐỂ SOI` hoặc `KÉO ĐỂ SO`. Native cursor giữ nguyên ở phần còn lại.
- [ ] Xóa `CustomCursor.tsx` và `cursor-follower.tsx` sau khi `rg` xác nhận không còn import.
- [ ] Reduced motion bỏ pin/scrub/drag choreography, hiển thị năm bước tĩnh và toggle Before/After.
- [ ] Mobile hiển thị stage theo flow dọc và toggle; không pin và không custom cursor.

**Checkpoint:** scroll xuôi/ngược, click phase, phím mũi tên, drag, reduced motion và mobile đều dùng chung trạng thái đúng.

### Task 6 — Complete homepage pacing and truthful conversion

**Files:** đổi `process-about.tsx` thành `studio-process.tsx`; sửa `insights.tsx`, `final-cta.tsx`, `page.tsx`.

- [ ] Story order cuối: Hero airy → Diagnosis dense → Reconstruction chaotic → Capabilities dense → Studio/process release → Insights calm → Conversion focused.
- [ ] Studio headline: “Một studio nhỏ. Làm trực tiếp. Ít tầng trung gian.”
- [ ] Process dùng năm động từ `Nhìn, Giữ, Gỡ, Dựng, Chạy`; không dùng agency process generic.
- [ ] Insights giữ “Đập web ra xem”; nội dung chưa xuất bản không biến thành link giả.
- [ ] Final CTA dùng H2 “Gửi website hiện tại.” và dùng lại cùng context/parser với hero.
- [ ] Nếu đã nhập URL, prefill normalized URL và hiện “Ta đang nói về domain.” Nếu chưa nhập, form hoạt động độc lập.
- [ ] Loại bỏ trạng thái “Mẫu phân tích đã sẵn sàng” và ba nhận xét giả hiện tại; thay bằng confirmation trung thực rằng đây là bước chuẩn bị brief phía client.
- [ ] Vermilion chỉ xuất hiện ở intervention, active state và conversion; không dùng để lấp khoảng trống.

**Checkpoint:** nhập từ hero hoặc CTA đều tạo cùng một subject; reset ở CTA xóa subject ở mọi nơi.

### Task 7 — Synchronize About without duplicating the homepage showpiece

**Files:** `src/components/about/*.tsx`, `src/app/about/page.tsx`.

- [ ] About hero dùng composition Release và display width state nhưng không có full-screen loader.
- [ ] Giữ Dictionary như phần giải thích “Nét tạo cảm giác / Nút tạo hành động”; đây là sticky scene duy nhất trên About.
- [ ] Manifesto khóa ba quan điểm: “Giữ cái đáng giữ. Gỡ cái đang cản. Dựng cái cần chạy.”
- [ ] Vision và Culture chuyển thành editorial tracks, giới thiệu studio nhỏ, làm trực tiếp, năng lực DESIGN/CODE/MOTION.
- [ ] Loại bỏ pin hoặc velocity animation cạnh tranh trong Manifesto, Vision và Outro; mỗi viewport chỉ có một dominant motion idea.
- [ ] Outro dùng CTA “Có website cần dựng lại?” trỏ tới `/#contact`.
- [ ] Tất cả animation có cleanup trong GSAP context, reduced-motion fallback và nội dung luôn đọc được khi JS chưa chạy.

**Checkpoint:** điều hướng `/ → /about → /#contact`, focus order, reduced motion và refresh trực tiếp `/about`.

### Task 8 — Manual browser QA and documentation closeout

Không thêm Playwright hoặc test dependency.

- [ ] Chạy `npm run lint`, `npm run build` và `git diff --check`.
- [ ] Desktop QA tại `1440×1000` và `1280×800` cho `/` và `/about`.
- [ ] Mobile no-regression tại `390×844`: không overflow; nav, URL form, phase toggle và CTA dùng được.
- [ ] Keyboard-only: skip link, nav, diagnosis, capability field, reconstruction phases, compare controls và form.
- [ ] Emulate reduced motion: không pin/scrub/custom cursor; mọi nội dung và state vẫn truy cập được.
- [ ] Kiểm tra console warning/error sau load, navigation, submit, reset và drag.
- [ ] Negative scan: không glassmorphism, bento, floating SaaS card, fake terminal, neon, 3D orb, marquee filler, scrambled blocking text, fake metric hoặc CTA bị delay.
- [ ] Kiểm tra hiệu năng theo contract: không animated filter, không raw scroll listener, không React render theo scroll velocity, mobile không chạy desktop stage.
- [ ] Cập nhật `.impeccable/design.json` từ DESIGN đã triển khai; không để tài liệu mô tả khác mã nguồn.
- [ ] Review diff cuối để bảo đảm không cuốn theo `next.config.ts` hoặc file ngoài scope.

## Assumptions and non-goals

- Homepage, About, PRODUCT và DESIGN đều trong phạm vi.
- Desktop là art-direction target; mobile chỉ phải không regression.
- Copy được viết lại có kiểm soát, nhưng không thêm proof hay claim mới.
- V1 không có backend, analytics, persistence, API audit, AI analysis hoặc gửi lead.
- Không thêm runtime/dev dependency, canvas, WebGL, hình stock hoặc project asset giả.
- Route `/`, `/about` và các anchor `#services`, `#work`, `#capabilities`, `#process`, `#insights`, `#contact` phải giữ tương thích.
- Các thay đổi chưa commit hiện tại là baseline cần hợp nhất; không dùng reset hoặc checkout để loại bỏ chúng.
