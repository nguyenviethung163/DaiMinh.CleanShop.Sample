import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';
import { StoreSection } from '@/store/components/store-section';
import { StoreSectionIntro } from '@/store/components/store-section-intro';

export function AboutStorySection() {
  return (
    <StoreSection className="pt-12 md:pt-16">
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
        <div>
          <StoreSectionIntro
            eyebrow="Câu chuyện của chúng tôi"
            title="Từ một cửa hàng nhỏ đến đại lý cấp 1 của Dulux"
          />
          <p className="text-muted-foreground mt-3 leading-[1.75]">
            Năm 2008, anh Nguyễn Đại Minh – một thợ sơn hơn 10 năm kinh nghiệm – quyết định mở cửa
            hàng đầu tiên với niềm tin:{' '}
            <b className="text-foreground">
              khách hàng xứng đáng được dùng sơn chính hãng với giá tốt nhất
            </b>
            .
          </p>
          <p className="text-muted-foreground mt-3 leading-[1.75]">
            18 năm sau, niềm tin ấy vẫn không thay đổi. Đó là lý do hơn{' '}
            <b className="text-primary">95% khách hàng</b> quay lại cho dự án thứ hai – và giới
            thiệu cho bạn bè, người thân.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:grid-rows-2">
          <div
            className={cn(
              'relative overflow-hidden',
              'min-h-[200px] rounded-xl sm:row-span-2 sm:min-h-0',
            )}
            style={{ background: getToneGradient('navy') }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
              }}
            />
            <div className="absolute top-2.5 left-2.5 rounded bg-black/35 px-2 py-1 text-[10px] font-semibold tracking-[.04em] text-white/95 uppercase">
              Showroom HN
            </div>
          </div>
          <div
            className={cn('relative overflow-hidden', 'min-h-[160px] rounded-xl sm:min-h-[200px]')}
            style={{ background: getToneGradient('orange') }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
              }}
            />
            <div className="absolute top-2.5 left-2.5 rounded bg-black/35 px-2 py-1 text-[10px] font-semibold tracking-[.04em] text-white/95 uppercase">
              Đội ngũ tư vấn
            </div>
          </div>
          <div
            className={cn('relative overflow-hidden', 'min-h-[160px] rounded-xl sm:min-h-[200px]')}
            style={{ background: getToneGradient('stone') }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
              }}
            />
            <div className="absolute top-2.5 left-2.5 rounded bg-black/35 px-2 py-1 text-[10px] font-semibold tracking-[.04em] text-white/95 uppercase">
              Kho hàng
            </div>
          </div>
        </div>
      </div>
    </StoreSection>
  );
}
