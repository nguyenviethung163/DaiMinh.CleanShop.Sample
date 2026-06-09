'use client';

import { getActivityIcon, STAFF_ACTIVITY } from '../_lib/staff-meta';

export function StaffActivityLog() {
  return (
    <div className="divide-y p-4">
      {STAFF_ACTIVITY.map(([who, action, target, time, iconKey], i) => {
        const Icon = getActivityIcon(iconKey);
        return (
          <div key={i} className="flex items-center gap-3 py-3 first:pt-0">
            <div className="bg-muted text-secondary flex size-9 shrink-0 items-center justify-center rounded-lg">
              <Icon className="size-4" />
            </div>
            <p className="min-w-0 flex-1 text-sm">
              <span className="font-semibold">{who}</span> {action}{' '}
              <span className="text-secondary font-semibold">{target}</span>
            </p>
            <span className="text-muted-foreground shrink-0 text-sm">{time}</span>
          </div>
        );
      })}
    </div>
  );
}
