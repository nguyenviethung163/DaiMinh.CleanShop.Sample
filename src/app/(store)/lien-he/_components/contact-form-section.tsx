'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect as Select } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  CONTACT_REQUEST_TYPES,
  CONTACT_SHOWROOM_OPTIONS,
  type ContactRequestTypeName,
} from '@/store/lib/storeinfo-data';
import { StoreSectionIntro } from '@/store/components/store-section-intro';
import { StoreSection } from '@/store/components/store-section';
import { ContactConsultCta } from './contact-consult-cta';
import { ContactResponseTimes } from './contact-response-times';

export function ContactFormSection() {
  const [requestType, setRequestType] = useState<ContactRequestTypeName>('Tư vấn phối màu');

  return (
    <StoreSection className="pt-16">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        <form onSubmit={(e) => e.preventDefault()} className="min-w-0">
          <StoreSectionIntro
            eyebrow="Gửi yêu cầu"
            title="Để lại thông tin, chúng tôi sẽ liên hệ trong 15 phút"
            className="[&_h2]:text-[30px]"
          />
          <p className="text-muted-foreground mt-2 mb-4 leading-relaxed">
            Chuyên viên Sơn Đại Minh sẽ gọi lại tư vấn miễn phí (kể cả ngoài giờ hành chính).
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-foreground mb-1.5 block text-sm font-semibold">
                Họ và tên <span className="text-destructive">*</span>
              </Label>
              <Input placeholder="Nguyễn Văn A" />
            </div>
            <div>
              <Label className="text-foreground mb-1.5 block text-sm font-semibold">
                Số điện thoại <span className="text-destructive">*</span>
              </Label>
              <Input placeholder="0988 xxx xxx" />
            </div>
          </div>

          <div className="mt-4">
            <Label className="text-foreground mb-1.5 block text-sm font-semibold">Email</Label>
            <Input type="email" placeholder="email@example.com" />
          </div>

          <div className="mt-4">
            <Label className="text-foreground mb-1.5 block text-sm font-semibold">
              Loại yêu cầu
            </Label>
            <div className="flex flex-wrap gap-2">
              {CONTACT_REQUEST_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setRequestType(type)}
                  className={cn(
                    'cursor-pointer rounded-md border-[1.5px] px-3.5 py-2 text-sm font-semibold',
                    requestType === type
                      ? 'border-orange bg-primary/10 text-primary'
                      : 'text-muted-foreground border bg-white',
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-foreground mb-1.5 block text-sm font-semibold">
                Diện tích (m²)
              </Label>
              <Input placeholder="VD: 120" />
            </div>
            <div>
              <Label className="text-foreground mb-1.5 block text-sm font-semibold">
                Showroom gần nhất
              </Label>
              <Select defaultValue={CONTACT_SHOWROOM_OPTIONS[0]}>
                {CONTACT_SHOWROOM_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <Label className="text-foreground mb-1.5 block text-sm font-semibold">
              Nội dung yêu cầu
            </Label>
            <Textarea
              rows={5}
              placeholder="Mô tả công trình, thương hiệu mong muốn, yêu cầu đặc biệt…"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              type="submit"
              variant="default"
              className={cn('gap-2 font-bold', 'px-7 py-[15px]')}
            >
              <Mail
                className="shrink-0"
                size={16}
                strokeWidth={1.7}
                fill="none"
                aria-hidden="true"
              />
              Gửi yêu cầu
            </Button>
            <Button
              type="button"
              variant="outline"
              className={cn(
                'gap-2 font-bold',
                'border-secondary text-secondary hover:bg-muted',
                'px-6 py-3.5',
              )}
            >
              Hoặc gọi ngay 1900 6868
            </Button>
          </div>
        </form>

        <div className="flex flex-col gap-4">
          <ContactResponseTimes />
          <ContactConsultCta />
        </div>
      </div>
    </StoreSection>
  );
}
