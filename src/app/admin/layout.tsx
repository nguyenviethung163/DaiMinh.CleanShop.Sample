'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import AppShell from '@/components/layout/app-shell';

function getActiveModule(pathname: string) {
  const segment = pathname.replace(/^\/admin\/?/, '').split('/')[0];
  return segment || 'dashboard';
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <AppShell active={getActiveModule(pathname)}>{children}</AppShell>;
}
