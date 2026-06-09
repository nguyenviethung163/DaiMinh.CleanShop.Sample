'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getNavIcon } from './nav-icons';
import { NAV_GROUPS } from './nav';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';

function BrandLogo() {
  return (
    <div className="flex items-center gap-2 px-1">
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-black italic">
        SĐ
      </div>
      <div className="grid min-w-0 flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
        <span className="truncate font-semibold">Sơn Đại Minh</span>
        <span className="text-sidebar-foreground/60 truncate text-xs">Admin Portal</span>
      </div>
    </div>
  );
}

export function AppSidebar({ active }: { active: string }) {
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();

  const navigate = (id: string) => {
    router.push(`/admin/${id}`);
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-sidebar-border border-b py-3">
        <BrandLogo />
      </SidebarHeader>
      <SidebarContent>
        {NAV_GROUPS.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = getNavIcon(item.icon);
                  const isActive = active === item.id;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.label}
                        onClick={() => navigate(item.id)}
                        className={cn(
                          isActive &&
                            'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground',
                        )}
                      >
                        <Icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                      {item.badge != null && (
                        <SidebarMenuBadge
                          className={cn(
                            item.badgeTone === 'danger'
                              ? 'bg-destructive text-destructive-foreground'
                              : isActive
                                ? 'bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground'
                                : 'bg-sidebar-foreground/15 text-sidebar-foreground',
                          )}
                        >
                          {item.badge}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
