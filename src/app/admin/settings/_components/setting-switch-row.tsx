'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { SettingRow } from './setting-row';
import { Switch } from '@/components/ui/switch';

type SettingSwitchRowProps = {
  label: ReactNode;
  hint?: string;
  defaultOn?: boolean;
};

export function SettingSwitchRow({ label, hint, defaultOn = false }: SettingSwitchRowProps) {
  const [on, setOn] = useState(defaultOn);
  return (
    <SettingRow label={label} hint={hint}>
      <Switch checked={on} onCheckedChange={setOn} />
    </SettingRow>
  );
}
