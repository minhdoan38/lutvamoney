# Nét Nút Studio Premium Visual Refresh

## Mục tiêu

Nâng cấp toàn bộ lớp trình bày của trang chủ và trang About theo hướng sang trọng, cao cấp và tinh tế hơn, đồng thời giữ nguyên nội dung, cấu trúc chức năng, logic và luồng tương tác hiện tại.

Thiết kế phải làm Nét Nút trông như một studio chuyên môn cao dành cho doanh nghiệp Việt Nam, không biến website thành mẫu landing page luxury chung chung.

## Phạm vi

### Trong phạm vi

- Trang chủ tại `/`.
- Trang About tại `/about`.
- Hệ thống token màu, typography, spacing, radius, border, shadow và surface.
- Styling của navigation, hero, service rows, selected work, capability chips, process/about slabs, insight rows, final CTA và các section About.
- Responsive presentation cho desktop, tablet và mobile.
- Trạng thái focus, hover, active, reduced transparency và reduced motion hiện có.

### Ngoài phạm vi

- Không thay đổi copy, metadata, URL, route, anchor ID hoặc nhãn navigation.
- Không thêm, xóa hoặc đổi thứ tự section.
- Không thay đổi component state, form behavior, menu behavior hoặc URL submission simulation.
- Không thay đổi cấu trúc dữ liệu nội dung.
- Không thêm backend, analytics hoặc dependency UI mới.
- Không thay thế synthetic project visual bằng claim, logo, testimonial hay dữ liệu khách hàng không có thật.

## Ràng buộc bất biến

Toàn bộ animation hiện có là tài sản cần bảo toàn. Không thay đổi timing, easing, trigger, sequence, transform, mask, hover motion, loading animation hoặc reduced-motion behavior.

Đặc biệt, phần "Cách chúng tôi soi" phải giữ nguyên:

- GSAP reveal khi section vào viewport.
- Circular mask theo con trỏ trên desktop.
- Lens position và opacity feedback.
- Old/new toggle trên mobile.
- Keyboard ArrowLeft/ArrowRight behavior.
- `clip-path` transition và trạng thái reduced motion.

Các chỉnh sửa tại component có animation chỉ được giới hạn ở class trình bày tĩnh như màu, border, background, radius, shadow, spacing và typography. Không sửa hook, event handler, selector animation hoặc state transition.

## Design Read

Landing page cho chủ doanh nghiệp Việt Nam, theo ngôn ngữ premium editorial, bất đối xứng và giàu chuyển động có chủ đích.

- `DESIGN_VARIANCE: 8`
- `MOTION_INTENSITY: 6`, giữ nguyên implementation hiện hữu
- `VISUAL_DENSITY: 3`
- Redesign mode: targeted visual evolution, không phải thay đổi IA hay chức năng

## Art Direction

### Tên hướng

Obsidian + Champagne + Vermilion

### Ý tưởng chủ đạo

Nét Nút trở thành một "bàn tái cấu trúc" được chế tác từ kính hun khói, kim loại champagne và giấy ngà. Vermilion hiện tại vẫn là tín hiệu hành động của thương hiệu, nhưng không còn phải gánh toàn bộ cảm giác cao cấp.

Hệ thống tạo chiều sâu bằng phân tầng surface, phản xạ viền, tonal gradient và shadow khuếch tán. Không dùng glow neon, mesh gradient, gradient chữ hoặc glassmorphism tràn lan.

### Bảng màu dự kiến

- `background`: Obsidian `#08090A`
- `surface-base`: Carbon `#0D0F11`
- `surface-raised`: Graphite `#14171A`
- `surface-soft`: Smoke `#1A1D20`
- `foreground`: Porcelain `#F1EEE8`
- `muted`: Silver Taupe `#A5A19A`
- `line`: Champagne hairline `rgba(211, 177, 122, 0.20)`
- `champagne`: Champagne metal `#D3B17A`
- `champagne-bright`: Pale gold `#ECD7AD`
- `accent`: Vermilion `#F0441D`
- `accent-deep`: Burnt vermilion `#C83418`

Vermilion tiếp tục biểu thị hành động, trạng thái active và chuyển đổi. Champagne dùng cho viền, typography accent nhỏ, ánh phản xạ và chi tiết chế tác, không cạnh tranh với CTA.

## Material System

### Page background

Nền khóa ở dark theme. Dùng layered linear/radial tonal gradients rất nhẹ để chuyển từ obsidian sang graphite mà không tạo blob màu. Một lớp grain cố định, opacity thấp và `pointer-events: none` có thể được dùng để tránh cảm giác nền phẳng.

### Glass

Glassmorphism chỉ áp dụng cho navigation và control nổi đã có. Glass gồm nền bán trong suốt, inner highlight, champagne hairline và fallback opaque trong `prefers-reduced-transparency`.

Không dùng backdrop blur trên card hoặc section cuộn lớn để tránh chi phí GPU.

### Surface và elevation

- Section lớn vẫn ưu tiên negative space và tonal separation.
- Container quan trọng dùng double-bezel nhẹ: outer champagne hairline và inner graphite surface.
- Shadow luôn mềm, rộng và nhuộm theo nền, không dùng shadow đen gắt.
- Các row nội dung tiếp tục dùng divider thay vì biến mọi phần tử thành card.

### Geometry

- Các control và CTA tiếp tục dùng pill.
- Media frame và conversion plane dùng radius tinh tế từ 20px đến 28px.
- Row editorial không bị bọc trong rounded card độc lập.
- Shape rules phải nhất quán giữa trang chủ và About.

