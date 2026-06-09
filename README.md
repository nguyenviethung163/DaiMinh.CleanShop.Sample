# Sơn Đại Minh — Web App (Next.js 15 + Tailwind v4)

Bản chuyển đổi **enterprise** từ prototype React/Vite sang **Next.js 15 (App Router) + TypeScript + Tailwind v4**.

| Route              | Màn hình                                                                                                                                           |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                | Landing                                                                                                                                            |
| `/admin`           | → redirect `/admin/dashboard`                                                                                                                      |
| `/admin/dashboard` | ✅ Dashboard                                                                                                                                       |
| `/admin/orders`    | ✅ Đơn hàng — CRUD đầy đủ                                                                                                                          |
| `/admin/<id>`      | ✅ **Toàn bộ 15 module đã port** (reports, pos, leads, quotes, customers, promotions, einvoice, products, inventory, colors, cms, staff, settings) |

---

## 1. Chạy dự án

```bash
cd nextjs-app
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
npm run format
```

> Yêu cầu Node ≥ 18.18.

---

## 2. Cấu trúc

```
nextjs-app/
├── next.config.mjs · postcss.config.mjs · tsconfig.json
├── .eslintrc.json · .prettierrc
└── src/
    ├── app/
    │   ├── layout.tsx              # root: font Be Vietnam Pro + ToastProvider
    │   ├── globals.css             # ① Tailwind v4 @theme (tokens) + ② token bridge
    │   ├── page.tsx                # landing
    │   └── admin/
    │       ├── page.tsx            # redirect → /admin/dashboard
    │       └── [module]/page.tsx   # render module theo URL param
    ├── components/
    │   ├── ui/                     # ★ PRIMITIVES (Tailwind) — import 1 chỗ từ '@/components/ui'
    │   │   ├── button · badge · card · form · controls · table · overlay
    │   │   ├── toast · confirm-dialog · avatar · placeholder · icon
    │   │   └── index.ts            # barrel export
    │   ├── charts/charts.tsx       # AreaChart/BarChart/DonutChart/Sparkline/HBars (SVG thuần)
    │   └── layout/
    │       ├── app-shell.tsx       # Sidebar + Topbar + nội dung (responsive)
    │       └── nav.ts              # cấu hình điều hướng (thêm module = thêm 1 dòng)
    ├── lib/
    │   ├── data.ts                 # mock data (export ADB) — thay bằng fetch/server-action
    │   ├── format.ts               # formatVND, shortVND, formatNum
    │   └── cn.ts                   # nối className (clsx tối giản)
    └── modules/
        ├── dashboard.tsx           # ✅ khuôn mẫu A
        ├── orders.tsx              # ✅ khuôn mẫu B (CRUD đầy đủ)
        ├── coming-soon.tsx         # fallback
        └── module-registry.ts      # ánh xạ id → component
```

---

## 3. Design system → Tailwind

Toàn bộ token định nghĩa **một chỗ** trong `globals.css` bằng `@theme` của Tailwind v4:

```css
@theme {
  --color-navy: #0b2a5b;     /* → bg-navy / text-navy / border-navy */
  --color-orange: #e85d04;   /* → bg-orange ... */
  --color-ink / -body / -muted / -line / -panel ...
  --color-success / -warn / -danger / -info / -teal / -purple (+ *-bg)
  --text-xs..2xl   /* type scale */
  --radius-xs..2xl /* rounded-* */
  --shadow-sm..xl
  --font-sans: Be Vietnam Pro ...
}
```

**Đổi thương hiệu**: sửa `--color-navy` / `--color-orange` trong `@theme` → cả app đổi theo.

**Token bridge**: khối `:root` ngay dưới `@theme` alias các tên biến đời cũ
(`--brand-navy`, `--c-ink`, `--c-line`…) sang token mới. Charts SVG và vài inline-style
động (màu theo data, % progress, chiều cao cột) tham chiếu qua `var()` — cầu nối này giúp
chúng resolve mà không phải hard-code màu.

Spacing dùng thẳng scale mặc định của Tailwind (`gap-4` = 16px) vì trùng base 4px của thiết kế gốc.

---

## 4. Primitives (import 1 chỗ)

```tsx
import {
  Button,
  IconButton,
  Card,
  StatCard,
  Badge,
  Avatar,
  Icon,
  Placeholder,
  Field,
  Input,
  Select,
  Textarea,
  Search,
  Toggle,
  Checkbox,
  Segmented,
  Tabs,
  Progress,
  FilterChip,
  Pagination,
  DataTable,
  Toolbar,
  RowMenu,
  Modal,
  Drawer,
  PageHead,
  useToast,
  ConfirmDialog,
} from '@/components/ui';
```

```tsx
<Button variant="primary" icon="plus" onClick={...}>Tạo đơn</Button>
<Badge tone="success" dot>Hoàn thành</Badge>
<Field label="Tên" required><Input placeholder="…" /></Field>
<DataTable columns={cols} rows={rows} selectable selected={sel} onToggle={...} onRowClick={open} />
const toast = useToast(); toast('Đã lưu', 'success');
```

`Button.variant`: `primary | navy | outline | ghost | soft | danger`
`Badge.tone`: `neutral | brand | success | warn | danger | info | teal | purple`

---

## 5. Thêm / sửa module

Tất cả 15 module đã port. Khuôn chuẩn để **thêm** module mới (dùng `dashboard.tsx` / `orders.tsx` làm mẫu):

1. Tạo `src/modules/<id>.tsx`, mở đầu bằng `'use client'` (module có state/handler).
2. Ghép khung từ primitives: `PageHead`, `Card`, `Tabs`, `Toolbar`, `DataTable`, `Pagination`, `Drawer`, `Modal`.
3. Đăng ký vào `src/modules/module-registry.ts`:
   ```ts
   import Inventory from './inventory';
   export const MODULES = { ...; inventory: Inventory };
   ```
   (Sidebar đã liệt kê sẵn trong `components/layout/nav.ts`.)

Logic & dữ liệu gốc của 15 module nằm ở prototype Vite ban đầu (`react-app/src/modules/*`) —
copy logic, thay class `u-*`/CSS cũ bằng utility Tailwind tương ứng.

---

## 6. Nối backend thật

`lib/data.ts` là tầng mock. Khi có API:

- Đọc dữ liệu trong **Server Component** (`async` page) bằng `fetch(..., { cache })`, hoặc
- Dùng **Server Actions** cho thao tác ghi (tạo/sửa/huỷ đơn) thay cho `toast(...)` giả lập.

---

## 7. Trạng thái

| Hạng mục                                                                                                                                                                 | Trạng thái  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| Scaffold Next.js 15 + TS + Tailwind v4                                                                                                                                   | ✅          |
| Design tokens → `@theme` + token bridge                                                                                                                                  | ✅          |
| Primitives (13 file)                                                                                                                                                     | ✅ Tailwind |
| Charts SVG                                                                                                                                                               | ✅          |
| AppShell (sidebar + topbar, responsive)                                                                                                                                  | ✅          |
| **Toàn bộ 15 module** (Dashboard, Đơn hàng, Báo cáo, POS, Lead, Báo giá, Khách hàng, Khuyến mãi, Hoá đơn điện tử, Sản phẩm, Kho, Bảng màu, Tin tức, Nhân viên, Cấu hình) | ✅ port     |
| ESLint + Prettier (+ plugin sắp xếp class Tailwind)                                                                                                                      | ✅          |
