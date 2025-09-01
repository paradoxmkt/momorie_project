'use client';

import type { QuizScreen } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Logo from '@/components/logo';


type WelcomeScreenProps = {
  screen: QuizScreen;
  onNext: () => void;
};

export function WelcomeScreen({ screen, onNext }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
          {screen.title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-foreground/80 mb-8 max-w-xl">
          {screen.description}
        </p>

        <Button onClick={onNext} size="lg" className="rounded-full font-bold text-lg px-8 sm:px-10 py-6 sm:py-7 group shadow-lg shadow-primary/20 hover:shadow-accent/30 transition-all duration-300 transform hover:scale-105">
          {screen.buttonText || 'Começar'}
          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Button>
    </div>
  );
}