## Typography

Giữ `next/font` và không thêm request font runtime.

- Geist Sans tiếp tục làm body và UI font để giữ hiệu năng, hỗ trợ tiếng Việt và nhịp kỹ thuật của thương hiệu.
- Heading giảm cảm giác nặng thô bằng weight khoảng 500-600, optical hierarchy rõ hơn và line-height thoáng hơn ở body.
- Geist Mono chỉ dành cho metadata, feedback và label kỹ thuật.
- Dùng champagne cho một số label nhỏ có ý nghĩa; không thêm eyebrow vào mọi section.
- Giới hạn chiều dài đoạn văn và tăng tương phản giữa headline, body và muted copy.

Không thay đổi chuỗi văn bản hoặc cách SplitText chia nội dung.

## Layout và spacing

- Giữ nguyên thứ tự section và hệ grid bất đối xứng.
- Chuẩn hóa page gutter theo mobile, tablet và desktop.
- Giữ khoảng section rộng nhưng cân lại khoảng nội bộ để headline và body không bị rời rạc.
- Hero tiếp tục fit trong viewport ban đầu và CTA vẫn nhìn thấy được.
- Mobile dưới 768px tiếp tục collapse về một cột, không tạo overlap hoặc horizontal overflow mới.
- Không thay đổi DOM theo cách ảnh hưởng selector GSAP hoặc thứ tự animation.

## Component Treatment

### Navigation

Giữ floating pill và menu disclosure. Nâng cấp bằng smoked glass, champagne edge, inner highlight và shadow khuếch tán. Không thay đổi vị trí, menu state, transition hoặc stagger.

### Hero

Giữ composition và animation chữ. Chuyển khối vermilion phẳng thành một signal plane có tonal gradient rất nhẹ và edge highlight. CTA primary dùng porcelain/champagne treatment; CTA secondary dùng hairline champagne. Không thêm decorative text hoặc scroll cue.

### Services và Insights

Giữ row architecture và accordion logic. Divider chuyển sang champagne hairline, active baseline vẫn vermilion. Hover chỉ thay đổi lớp màu hiện có, không thêm motion.

### Cách chúng tôi soi

Giữ nguyên toàn bộ interaction. Chỉ nâng lớp frame, old/new visual palette, border, background và control styling. Khung vẫn được nhận biết rõ là concept minh họa.

### Capabilities

Giữ chip interaction. Default chip dùng smoked surface và champagne edge; accent chip tiếp tục dùng vermilion. Không thêm magnetic behavior mới.

### Process/About slabs

Giữ GSAP slab reveal và split-copy reveal. Thay các fill phẳng bằng tonal graphite, porcelain và restrained vermilion treatment. Có thể thêm inner edge và soft shadow mà không sửa transform.

### Final CTA và form

Giữ form logic và field order. Conversion plane dùng vermilion sâu có ánh kim rất nhẹ; input và submit có contrast AA, focus rõ, helper/result state không đổi.

### About page

Áp dụng cùng token và material grammar. Giữ toàn bộ manifesto, vision, dictionary, magnetic principle và outro behavior. Không tạo một visual identity thứ hai.

## Accessibility và hiệu năng

- Duy trì semantic landmarks, heading order, `aria-*`, `inert`, keyboard behavior và focus-visible.
- Body text đạt WCAG AA; CTA và form state được kiểm tra contrast.
- Giữ `prefers-reduced-motion` hiện tại.
- Glass có opaque fallback trong `prefers-reduced-transparency`.
- Không thêm raw scroll listener, animation layout property hoặc effect không cleanup.
- Không thêm ảnh hoặc font dependency mới trong lần nâng cấp này.
- Grain chỉ là fixed pseudo-element và không bắt pointer event.

## Files dự kiến bị tác động

- `src/app/globals.css`
- `src/app/layout.tsx`, chỉ nếu cần thêm font variable hoặc page-level decorative layer không tương tác
- `src/components/site-nav.tsx`
- Các component trong `src/components/sections/`
- Các component trong `src/components/about/`
- `DESIGN.md` và `.impeccable/design.json` sau khi implementation đã được kiểm chứng

Không dự kiến thay đổi `page.tsx` trừ khi cần một presentation-only wrapper không ảnh hưởng structure hoặc animation selector.

## Verification

1. So sánh diff để bảo đảm không có thay đổi trong GSAP hook, keyframe, event handler, state, route, anchor hoặc copy.
2. Chạy ESLint và production build.
3. Kiểm tra trang chủ và About ở desktop và mobile.
4. Kiểm tra menu, service accordion, selected-work pointer mask, old/new toggle, keyboard arrows và final form.
5. Kiểm tra reduced motion và reduced transparency.
6. Chụp desktop/mobile trong một vòng QA, sửa lỗi theo batch và xác nhận lại tối đa một vòng.
7. Ghi lại visual system thực tế vào `DESIGN.md` và sidecar sau khi reviewer đóng vòng kiểm tra.

## Tiêu chí hoàn thành

- Website có chiều sâu, vật liệu và hierarchy cao cấp hơn rõ rệt.
- Obsidian, champagne và vermilion được dùng nhất quán trên cả hai route.
- Không có section nào trông như template glass/card đại trà.
- Không có regression về animation, logic, keyboard, responsive hoặc accessibility.
- Lint và production build thành công.
- Visual review desktop/mobile được hoàn tất trong giới hạn QA đã định.
