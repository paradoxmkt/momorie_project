'use client';

import type { QuizScreen as QuizScreenType } from '@/types/quiz';
import { Card, CardContent } from '@/components/ui/card';
import { User, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';

type DemographicScreenProps = {
  screen: QuizScreenType;
  onNext: (value: string) => void;
};

const icons = {
  Homem: User,
  Mulher: UserRound,
};

export function DemographicScreen({ screen, onNext }: DemographicScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-foreground mb-8">
        {screen.title}
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-sm">
        {screen.options?.map((option, index) => {
          const optionText = typeof option === 'string' ? option : option.text;
          const Icon = icons[optionText as keyof typeof icons] || User;
          return (
            <Card
              key={index}
              className="p-2 sm:p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:border-primary border-2 bg-card hover:bg-primary/10"
              onClick={() => onNext(optionText)}
            >
              <CardContent className="flex flex-col items-center justify-center p-2 sm:p-6">
                <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-primary mb-2 sm:mb-4" />
                <span className="text-lg sm:text-xl font-semibold text-foreground">{optionText}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
