'use client';

import { SHIPPING_METHODS } from '../_lib/settings-meta';
import { SettingSwitchRow } from './setting-switch-row';
import { SettingsSaveBar } from './settings-save-bar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ShippingSettings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Phương thức vận chuyển</CardTitle>
        </CardHeader>
        <CardContent>
          {SHIPPING_METHODS.map((method) => (
            <SettingSwitchRow
              key={method.label}
              label={method.label}
              hint={method.hint}
              defaultOn={method.defaultOn}
            />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Phí vận chuyển theo khu vực</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="free-ship-threshold">Miễn phí ship cho đơn từ (đ)</Label>
            <Input id="free-ship-threshold" defaultValue="2.000.000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="default-ship-fee">Phí ship nội thành mặc định (đ)</Label>
            <Input id="default-ship-fee" defaultValue="30.000" />
          </div>
        </CardContent>
      </Card>

      <SettingsSaveBar />
    </div>
  );
}
