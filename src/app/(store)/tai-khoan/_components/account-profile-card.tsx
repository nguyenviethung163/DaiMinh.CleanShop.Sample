import { Award } from 'lucide-react';

export function AccountProfileCard() {
  return (
    <div className="from-navy to-navy-deep relative overflow-hidden rounded-xl bg-gradient-to-br p-5 text-white">
      <div className="pointer-events-none absolute -top-8 -right-8 h-[130px] w-[130px] rounded-full bg-[radial-gradient(circle,var(--primary)_0%,transparent_65%)] opacity-25" />

      <div className="relative flex items-center gap-3">
        <div className="from-orange to-orange-deep grid h-14 w-14 shrink-0 place-items-center rounded-full border-[3px] border-white/15 bg-gradient-to-br text-xl font-extrabold">
          NA
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-base font-extrabold">Nguyễn Văn A</div>
          <div className="text-xs opacity-70">Thành viên từ 03/2022</div>
        </div>
      </div>

      <div className="relative mt-4 flex items-center gap-3 rounded-lg bg-white/10 p-3.5">
        <Award
          className="text-primary shrink-0"
          size={22}
          strokeWidth={1.7}
          fill="none"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold opacity-65">HẠNG THÀNH VIÊN</div>
          <div className="text-primary text-[17px] font-extrabold">Vàng</div>
        </div>
      </div>

      <div className="relative mt-2 rounded-lg bg-white/10 p-3.5">
        <div className="text-xs font-semibold opacity-65">ĐIỂM TÍCH LŨY</div>
        <div className="mt-0.5 flex items-baseline gap-1">
          <span className="text-[22px] font-black">1.460</span>
          <span className="text-xs opacity-70">điểm</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/15">
          <div className="bg-primary h-full w-[58%] rounded-full" />
        </div>
        <div className="mt-1.5 text-xs opacity-65">
          Còn 540 điểm để lên hạng <b className="opacity-90">Bạch kim</b>
        </div>
      </div>
    </div>
  );
}
