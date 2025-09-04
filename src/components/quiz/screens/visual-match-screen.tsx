
'use client';

import type { QuizScreen, Shape } from '@/types/quiz';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Triangle, Circle, Star } from 'lucide-react';

type VisualMatchScreenProps = {
  screen: QuizScreen;
  onNext: (value: { correct: boolean }) => void;
};

const shapeMap = {
  circle: <Circle className="w-full h-full fill-current text-gray-300" />,
  triangle: <Triangle className="w-full h-full fill-current text-gray-800" />,
  star: <Star className="w-full h-full fill-current text-gray-800" />,
};

const ShapeIcon = ({ shape }: { shape: Shape }) => {
    return shapeMap[shape];
};

export function VisualMatchScreen({ screen, onNext }: VisualMatchScreenProps) {
  const [phase, setPhase] = useState<'memorize' | 'recall'>('memorize');
  
  const visualMatchData = useMemo(() => screen.data?.visualMatch, [screen.data]);
  const MEMORIZE_DURATION = visualMatchData?.memorizeDuration || 10;
  const [countdown, setCountdown] = useState(MEMORIZE_DURATION);


  useEffect(() => {
    if (phase === 'memorize') {
      if (countdown <= 0) {
        setPhase('recall');
        return;
      }
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, countdown]);

  const handleChoice = (choice: 'left' | 'right') => {
    const isCorrect = choice === visualMatchData?.correctSide;
    onNext({ correct: isCorrect });
  };
  
  const renderGrid = (grid: Shape[][]) => (
    <div className="grid grid-cols-4 gap-2">
      {grid.flat().map((shape, index) => (
        <div key={index} className="w-10 h-10">
          <ShapeIcon shape={shape} />
        </div>
      ))}
    </div>
  );


  if (!visualMatchData) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      {phase === 'memorize' ? (
        <>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-foreground mb-4">
            {screen.title}
          </h2>
          <Card className="p-4 sm:p-6 bg-primary/80 border-0">
            <CardContent className="p-0">
              <div className="flex justify-center items-center gap-4 sm:gap-8">
                {renderGrid(visualMatchData.leftGrid)}
                <div className="h-40 w-px bg-primary-foreground/30"></div>
                {renderGrid(visualMatchData.rightGrid)}
              </div>
            </CardContent>
          </Card>
          <div className="w-full max-w-sm mx-auto space-y-2 pt-6">
            <p className="text-sm text-muted-foreground">{screen.description}</p>
            <p className="text-2xl font-bold font-mono text-primary">{countdown}</p>
            <Progress value={(countdown / MEMORIZE_DURATION) * 100} className="h-2" />
          </div>
          <Button variant="link" size="sm" onClick={() => setPhase('recall')} className="mt-2 text-muted-foreground">
            Pular Cronômetro
          </Button>
        </>
      ) : (
        <>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-foreground mb-8">
            Onde estava a forma diferente?
          </h2>
          <div className="flex gap-4">
            <Button size="lg" className="w-32 h-16 text-lg" onClick={() => handleChoice('left')}>
              Esquerda
            </Button>
            <Button size="lg" className="w-32 h-16 text-lg" onClick={() => handleChoice('right')}>
              Direita
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
