'use client';

import type { ReactNode } from 'react';

type SettingRowProps = {
  label: ReactNode;
  hint?: string;
  children: ReactNode;
};

export function SettingRow({ label, hint, children }: SettingRowProps) {
  return (
    <div className="flex items-center gap-4 border-b py-4 last:border-b-0">
      <div className="min-w-0 flex-1">
        <div className="font-medium">{label}</div>
        {hint && <p className="text-muted-foreground mt-1 text-sm leading-snug">{hint}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
