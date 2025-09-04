
'use client';

import type { QuizScreen } from '@/types/quiz';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';

type NumberSequenceScreenProps = {
  screen: QuizScreen;
  onNext: (value: { correct: boolean; answer: string }) => void;
};

const MEMORIZE_DURATION = 8; // seconds

export function NumberSequenceScreen({ screen, onNext }: NumberSequenceScreenProps) {
  const [phase, setPhase] = useState<'memorize' | 'recall'>('memorize');
  const [countdown, setCountdown] = useState(MEMORIZE_DURATION);
  const [userAnswer, setUserAnswer] = useState('');
  
  const sequence = useMemo(() => screen.data?.sequence as number[] || [], [screen.data]);
  const isReversed = useMemo(() => screen.data?.reversed || false, [screen.data]);
  
  const correctSequence = useMemo(() => {
    const seq = sequence.join('');
    return isReversed ? seq.split('').reverse().join('') : seq;
  }, [sequence, isReversed]);

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
                    {sequence.join(' ')}
                </p>
             </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold font-mono text-primary">{countdown}</p>
              <Progress value={(countdown / MEMORIZE_DURATION) * 100} className="h-2" />
            </div>
            <Button variant="outline" size="sm" onClick={() => setPhase('recall')} className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Check className="mr-2 h-4 w-4" />
              Já memorizei
            </Button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-foreground mb-4">
            {isReversed ? 'Qual era a sequência invertida?' : 'Qual era a sequência?'}
          </h2>
          <p className="text-muted-foreground mb-8 text-sm sm:text-base">Digite os números na ordem correta.</p>
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
