import type { ReactNode } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type StatCardProps = {
  label: string;
  value: string;
  delta: string;
  deltaDir?: 'up' | 'down';
  icon: ReactNode;
  iconClass: string;
  sub?: string;
};

export function StatCard({
  label,
  value,
  delta,
  deltaDir = 'up',
  icon,
  iconClass,
  sub,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardDescription>{label}</CardDescription>
        <div className={cn('rounded-md p-2', iconClass)}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <div className="mt-1 flex items-center gap-1 text-xs">
          {deltaDir === 'down' ? (
            <ArrowDownRight className="text-destructive size-3" />
          ) : (
            <ArrowUpRight className="text-primary size-3" />
          )}
          <span
            className={cn('font-medium', deltaDir === 'down' ? 'text-destructive' : 'text-primary')}
          >
            {delta}
          </span>
          {sub && <span className="text-muted-foreground">· {sub}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
