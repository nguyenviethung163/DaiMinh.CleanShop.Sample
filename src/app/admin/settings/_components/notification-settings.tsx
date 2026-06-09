'use client';

import { ADMIN_NOTIFICATIONS, CUSTOMER_NOTIFICATIONS } from '../_lib/settings-meta';
import { SettingSwitchRow } from './setting-switch-row';
import { SettingsSaveBar } from './settings-save-bar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function NotificationSettings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Thông báo cho admin</CardTitle>
        </CardHeader>
        <CardContent>
          {ADMIN_NOTIFICATIONS.map((item) => (
            <SettingSwitchRow
              key={item.label}
              label={item.label}
              hint={item.hint}
              defaultOn={item.defaultOn}
            />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Thông báo cho khách hàng</CardTitle>
        </CardHeader>
        <CardContent>
          {CUSTOMER_NOTIFICATIONS.map((item) => (
            <SettingSwitchRow
              key={item.label}
              label={item.label}
              hint={item.hint || undefined}
              defaultOn={item.defaultOn}
            />
          ))}
        </CardContent>
      </Card>

      <SettingsSaveBar />
    </div>
  );
}
