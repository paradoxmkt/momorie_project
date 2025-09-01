'use client';

import type { QuizScreen } from '@/types/quiz';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

type NumberSequenceScreenProps = {
  screen: QuizScreen;
  onNext: (value: { correct: boolean; answer: string }) => void;
};

const MEMORIZE_DURATION = 8; // seconds

export function NumberSequenceScreen({ screen, onNext }: NumberSequenceScreenProps) {
  const [phase, setPhase] = useState<'memorize' | 'recall'>('memorize');
  const [countdown, setCountdown] = useState(MEMORIZE_DURATION);
  const [userAnswer, setUserAnswer] = useState('');
  const correctSequence = useMemo(() => (screen.data?.sequence as number[] || []).join(''), [screen.data]);

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

  const handleSubmit = () => {
    const isCorrect = userAnswer.replace(/\s/g, '') === correctSequence;
    onNext({ correct: isCorrect, answer: userAnswer });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and spaces
    const value = e.target.value.replace(/[^0-9\s]/g, '');
    setUserAnswer(value);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      {phase === 'memorize' ? (
        <>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-foreground mb-4">Memorize a sequência de números</h2>
          <div className="w-full max-w-sm mx-auto space-y-4">
             <div className="bg-card p-4 rounded-lg shadow-inner">
                <p className="text-3xl sm:text-4xl font-mono tracking-widest text-primary">
                    {correctSequence.split('').join(' ')}
                </p>
             </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold font-mono text-primary">{countdown}</p>
              <Progress value={(countdown / MEMORIZE_DURATION) * 100} className="h-2" />
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-foreground mb-4">Qual era a sequência?</h2>
          <p className="text-muted-foreground mb-8">Digite os números na ordem em que apareceram.</p>
          <Input
            type="text"
            value={userAnswer}
            onChange={handleInputChange}
            placeholder="Digite os números aqui"
            className="w-full max-w-xs text-center text-2xl tracking-widest font-mono"
            inputMode="numeric"
          />
          <Button onClick={handleSubmit} size="lg" className="mt-8">
            Confirmar
          </Button>
        </>
      )}
    </div>
  );
}
