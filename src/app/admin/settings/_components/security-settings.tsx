'use client';

import { Monitor } from 'lucide-react';
import { LOGIN_SESSIONS, SECURITY_TOGGLES } from '../_lib/settings-meta';
import { SettingSwitchRow } from './setting-switch-row';
import { SettingsSaveBar } from './settings-save-bar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function SecuritySettings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bảo mật tài khoản</CardTitle>
        </CardHeader>
        <CardContent>
          {SECURITY_TOGGLES.map((item) => (
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
          <CardTitle className="text-base">Phiên đăng nhập</CardTitle>
          <CardDescription>Thiết bị đang truy cập tài khoản của bạn</CardDescription>
        </CardHeader>
        <CardContent className="divide-y">
          {LOGIN_SESSIONS.map((session) => (
            <div key={session.device} className="flex items-center gap-3 py-3.5 first:pt-0">
              <div className="bg-muted text-secondary flex size-9 shrink-0 items-center justify-center rounded-lg">
                <Monitor className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{session.device}</p>
                <p className="text-muted-foreground text-xs">{session.location}</p>
              </div>
              {session.current ? (
                <Badge variant="default">Đang dùng</Badge>
              ) : (
                <Button variant="destructive" size="sm">
                  Đăng xuất
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <SettingsSaveBar />
    </div>
  );
}
