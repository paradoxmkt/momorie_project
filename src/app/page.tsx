
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BrainCircuit, Clock, HelpCircle } from 'lucide-react';
import Logo from '@/components/logo';
import { useEffect } from 'react';

const resetQuizState = () => {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem('exercicio-mental-quiz-state');
    } catch (error) {
      console.error("Failed to remove quiz state from localStorage", error);
    }
  }
};


export default function Home() {
  useEffect(() => {
    resetQuizState();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="text-center max-w-2xl mx-auto">
        <Logo className="w-48 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-headline">
          Teste de Memória e Foco
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-foreground/80 mb-8">
          Quão aguçado está o seu cérebro? Faça nosso teste desenvolvido por especialistas para avaliar sua clareza mental, concentração e memória. Descubra como seu cérebro se comporta sob pressão e receba um roteiro personalizado para atingir o desempenho cognitivo máximo.
        </p>
        
        <Button asChild size="lg" className="rounded-full font-bold text-lg px-8 sm:px-10 py-6 sm:py-7 group shadow-lg shadow-primary/20 hover:shadow-accent/30 transition-all duration-300 transform hover:scale-105">
          <Link href="/quiz">
            Começar o Teste
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
