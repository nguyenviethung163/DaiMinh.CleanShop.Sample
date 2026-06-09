import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { getStoreIcon } from '@/store/lib/store-icons';
import { StoreContainer } from './store-container';
import { StoreLogo } from './store-logo';

const FOOT = [
  {
    title: 'Sản phẩm',
    items: [
      'Sơn nội thất',
      'Sơn ngoại thất',
      'Sơn chống thấm',
      'Sơn lót',
      'Bột trét tường',
      'Sơn epoxy',
    ],
  },
  {
    title: 'Hỗ trợ khách hàng',
    items: [
      'Hướng dẫn mua hàng',
      'Chính sách giao hàng',
      'Chính sách đổi trả',
      'Chính sách bảo hành',
      'Tư vấn phối màu',
    ],
  },
];

export function StoreFooterMain() {
  return (
    <StoreContainer className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-9">
      <div>
        <StoreLogo size="sm" variant="light" href={null} showTag className="mb-3.5" />
        <p className="mt-0 mb-3.5 text-sm leading-[1.65] text-white/75">
          Đại lý phân phối chính hãng các thương hiệu sơn hàng đầu: Dulux, Jotun, Nippon, Kova,
          Mykolor… Phục vụ khách hàng cá nhân và công trình lớn nhỏ trên toàn quốc.
        </p>
        <div className="flex gap-2">
          {['fb', 'ig', 'yt', 'zalo'].map((s) => {
            const Icon = getStoreIcon(s === 'fb' ? 'mail' : s === 'zalo' ? 'phone' : 'sparkle');
            return (
              <div
                key={s}
                className="grid h-[34px] w-[34px] cursor-pointer place-items-center rounded-md bg-white/[0.08]"
              >
                <Icon className="shrink-0" size={16} strokeWidth={1.7} aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </div>

      {FOOT.map((c) => (
        <div key={c.title}>
          <div className="mb-3.5 text-sm font-extrabold text-white">{c.title}</div>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {c.items.map((it) => (
              <li key={it}>
                <a
                  href="#!"
                  className="text-xs text-white/75 no-underline transition-colors hover:text-white"
                >
                  {it}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div>
        <div className="mb-3.5 text-sm font-extrabold text-white">Liên hệ &amp; địa chỉ</div>
        <div className="flex flex-col gap-3 text-sm text-white/85">
          <div className="flex gap-2">
            <MapPin
              className="shrink-0"
              size={15}
              strokeWidth={1.7}
              style={{ flexShrink: 0, marginTop: 2, opacity: 0.7 }}
              aria-hidden="true"
            />
            248 Nguyễn Trãi, Thanh Xuân, Hà Nội
          </div>
          <div className="flex gap-2">
            <Phone
              className="shrink-0"
              size={15}
              strokeWidth={1.7}
              style={{ flexShrink: 0, opacity: 0.7 }}
              aria-hidden="true"
            />
            <span className="text-primary font-bold">1900 6868</span>
          </div>
          <div className="flex gap-2">
            <Mail
              className="shrink-0"
              size={15}
              strokeWidth={1.7}
              style={{ flexShrink: 0, opacity: 0.7 }}
              aria-hidden="true"
            />
            cskh@sondaiminh.vn
          </div>
          <div className="flex gap-2">
            <Clock
              className="shrink-0"
              size={15}
              strokeWidth={1.7}
              style={{ flexShrink: 0, opacity: 0.7 }}
              aria-hidden="true"
            />
            T2–CN: 7:30 – 21:00
          </div>
        </div>
      </div>
    </StoreContainer>
  );
}
