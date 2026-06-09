'use client';

import type { ReactNode } from 'react';
import { AppHeader } from './app-header';
import { AppSidebar } from './app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function AppShell({ active, children }: { active: string; children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar active={active} />
      <SidebarInset className="h-svh overflow-hidden">
        <AppHeader active={active} />
        <div className="flex-1 overflow-y-auto p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
