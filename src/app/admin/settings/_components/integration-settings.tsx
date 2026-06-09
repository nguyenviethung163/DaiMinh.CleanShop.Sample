'use client';

import { INTEGRATIONS } from '../_lib/settings-meta';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function IntegrationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Tích hợp & API</CardTitle>
        <CardDescription>Kết nối với các dịch vụ bên thứ ba</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {INTEGRATIONS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="flex items-center gap-3 rounded-lg border p-3.5">
                <div className="bg-muted text-secondary flex size-10 shrink-0 items-center justify-center rounded-md">
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <Badge variant={item.connected ? 'default' : 'outline'} className="mt-1">
                    {item.status}
                  </Badge>
                </div>
                <Button variant={item.connected ? 'ghost' : 'outline'} size="sm">
                  {item.connected ? 'Cấu hình' : 'Kết nối'}
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
