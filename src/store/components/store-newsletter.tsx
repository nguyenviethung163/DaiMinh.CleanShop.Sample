import { StoreContainer } from './store-container';

export function StoreNewsletter() {
  return (
    <div className="bg-secondary border-b border-white/10 py-6">
      <StoreContainer className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-extrabold text-white">
            Đăng ký nhận bảng giá &amp; khuyến mãi mới nhất
          </div>
          <div className="mt-1 text-sm text-white/75">
            Cập nhật xu hướng màu sơn 2026 và ưu đãi độc quyền hàng tháng.
          </div>
        </div>
        <form
          className="flex w-full flex-col gap-2 sm:flex-row sm:gap-2 md:w-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Nhập email của Quý khách"
            className="w-full rounded-md border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/50 sm:min-w-[280px]"
          />
          <button
            type="submit"
            className="bg-primary shrink-0 rounded-md px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(242,107,31,0.35)]"
          >
            Đăng ký
          </button>
        </form>
      </StoreContainer>
    </div>
  );
}
