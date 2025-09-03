
'use client';

import type { QuizScreen } from '@/types/quiz';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ColorSequenceScreenProps = {
  screen: QuizScreen;
  onNext: (value: { correct: number, total: number }) => void;
};

const colorMap: { [key: string]: string } = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-400',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
  pink: 'bg-pink-500',
  cyan: 'bg-cyan-500',
};

const MEMORIZE_DURATION = 5; // seconds

export function ColorSequenceScreen({ screen, onNext }: ColorSequenceScreenProps) {
  const [phase, setPhase] = useState<'memorize' | 'recall' | 'result'>('memorize');
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [countdown, setCountdown] = useState(MEMORIZE_DURATION);
  const correctSequence = useMemo(() => screen.data?.sequence as string[] || [], [screen.data]);
  const isReversed = useMemo(() => screen.data?.reversed || false, [screen.data]);
  
  const allColors = useMemo(() => {
    const sequenceColors = new Set(correctSequence);
    const availableColors = Object.keys(colorMap);
    const otherColors = availableColors.filter(c => !sequenceColors.has(c));
    const shuffled = [...otherColors].sort(() => 0.5 - Math.random());
    const distractorsCount = Math.min(shuffled.length, Math.max(2, 8 - correctSequence.length));
    const distractors = shuffled.slice(0, distractorsCount);
    const finalOptions = [...new Set([...correctSequence, ...distractors])].sort(() => 0.5 - Math.random());
    return finalOptions;
  }, [correctSequence]);

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

  const handleColorClick = (color: string) => {
    if (userSequence.length < correctSequence.length) {
      setUserSequence([...userSequence, color]);
    }
  };

  useEffect(() => {
    if (userSequence.length === correctSequence.length) {
      setPhase('result');
      const timer = setTimeout(() => {
        let correctCount = 0;
        const sequenceToCompare = isReversed ? [...correctSequence].reverse() : correctSequence;
        for (let i = 0; i < sequenceToCompare.length; i++) {
          if (sequenceToCompare[i] === userSequence[i]) {
            correctCount++;
          }
        }
        onNext({ correct: correctCount, total: correctSequence.length });
      }, 2000); // Show result for 2 seconds
      return () => clearTimeout(timer);
    }
  }, [userSequence, correctSequence, onNext, isReversed]);

  const renderContent = () => {
    const sequenceToDisplay = isReversed && phase === 'result' ? [...correctSequence].reverse() : correctSequence;

    switch (phase) {
      case 'memorize':
        return (
          <>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-foreground mb-4">Memorize a sequência</h2>
            <div className="w-full max-w-md mx-auto space-y-3">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                {correctSequence.map((color, index) => (
                  <div key={index} className={cn('w-16 h-16 sm:w-20 sm:h-20 rounded-lg shadow-md', colorMap[color])}></div>
                ))}
              </div>
               <div className="space-y-2 pt-4">
                 <p className="text-2xl font-bold font-mono text-primary">{countdown}</p>
                 <Progress value={(countdown / MEMORIZE_DURATION) * 100} className="h-2" />
               </div>
               <Button variant="link" size="sm" onClick={() => setPhase('recall')} className="mt-2 text-muted-foreground">Pular Cronômetro</Button>
            </div>
          </>
        );
      case 'recall':
        return (
          <>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-foreground mb-4">
              {isReversed ? 'Qual era a sequência invertida?' : 'Qual era a sequência?'}
            </h2>
            <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">Clique nas cores na ordem correta.</p>
            <div className="h-20 sm:h-24 w-full flex justify-center items-center flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8 border-2 border-dashed rounded-lg p-2">
              {userSequence.map((color, index) => (
                <div key={index} className={cn('w-12 h-12 sm:w-16 sm:h-16 rounded-lg shadow-md', colorMap[color])}></div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {allColors.map((color) => (
                <Button
                  key={color}
                  onClick={() => handleColorClick(color)}
                  className={cn('w-16 h-16 sm:w-20 sm:h-20 rounded-lg shadow-md', colorMap[color])}
                  aria-label={color}
                ></Button>
              ))}
            </div>
          </>
        );
      case 'result':
        return (
          <>
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-foreground mb-4">Resultado</h2>
             <div className="flex flex-col items-center space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Sua Resposta:</p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {userSequence.map((color, index) => (
                     <div key={`user-${index}`} className={cn('w-10 h-10 sm:w-12 sm:h-12 rounded-md shadow-md relative', colorMap[color])}>
                       {sequenceToDisplay[index] !== color && <X className="absolute top-1 right-1 text-white mix-blend-difference"/>}
                     </div>
                  ))}
                </div>
              </div>
               <div>
                <p className="text-sm text-muted-foreground mt-2">Sequência Correta:</p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {sequenceToDisplay.map((color, index) => (
                    <div key={`correct-${index}`} className={cn('w-10 h-10 sm:w-12 sm:h-12 rounded-md shadow-md relative', colorMap[color])}>
                       {sequenceToDisplay[index] === userSequence[index] && <Check className="absolute top-1 right-1 text-white mix-blend-difference"/>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      {renderContent()}
    </div>
  );
}
