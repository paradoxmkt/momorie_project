import { BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  iconOnly?: boolean;
};

export default function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-primary font-headline',
        className
      )}
    >
      <BrainCircuit className="h-8 w-8" />
      {!iconOnly && (
        <span className="text-2xl font-bold">Desafio Mindfulness</span>
      )}
    </div>
  );
}
