'use client';

import { SETTINGS_NAV, type SettingsTab } from '../_lib/settings-meta';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type SettingsNavProps = {
  tab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
};

export function SettingsNav({ tab, onTabChange }: SettingsNavProps) {
  return (
    <Card className="py-0">
      <CardContent className="p-2">
        <nav className="flex flex-col gap-0.5">
          {SETTINGS_NAV.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors',
                  active
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </CardContent>
    </Card>
  );
}
