'use client';

import { Upload } from 'lucide-react';
import { SettingRow } from './setting-row';
import { SettingsSaveBar } from './settings-save-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function GeneralSettings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Thông tin cửa hàng</CardTitle>
          <CardDescription>Hiển thị trên website và hoá đơn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="from-secondary to-primary flex size-[72px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-55% to-55% text-2xl font-black text-white italic">
              SĐ
            </div>
            <div>
              <Button variant="outline" size="sm">
                <Upload />
                Đổi logo
              </Button>
              <p className="text-muted-foreground mt-1 text-xs">PNG/SVG, tối thiểu 200×200px</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="store-name">Tên cửa hàng</Label>
              <Input id="store-name" defaultValue="Sơn Đại Minh" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-slogan">Slogan</Label>
              <Input id="store-slogan" defaultValue="Sơn Chính Hãng – Giá Tốt Cho Mọi Công Trình" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-hotline">Hotline</Label>
              <Input id="store-hotline" defaultValue="1900 6868" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-email">Email</Label>
              <Input id="store-email" defaultValue="cskh@sondaiminh.vn" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-tax">Mã số thuế</Label>
              <Input id="store-tax" defaultValue="0101xxxxxx" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-website">Website</Label>
              <Input id="store-website" defaultValue="sondaiminh.vn" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-address">Địa chỉ trụ sở</Label>
            <Input id="store-address" defaultValue="248 Nguyễn Trãi, Thanh Xuân, Hà Nội" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tuỳ chọn vùng</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingRow label="Múi giờ" hint="Áp dụng cho toàn hệ thống">
            <Select defaultValue="gmt7">
              <SelectTrigger className="w-[220px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gmt7">(GMT+7) Hà Nội, TP.HCM</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
          <SettingRow label="Đơn vị tiền tệ">
            <Select defaultValue="vnd">
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vnd">VND (đ)</SelectItem>
                <SelectItem value="usd">USD ($)</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
          <SettingRow label="Định dạng ngày">
            <Select defaultValue="dmy">
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
        </CardContent>
      </Card>

      <SettingsSaveBar />
    </div>
  );
}
