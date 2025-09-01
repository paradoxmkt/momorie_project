import Logo from '@/components/logo';
import { QuizContainer } from '@/components/quiz/quiz-container';
import { quizData } from '@/data/quiz';
import Link from 'next/link';

export default function QuizPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <header className="w-full max-w-4xl px-4 pt-4">
         <Link href="/" aria-label="Voltar para a página inicial">
            <Logo className="w-32" />
         </Link>
      </header>
      <main className="flex-grow w-full flex items-center justify-center p-4">
        <QuizContainer quiz={quizData} />
      </main>
    </div>
  );
}
