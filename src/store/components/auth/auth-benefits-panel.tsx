import { getStoreIcon } from '@/store/lib/store-icons';
import { AUTH_BENEFITS } from '@/store/lib/auth-data';

export function AuthBenefitsPanel() {
  return (
    <div className="from-navy via-navy to-navy-deep flex h-full flex-col justify-center bg-gradient-to-br p-8 text-white lg:p-10">
      <div className="text-primary text-xs font-bold tracking-wide uppercase">
        Tài khoản Sơn Đại Minh
      </div>
      <h2 className="m-0 mt-2 text-2xl leading-tight font-extrabold lg:text-[28px]">
        Mua sơn thông minh hơn mỗi ngày
      </h2>
      <p className="mt-3 text-sm leading-relaxed opacity-85">
        Đăng nhập để quản lý đơn hàng, nhận ưu đãi riêng và tư vấn phối màu miễn phí.
      </p>

      <ul className="mt-8 flex flex-col gap-5">
        {AUTH_BENEFITS.map((benefit) => {
          const Icon = getStoreIcon(benefit.icon);
          return (
            <li key={benefit.title} className="flex gap-3">
              <span className="text-primary grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/10">
                <Icon className="shrink-0" size={18} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div>
                <div className="font-bold">{benefit.title}</div>
                <div className="mt-0.5 text-sm opacity-80">{benefit.desc}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
