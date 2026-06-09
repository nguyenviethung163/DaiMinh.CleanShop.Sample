'use client';

import Link from 'next/link';
import { Bell, ChevronDown, Home, Plus, Search, Store } from 'lucide-react';
import { findNav } from './nav';
import { getInitials } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function AppHeader({ active }: { active: string }) {
  const item = findNav(active);

  return (
    <header className="bg-background flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 hidden h-4 sm:block" />

      <div className="min-w-0 flex-1">
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard" className="inline-flex items-center gap-1">
                <Home className="size-3.5" />
                Admin
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{item?.label ?? 'Trang'}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <p className="truncate text-sm font-semibold sm:hidden">{item?.label}</p>
      </div>

      <div className="relative hidden max-w-sm flex-1 md:block">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
        <Input placeholder="Tìm đơn hàng, sản phẩm, khách hàng…" className="bg-muted/50 pl-8" />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm" className="hidden lg:inline-flex" asChild>
          <Link href="/">
            <Store />
            Xem cửa hàng
          </Link>
        </Button>
        <Button size="sm" className="hidden lg:inline-flex">
          <Plus />
          Tạo đơn
        </Button>
        <Button variant="outline" size="icon" className="relative shrink-0">
          <Bell />
          <Badge className="absolute -top-1 -right-1 size-4 justify-center rounded-full p-0 text-[10px]">
            5
          </Badge>
          <span className="sr-only">Thông báo</span>
        </Button>
        <Separator orientation="vertical" className="hidden h-6 lg:block" />
        <button
          type="button"
          className="hover:bg-accent hidden items-center gap-2 rounded-md px-1 py-1 lg:flex"
        >
          <Avatar size="sm">
            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
              {getInitials('Nguyễn Đại Minh')}
            </AvatarFallback>
          </Avatar>
          <div className="text-left leading-tight">
            <div className="text-sm font-medium">Đại Minh</div>
            <div className="text-muted-foreground text-xs">Quản trị viên</div>
          </div>
          <ChevronDown className="text-muted-foreground size-4" />
        </button>
      </div>
    </header>
  );
}
