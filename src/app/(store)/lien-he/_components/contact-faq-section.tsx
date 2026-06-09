'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CONTACT_FAQS } from '@/store/lib/storeinfo-data';
import { StoreSectionIntro } from '@/store/components/store-section-intro';
import { StoreSection } from '@/store/components/store-section';

export function ContactFaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <StoreSection noPaddingBottom className="pt-0">
      <div className="mx-auto max-w-[920px]">
        <StoreSectionIntro
          eyebrow="Câu hỏi thường gặp"
          title="Các thắc mắc phổ biến"
          align="center"
          className="mb-6 [&_h2]:text-[30px]"
        />

        <div className="overflow-hidden rounded-xl border bg-white">
          {CONTACT_FAQS.map(([question, answer], index) => (
            <div
              key={question}
              className={cn(index < CONTACT_FAQS.length - 1 && 'border border-b')}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="flex w-full cursor-pointer items-center justify-between px-[22px] py-[18px] text-left"
              >
                <span className="text-secondary pr-4 text-[15px] font-bold">{question}</span>
                <ChevronDown
                  size={16}
                  strokeWidth={1.7}
                  fill="none"
                  aria-hidden="true"
                  className={cn(
                    'text-muted-foreground shrink-0 transition-transform',
                    openIndex === index && 'rotate-180',
                  )}
                />
              </button>
              {openIndex === index && (
                <div className="text-muted-foreground px-[22px] pb-[18px] text-[13.5px] leading-[1.7]">
                  {answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </StoreSection>
  );
}
