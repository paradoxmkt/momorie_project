
'use client';

import type { QuizScreen } from '@/types/quiz';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

type PatternRecallScreenProps = {
  screen: QuizScreen;
  onNext: (value: { correct: number, total: number }) => void;
};

const MEMORIZE_DURATION = 7; // seconds

export function PatternRecallScreen({ screen, onNext }: PatternRecallScreenProps) {
  const [phase, setPhase] = useState<'memorize' | 'recall'>('memorize');
  const [countdown, setCountdown] = useState(MEMORIZE_DURATION);
  
  const gridSize = useMemo(() => screen.data?.gridSize || 3, [screen.data]);
  const correctPattern = useMemo(() => screen.data?.pattern as boolean[][] || [], [screen.data]);
  
  const [userPattern, setUserPattern] = useState<boolean[][]>(
    () => Array(gridSize).fill(null).map(() => Array(gridSize).fill(false))
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
    if (phase !== 'recall') return;
    const newPattern = userPattern.map((r, rowIndex) =>
      r.map((c, colIndex) => (rowIndex === row && colIndex === col ? !c : c))
    );
    setUserPattern(newPattern);
  };

  const handleSubmit = () => {
    let correctSelections = 0;
    let incorrectSelections = 0;
    let totalCorrectCells = 0;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (correctPattern[i][j]) {
          totalCorrectCells++;
          if (userPattern[i][j]) {
            correctSelections++;
          }
        } else if (userPattern[i][j] && !correctPattern[i][j]) {
          incorrectSelections++;
        }
      }
    }
    
    const finalScore = Math.max(0, correctSelections - incorrectSelections);

    onNext({ correct: finalScore, total: totalCorrectCells });
  };

  const renderGrid = (pattern: boolean[][], isInteractive: boolean) => (
    <div 
        className={'grid grid-cols-3 gap-2'}
    >
      {pattern.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => isInteractive && handleCellClick(rowIndex, colIndex)}
            className={cn(
              'w-20 h-20 sm:w-24 sm:h-24 border-2 rounded-md transition-colors',
              cell ? 'bg-primary border-primary' : 'bg-card border-border',
              isInteractive && 'cursor-pointer hover:bg-primary/20'
            )}
          ></div>
        ))
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      {phase === 'memorize' && (
        <>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-foreground mb-6">
            Memorize o padrão
          </h2>
          {renderGrid(correctPattern, false)}
          <div className="w-full max-w-xs space-y-2 pt-6">
            <p className="text-2xl font-bold font-mono text-primary">{countdown}</p>
            <Progress value={(countdown / MEMORIZE_DURATION) * 100} className="h-2" />
          </div>
           <Button variant="link" size="sm" onClick={() => setPhase('recall')} className="mt-2 text-muted-foreground">Pular Cronômetro</Button>
        </>
      )}

      {phase === 'recall' && (
        <>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-foreground mb-6">
            Recrie o padrão
          </h2>
          {renderGrid(userPattern, true)}
          <Button onClick={handleSubmit} size="lg" className="mt-8">
            Confirmar
          </Button>
        </>
      )}
    </div>
  );
}
