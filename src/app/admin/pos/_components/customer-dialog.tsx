'use client';

import { useState } from 'react';
import { Plus, Search, User } from 'lucide-react';
import { ADB } from '@/lib/data';
import { getTierVariant } from '../_lib/customer-tier';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn, getInitials } from '@/lib/utils';

type Customer = {
  id: string;
  name: string;
  phone: string;
  tier: string;
  city?: string;
};

type CustomerDialogProps = {
  open: boolean;
  current: Customer;
  onClose: () => void;
  onPick: (customer: Customer) => void;
};

const GUEST: Customer = {
  id: 'guest',
  name: 'Khách lẻ',
  phone: 'Không lấy hoá đơn',
  tier: 'Vãng lai',
};

export function CustomerDialog({ open, current, onClose, onPick }: CustomerDialogProps) {
  const [query, setQuery] = useState('');

  const customers = ADB.CUSTOMERS.filter(
    (customer) =>
      !query ||
      customer.name.toLowerCase().includes(query.toLowerCase()) ||
      customer.phone.includes(query),
  );

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Chọn khách hàng</DialogTitle>
          <DialogDescription>Tìm hoặc tạo khách mới cho đơn POS</DialogDescription>
        </DialogHeader>

        <div className="bg-muted/30 flex items-center gap-2 rounded-lg border px-3 py-2">
          <Search className="text-muted-foreground size-4" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm tên hoặc SĐT…"
            className="border-0 bg-transparent shadow-none focus-visible:ring-0"
            autoFocus
          />
          <Button variant="outline" size="sm">
            <Plus />
            Khách mới
          </Button>
        </div>

        <ScrollArea className="max-h-80 pr-2">
          <div className="flex flex-col gap-1">
            <button
              type="button"
              className="bg-muted/40 hover:bg-accent flex items-center gap-3 rounded-lg p-3 text-left transition-colors"
              onClick={() => onPick(GUEST)}
            >
              <div className="bg-muted flex size-10 items-center justify-center rounded-full">
                <User className="text-muted-foreground size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">Khách lẻ</p>
                <p className="text-muted-foreground text-xs">Không lưu thông tin</p>
              </div>
            </button>

            {customers.map((customer) => (
              <button
                key={customer.id}
                type="button"
                className={cn(
                  'hover:bg-accent flex items-center gap-3 rounded-lg border p-3 text-left transition-colors',
                  current.id === customer.id ? 'border-primary' : 'border-transparent',
                )}
                onClick={() => onPick(customer)}
              >
                <Avatar>
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                    {getInitials(customer.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{customer.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {customer.phone} · {customer.city}
                  </p>
                </div>
                <Badge variant={getTierVariant(customer.tier)}>{customer.tier}</Badge>
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
