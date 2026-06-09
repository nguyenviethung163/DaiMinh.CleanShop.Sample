'use client';

import type { ComponentType } from 'react';
import { useState } from 'react';
import type { SettingsTab } from '../_lib/settings-meta';
import { GeneralSettings } from './general-settings';
import { IntegrationSettings } from './integration-settings';
import { NotificationSettings } from './notification-settings';
import { PaymentSettings } from './payment-settings';
import { SecuritySettings } from './security-settings';
import { SettingsHeader } from './settings-header';
import { SettingsNav } from './settings-nav';
import { ShippingSettings } from './shipping-settings';

const PANELS: Record<SettingsTab, ComponentType> = {
  general: GeneralSettings,
  shipping: ShippingSettings,
  payment: PaymentSettings,
  notification: NotificationSettings,
  integration: IntegrationSettings,
  security: SecuritySettings,
};

export function SettingsView() {
  const [tab, setTab] = useState<SettingsTab>('general');
  const Panel = PANELS[tab];

  return (
    <div className="flex flex-col gap-6">
      <SettingsHeader />
      <div className="grid items-start gap-4 lg:grid-cols-[240px_1fr]">
        <SettingsNav tab={tab} onTabChange={setTab} />
        <Panel />
      </div>
    </div>
  );
}
