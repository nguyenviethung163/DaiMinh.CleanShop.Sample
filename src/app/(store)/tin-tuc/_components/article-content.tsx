import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';
import { ARTICLE_RELATED_COLORS, ARTICLE_TAGS } from '../_lib/news-data';

export function ArticleContent() {
  return (
    <article className="text-muted-foreground max-w-[720px] text-base leading-[1.75]">
      <p className="m-0 mb-[18px] text-[17px]">
        Sau hai năm thống trị của những gam pastel nhẹ nhàng, năm 2026 chứng kiến sự trở lại đầy
        mạnh mẽ của <b className="text-foreground">các tông màu trầm ấm</b> – những sắc thái mộc
        mạc, gần gũi với thiên nhiên nhưng vẫn giữ được cảm giác hiện đại, tinh tế.
      </p>

      <h2 className="text-secondary m-0 mt-8 mb-3.5 text-[26px] font-extrabold tracking-[-0.02em]">
        1. Xu hướng màu trầm ấm trở lại
      </h2>
      <p className="m-0 mb-4">
        Các hãng sơn lớn như Dulux, Jotun, Nippon đều công bố bảng màu 2026 với chủ đạo là các sắc
        thái <b className="text-foreground">nâu đất, kem nâu, ghi đá, xanh rêu</b> và đặc biệt là{' '}
        <b className="text-foreground">xanh navy sâu lắng</b>.
      </p>

      <div
        className={cn('relative overflow-hidden', 'my-6 h-[240px] w-full rounded-xl md:h-[340px]')}
        style={{ background: getToneGradient('cream') }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
          }}
        />
        <div className="absolute top-2.5 left-2.5 rounded bg-black/35 px-2 py-1 text-[10px] font-semibold tracking-[.04em] text-white/95 uppercase">
          Ảnh: Bảng màu 2026
        </div>
      </div>
      <p className="text-muted-foreground mb-6 text-center text-sm italic">
        Bảng màu xu hướng 2026 từ Dulux – kết hợp trầm ấm và điểm nhấn.
      </p>

      <h2 className="text-secondary m-0 mt-8 mb-3.5 text-[26px] font-extrabold tracking-[-0.02em]">
        2. Xanh navy & sắc cam đất – cặp đôi quyền lực
      </h2>
      <p className="m-0 mb-4">
        <b className="text-foreground">Xanh navy</b> kết hợp với{' '}
        <b className="text-foreground">sắc cam đất</b> tạo nên tổ hợp đối lập nhưng cân bằng. Xanh
        navy mang sự tĩnh tại, cam đất bổ sung sức sống, ấm áp.
      </p>

      <blockquote className="border-orange bg-muted text-secondary my-7 border-l-4 px-6 py-[18px] text-[19px] leading-relaxed font-semibold italic">
        &ldquo;Cặp đôi xanh navy – cam đất sẽ là tổ hợp được tìm kiếm nhiều nhất trong năm
        2026.&rdquo;
        <div className="text-muted-foreground mt-3 text-sm font-medium not-italic">
          — Studio nội thất Mộc · Hà Nội
        </div>
      </blockquote>

      <div className="my-6 rounded-xl border bg-white p-5">
        <div className="text-primary mb-3 text-xs font-bold tracking-wide uppercase">
          Bảng màu được nhắc đến trong bài
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {ARTICLE_RELATED_COLORS.map((color) => (
            <div key={color.hex} className="cursor-pointer">
              <div
                className="aspect-[4/3] rounded-lg border-black/6"
                style={{
                  background: color.hex,
                  boxShadow: color.hex === '#F2EFE9' ? 'inset 0 0 0 1px #e6e8ee' : undefined,
                }}
              />
              <div className="text-foreground mt-1.5 text-xs font-semibold">{color.name}</div>
              <div className="text-muted-foreground font-mono text-xs">{color.hex}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-orange bg-primary/10 my-6 rounded-r-[10px] border-l-4 px-[22px] py-[18px]">
        <div className="text-primary mb-2 text-xs font-extrabold tracking-[0.06em] uppercase">
          <Sparkles
            className="mr-1.5 inline-block shrink-0 align-middle"
            size={14}
            strokeWidth={1.7}
            fill="none"
            aria-hidden="true"
          />
          Mẹo từ chuyên gia
        </div>
        <p className="m-0 text-[14.5px] leading-relaxed text-[#3a2a18]">
          Trước khi sơn cả phòng, hãy mua 1L sơn thử trên mảng tường nhỏ ở các khung giờ khác nhau.
          Ánh sáng thay đổi sẽ cho bạn thấy màu thực sự &ldquo;lên&rdquo; như thế nào.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-2 border border-t pt-6">
        <span className="text-muted-foreground text-xs font-semibold">TỪ KHÓA:</span>
        {ARTICLE_TAGS.map((tag) => (
          <span
            key={tag}
            className="bg-muted text-muted-foreground cursor-pointer rounded-full px-[11px] py-1.5 text-xs font-semibold"
          >
            #{tag.replace(/ /g, '-')}
          </span>
        ))}
      </div>
    </article>
  );
}
