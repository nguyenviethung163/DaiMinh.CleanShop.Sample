'use client';

import { ADB } from '@/lib/data';
import { STAFF_TABS, type Role, type StaffMember, type StaffTab } from '../_lib/staff-meta';
import { StaffActivityLog } from './staff-activity-log';
import { StaffMembersTable } from './staff-members-table';
import { StaffRolesGrid } from './staff-roles-grid';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type StaffContentProps = {
  tab: StaffTab;
  onTabChange: (tab: StaffTab) => void;
  onEdit: (member: StaffMember) => void;
  onDelete: (member: StaffMember) => void;
};

export function StaffContent({ tab, onTabChange, onEdit, onDelete }: StaffContentProps) {
  const counts = {
    members: ADB.STAFF.length,
    roles: ADB.ROLES.length,
    activity: null,
  };

  return (
    <Card className="gap-0 py-0">
      <div className="border-b px-4 pt-4">
        <Tabs value={tab} onValueChange={(v) => onTabChange(v as StaffTab)}>
          <TabsList className="h-auto flex-wrap justify-start">
            {STAFF_TABS.map((item) => (
              <TabsTrigger key={item.value} value={item.value} className="gap-2">
                {item.label}
                {counts[item.value] !== null && (
                  <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
                    {counts[item.value]}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {tab === 'members' && (
        <StaffMembersTable
          rows={ADB.STAFF as StaffMember[]}
          onRowClick={onEdit}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      {tab === 'roles' && <StaffRolesGrid roles={ADB.ROLES as Role[]} />}
      {tab === 'activity' && <StaffActivityLog />}
    </Card>
  );
}
