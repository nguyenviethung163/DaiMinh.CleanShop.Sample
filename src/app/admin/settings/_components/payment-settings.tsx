'use client';

import { PAYMENT_METHODS } from '../_lib/settings-meta';
import { SettingSwitchRow } from './setting-switch-row';
import { SettingsSaveBar } from './settings-save-bar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PaymentSettings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cổng thanh toán</CardTitle>
        </CardHeader>
        <CardContent>
          {PAYMENT_METHODS.map((method) => {
            const Icon = method.icon;
            return (
              <SettingSwitchRow
                key={method.label}
                label={
                  <span className="inline-flex items-center gap-3">
                    <span className="bg-muted text-secondary flex size-8 items-center justify-center rounded-md">
                      <Icon className="size-4" />
                    </span>
                    {method.label}
                  </span>
                }
                hint={method.hint}
                defaultOn={method.defaultOn}
              />
            );
          })}
        </CardContent>
      </Card>

      <SettingsSaveBar />
    </div>
  );
}
