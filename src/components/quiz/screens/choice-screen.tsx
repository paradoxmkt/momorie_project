'use client';

import type { QuizScreen as QuizScreenType } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type ChoiceScreenProps = {
  screen: QuizScreenType;
  onNext: (value: string) => void;
};

export function ChoiceScreen({ screen, onNext }: ChoiceScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-foreground mb-8">
        {screen.question || screen.title}
      </h2>
      <div className="w-full max-w-md space-y-3">
        {screen.options?.map((option, index) => {
          const optionText = typeof option === 'string' ? option : option.text;
          return (
            <Button
              key={index}
              variant="outline"
              size="lg"
              className="w-full justify-start text-left h-auto py-3 sm:py-4 text-sm sm:text-base bg-card hover:bg-primary/10 hover:border-primary border-2"
              onClick={() => onNext(optionText)}
            >
              <span className="bg-primary/20 text-primary font-bold rounded-md size-8 flex items-center justify-center mr-3 sm:mr-4 shrink-0">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1 whitespace-normal">{optionText}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
