'use client';

import type { QuizScreen } from '@/types/quiz';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

type PatternRecallScreenProps = {
  screen: QuizScreen;
  onNext: (value: { correct: number, total: number, userErrors: number }) => void;
};

const MEMORIZE_DURATION = 5; // seconds

export function PatternRecallScreen({ screen, onNext }: PatternRecallScreenProps) {
  const [phase, setPhase] = useState<'memorize' | 'recall'>('memorize');
  const [countdown, setCountdown] = useState(MEMORIZE_DURATION);
  const correctPattern = useMemo(() => screen.data?.pattern || [], [screen.data]);
  const gridSize = 3; // Always 3x3
  const [userPattern, setUserPattern] = useState<boolean[][]>(
    Array(gridSize).fill(null).map(() => Array(gridSize).fill(false))
  );

  useEffect(() => {
    if (phase === 'memorize') {
       if (countdown <= 0) {
        setPhase('recall');
        return;
      }
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, countdown]);

  const handleCellClick = (row: number, col: number) => {
    const newPattern = userPattern.map(r => [...r]);
    newPattern[row][col] = !newPattern[row][col];
    setUserPattern(newPattern);
  };

  const handleSubmit = () => {
    let correct = 0;
    let total = 0;
    let userErrors = 0; // Selections that were incorrect

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (correctPattern[i][j]) {
          total++;
          if (userPattern[i][j]) {
            correct++;
          }
        } else if (userPattern[i][j]) {
          userErrors++;
        }
      }
    }
    onNext({ correct, total, userErrors });
  };
  
  const renderGrid = (pattern: boolean[][], isInteractive: boolean) => (
    <div className={`grid grid-cols-3 gap-2 w-full max-w-[240px] sm:max-w-[300px]`}>
      {Array(gridSize).fill(0).map((_, rowIndex) =>
        Array(gridSize).fill(0).map((__, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onClick={isInteractive ? () => handleCellClick(rowIndex, colIndex) : undefined}
            className={cn(
              'aspect-square rounded-lg border-2 transition-colors',
              pattern[rowIndex]?.[colIndex]
                ? 'bg-primary'
                : 'bg-blue-100 dark:bg-slate-700',
              isInteractive && 'cursor-pointer hover:border-primary/80'
            )}
          />
        ))
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      {phase === 'memorize' ? (
        <>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-foreground mb-4">Memorize o padrão</h2>
          <div className="space-y-4 flex flex-col items-center">
            {renderGrid(correctPattern, false)}
            <div className="space-y-2 w-full max-w-xs pt-4">
              <p className="text-2xl font-bold font-mono text-primary">{countdown}</p>
              <Progress value={(countdown / MEMORIZE_DURATION) * 100} className="h-2" />
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-foreground mb-4">Recrie o padrão</h2>
          <p className="text-muted-foreground mb-8">Clique nos quadrados que estavam acesos.</p>
          {renderGrid(userPattern, true)}
          <Button onClick={handleSubmit} size="lg" className="mt-8">
            Confirmar
          </Button>
        </>
      )}
    </div>
  );
}
