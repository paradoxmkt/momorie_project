
'use client';

import { useState, useEffect, useTransition } from 'react';
import { getAIFeedback } from '@/app/quiz/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, RefreshCw, AlertTriangle, ShieldCheck, Star, Sparkles } from 'lucide-react';
import type { PersonalizedFeedbackOutput } from '@/ai/flows/personalized-cognitive-feedback';

type ResultsScreenProps = {
  answers: Record<string, any>;
  onReset: () => void;
};

const SalesHeader = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed top-0 left-0 right-0 bg-primary text-primary-foreground text-center p-2 z-50 shadow-lg">
      <p className="font-bold text-sm sm:text-base">
        OFERTA POR TEMPO LIMITADO: Libere seus resultados por apenas R$37,90! | Termina em: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </p>
    </div>
  );
};

const FeedbackCard = ({ name, feedback }: { name: string, feedback: string }) => (
    <Card>
        <CardContent className="p-4">
            <div className="flex items-center mb-2">
                <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="ml-2 font-bold">{name}</p>
            </div>
            <p className="text-sm text-muted-foreground">&quot;{feedback}&quot;</p>
        </CardContent>
    </Card>
);

export function ResultsScreen({ answers, onReset }: ResultsScreenProps) {
  const [isPending, startTransition] = useTransition();
  const [showSalesPage, setShowSalesPage] = useState(false);
  const [showSalesContent, setShowSalesContent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startTransition(async () => {
      setTimeout(() => {
        setShowSalesPage(true);
        setTimeout(() => {
          setShowSalesContent(true);
        }, 60000); // 60 seconds
      }, 2500);

      const demographicData = { gender: answers.gender };
      const quizResponses = { ...answers };
      delete quizResponses.gender;
      
      const response = await getAIFeedback({ demographicData, quizResponses });

      if (!response.success) {
        console.error("AI Feedback generation failed:", response.error);
      }
    });
  }, [answers]);

  const handlePurchaseClick = () => {
    window.location.href = 'https://www.ggcheckout.com/checkout/v2/1pBP6PG0M22MLLd3AKhT';
  };

  if (isPending || !showSalesPage) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-foreground mb-2">
          Analisando seus resultados...
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">Nossa IA está preparando seu feedback personalizado.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <AlertTriangle className="w-16 h-16 text-destructive mb-6" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-destructive mb-2">
          Ocorreu um erro
        </h2>
        <p className="text-lg text-muted-foreground mb-8">{error}</p>
        <Button onClick={onReset} size="lg">
          <RefreshCw className="mr-2 h-4 w-4" />
          Tentar Novamente
        </Button>
      </div>
    );
  }

  if (showSalesPage) {
    return (
      <>
        {showSalesContent && <SalesHeader />}
        <div className={`w-full max-h-[calc(100vh-80px)] overflow-y-auto ${showSalesContent ? 'pt-12 sm:pt-16' : 'pt-0'} pb-8 px-4 scroll-smooth`}>
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mt-8 mb-4">
              Seu resultado esta pronto, assista o video do Dr. Pedro para conferir!
            </h2>
            <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl mb-6">
                 <iframe title="vimeo-player" src="https://player.vimeo.com/video/1110748968?h=c596470233&autoplay=1" width="100%" height="100%" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowFullScreen></iframe>
            </div>
            
            {showSalesContent && (
              <>
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Seus resultados de memória e foco</h3>

                <Card className="w-full max-w-2xl my-8 flex flex-col md:flex-row items-center justify-between p-4 sm:p-6 shadow-xl border-primary border-2">
                  <div className="text-center md:text-left">
                    <h4 className="text-xl sm:text-2xl font-bold text-primary">Acesso Completo</h4>
                    <p className="text-sm sm:text-base text-muted-foreground">Teste completo com análise + Material de exercícios.</p>
                  </div>
                  <div className="text-center md:text-right mt-4 md:mt-0">
                    <p className="text-lg sm:text-xl text-muted-foreground line-through">De R$74,90</p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">Por apenas R$37,90</p>
                  </div>
                </Card>
                
                <Button size="lg" className="w-full max-w-2xl h-14 sm:h-16 text-xl sm:text-2xl font-bold animate-pulse" onClick={handlePurchaseClick}>
                    Adquirir Agora!
                </Button>

                <div className="w-full max-w-4xl my-12">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-6">O que nossos clientes dizem</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                      <FeedbackCard name="Lucas M." feedback="O material é incrível! Sinto minha mente mais afiada e minha memória melhorou muito em poucas semanas."/>
                      <FeedbackCard name="Juliana P." feedback="Nunca pensei que exercícios mentais pudessem ser tão divertidos. Recomendo a todos que querem um upgrade no cérebro!"/>
                      <FeedbackCard name="Fernando R." feedback="Vale cada centavo. A análise é super detalhada e os exercícios são práticos e fáceis de encaixar na rotina."/>
                  </div>
                </div>

                <Card className="w-full max-w-4xl p-4 sm:p-6 my-8 text-left bg-primary/5">
                    <CardHeader>
                        <CardTitle className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2"><Sparkles className="text-accent w-6 h-6 sm:w-8 sm:h-8"/>Destaques do seu plano</CardTitle>
                        <CardDescription className="text-sm sm:text-base">Veja tudo que você vai receber ao garantir seu acesso hoje:</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3 list-disc list-inside text-sm sm:text-base text-foreground/90">
                            <li>Exercícios diários para melhorar a memória e concentração.</li>
                            <li>Treinamento mental interativo e divertido.</li>
                            <li>Acompanhamento de progresso para garantir resultados reais.</li>
                            <li>Facilidade de acesso: pratique de qualquer lugar, a qualquer hora.</li>
                            <li>Avaliação detalhada de suas habilidades de memória e foco.</li>
                            <li>Seu perfil cognitivo personalizado de pontos fortes e fracos.</li>
                            <li>Estratégias especializadas para aumentar a concentração, a energia mental e a recordação.</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="w-full max-w-2xl my-8 text-left p-4 sm:p-6 border-green-600 border-2">
                  <CardHeader className="flex flex-col sm:flex-row items-center gap-4 p-2 sm:p-4">
                      <ShieldCheck className="w-12 h-12 text-green-600 shrink-0"/>
                      <div className="text-center sm:text-left">
                        <CardTitle className="text-xl sm:text-2xl font-bold text-green-700">Garantia de 7 Dias</CardTitle>
                        <CardDescription className="text-sm sm:text-base">Acreditamos que nosso plano pode funcionar para você!</CardDescription>
                      </div>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-4">
                    <p className="text-sm sm:text-base text-muted-foreground">Estamos tão confiantes nos resultados que oferecemos seu dinheiro de volta se você não vir resultados visíveis e puder demonstrar que seguiu nosso plano.</p>
                  </CardContent>
                </Card>

                 <Button size="lg" className="w-full max-w-2xl h-14 sm:h-16 text-xl sm:text-2xl font-bold" onClick={handlePurchaseClick}>
                    Eu quero!
                </Button>
                
                <div className="flex items-center gap-2 mt-4 text-muted-foreground">
                  <ShieldCheck className="w-5 h-5"/>
                  <span className="text-sm">Site 100% Seguro</span>
                </div>
              </>
            )}

          </div>
           <footer className="w-full text-center text-muted-foreground mt-12 border-t pt-4 text-sm">
                <p>&copy; {new Date().getFullYear()} MindMetrics. Todos os direitos reservados.</p>
            </footer>
        </div>
      </>
    );
  }

  return null;
}
