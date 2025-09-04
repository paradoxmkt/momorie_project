
'use client';

import type { QuizScreen as QuizScreenType } from '@/types/quiz';
import { cn } from '@/lib/utils';

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
            <button
              key={index}
              className={cn(
                'w-full text-left h-auto py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base rounded-lg transition-colors',
                'flex items-center justify-between',
                'bg-primary text-primary-foreground',
                'hover:bg-accent'
              )}
              onClick={() => onNext(optionText)}
            >
              <span className="flex-1 whitespace-normal font-medium">{optionText}</span>
              <div className="ml-4 size-6 rounded-full border-2 border-primary-foreground/50 bg-transparent flex items-center justify-center shrink-0">
                <div className="size-3 rounded-full bg-transparent"></div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
