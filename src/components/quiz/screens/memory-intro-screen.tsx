'use client';

import type { QuizScreen } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { BrainCircuit } from 'lucide-react';

type MemoryIntroScreenProps = {
  screen: QuizScreen;
  onNext: () => void;
};

export function MemoryIntroScreen({ screen, onNext }: MemoryIntroScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <BrainCircuit className="w-20 h-20 text-primary mb-6 animate-pulse" />
      <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-4">
        {screen.title}
      </h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        {screen.description}
      </p>
      <Button size="lg" onClick={onNext} className="rounded-full font-bold text-lg px-8 py-6">
        {screen.buttonText || 'Vamos começar'}
      </Button>
    </div>
  );
}
