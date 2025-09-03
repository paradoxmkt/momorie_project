
'use client';

import type { QuizScreen } from '@/types/quiz';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type WordListScreenProps = {
  screen: QuizScreen;
  onNext: (value: { correct: number, total: number, incorrectSelections: number }) => void;
};

const MEMORIZE_DURATION = 10; // seconds

export function WordListScreen({ screen, onNext }: WordListScreenProps) {
  const [phase, setPhase] = useState<'memorize' | 'recall'>('memorize');
  const [countdown, setCountdown] = useState(MEMORIZE_DURATION);
  const wordsToMemorize = useMemo(() => screen.data?.words_to_memorize || [], [screen.data]);
  const allWords = useMemo(() => screen.data?.all_words || [], [screen.data]);
  const [selectedWords, setSelectedWords] = useState<Record<string, boolean>>({});

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

  const handleCheckboxChange = (word: string) => {
    setSelectedWords(prev => ({ ...prev, [word]: !prev[word] }));
  };

  const handleSubmit = () => {
    const correctSelections = wordsToMemorize.filter(word => selectedWords[word]);
    const incorrectSelections = Object.keys(selectedWords).filter(
      word => selectedWords[word] && !wordsToMemorize.includes(word)
    );
    onNext({
      correct: correctSelections.length,
      total: wordsToMemorize.length,
      incorrectSelections: incorrectSelections.length,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      {phase === 'memorize' ? (
        <>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-foreground mb-4">Memorize esta lista de palavras</h2>
          <div className="w-full max-w-md mx-auto space-y-4">
            <Card className="p-4 sm:p-6 bg-card/80">
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-2 text-base sm:text-lg">
                {wordsToMemorize.map((word, index) => (
                  <li key={index} className="capitalize text-left">{word}</li>
                ))}
              </ul>
            </Card>
            <div className="space-y-2">
              <p className="text-2xl font-bold font-mono text-primary">{countdown}</p>
              <Progress value={(countdown / MEMORIZE_DURATION) * 100} className="h-2" />
            </div>
             <Button variant="link" size="sm" onClick={() => setPhase('recall')} className="mt-2 text-muted-foreground">Pular Cronômetro</Button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-foreground mb-4">Quais palavras você viu?</h2>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">Selecione todas as palavras que estavam na lista.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 w-full max-w-lg">
            {allWords.map((word, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 sm:p-3 rounded-md bg-card/80 border has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer" onClick={() => handleCheckboxChange(word)}>
                <Checkbox
                  id={`word-${index}`}
                  checked={!!selectedWords[word]}
                  onCheckedChange={() => handleCheckboxChange(word)}
                />
                <label
                  htmlFor={`word-${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-pointer flex-1 text-left"
                >
                  {word}
                </label>
              </div>
            ))}
          </div>
          <Button onClick={handleSubmit} size="lg" className="mt-8">
            Confirmar
          </Button>
        </>
      )}
    </div>
  );
}
