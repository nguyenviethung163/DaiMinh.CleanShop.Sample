import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getToneGradient } from '@/store/lib/tone-meta';
import type { PromoCampaign } from '../_lib/promotions-data';
import { PromoCountdown } from './promo-countdown';

export interface PromoCampaignCardProps {
  campaign: PromoCampaign;
  featured?: boolean;
}

export function PromoCampaignCard({ campaign, featured = false }: PromoCampaignCardProps) {
  const href = campaign.href ?? '/san-pham';

  return (
    <article
      className={cn(
        'relative min-h-[280px] overflow-hidden rounded-2xl md:min-h-[320px]',
        featured && 'lg:min-h-[380px]',
      )}
    >
      <div
        className={cn('relative overflow-hidden', 'absolute inset-0 h-full w-full')}
        style={{ background: getToneGradient(campaign.tone ?? 'navy') }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)',
          }}
        />
      </div>

      <div
        className={cn(
          'absolute inset-0 flex flex-col justify-between p-6 text-white',
          featured ? 'p-8 lg:p-9' : 'p-6',
        )}
        style={{
          background: featured
            ? 'linear-gradient(105deg, var(--secondary) 0%, rgba(11,42,91,0.78) 45%, rgba(11,42,91,0.25) 85%, transparent 100%)'
            : 'linear-gradient(160deg, rgba(11,42,91,0.78) 0%, rgba(11,42,91,0.25) 70%)',
        }}
      >
        <div>
          <span className="bg-primary inline-block rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-[0.08em]">
            {campaign.sup}
          </span>
          <div
            className={cn(
              'mt-3.5 leading-[1.1] font-extrabold tracking-[-0.02em]',
              featured ? 'max-w-[420px] text-2xl lg:text-4xl' : 'text-[22px]',
            )}
          >
            {campaign.title}
          </div>
          <div
            className={cn(
              'mt-2 text-sm leading-relaxed opacity-85',
              featured ? 'max-w-[400px] text-sm' : 'text-[13px]',
            )}
          >
            {campaign.sub}
          </div>
        </div>

        <div className="mt-3.5 flex flex-wrap items-end justify-between gap-3">
          <PromoCountdown values={campaign.ends} label={campaign.tag ?? 'Kết thúc sau'} />
          <Button
            asChild
            variant="default"
            size="sm"
            className={cn('gap-2 font-bold', 'shrink-0 px-[18px] py-[11px] text-[13px]')}
          >
            <Link href={href}>
              {campaign.cta}
              <ArrowRight
                className="shrink-0"
                size={14}
                strokeWidth={1.7}
                fill="none"
                aria-hidden="true"
              />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
