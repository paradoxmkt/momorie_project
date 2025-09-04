
'use client';

import { Progress } from '@/components/ui/progress';

type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progressPercentage = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className="w-full px-2">
      <Progress value={progressPercentage} className="h-2 bg-primary/20" />
    </div>
  );
}
