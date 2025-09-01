'use client';

import type { QuizData } from '@/types/quiz';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuizState } from '@/hooks/use-quiz-state';
import { WelcomeScreen } from './screens/welcome-screen';
import { DemographicScreen } from './screens/demographic-screen';
import { ChoiceScreen } from './screens/choice-screen';
import { MemoryIntroScreen } from './screens/memory-intro-screen';
import { ColorSequenceScreen } from './screens/color-sequence-screen';
import { NumberSequenceScreen } from './screens/number-sequence-screen';
import { WordListScreen } from './screens/word-list-screen';
import { ResultsScreen } from './screens/results-screen';
import { ProgressBar } from './progress-bar';

export function QuizContainer({ quiz }: { quiz: QuizData }) {
  const {
    currentScreenIndex,
    answers,
    goToNextScreen,
    resetQuiz,
    isQuizStarted,
    startQuiz,
  } = useQuizState(quiz.screens.length);

  const screenData = quiz.screens[currentScreenIndex];
  const isQuizFinished = currentScreenIndex >= quiz.screens.length;

  const handleNext = (key: string, value: any) => {
    goToNextScreen(key, value);
  };

  const renderScreen = () => {
    if (!isQuizStarted) {
      return <WelcomeScreen onNext={startQuiz} screen={quiz.screens[0]} />;
    }

    if (isQuizFinished) {
      return <ResultsScreen answers={answers} onReset={resetQuiz} />;
    }

    switch (screenData.type) {
      case 'demographic':
        return (
          <DemographicScreen screen={screenData} onNext={(value) => handleNext(screenData.key, value)} />
        );
      case 'single_choice':
      case 'self_assessment':
        return (
          <ChoiceScreen screen={screenData} onNext={(value) => handleNext(screenData.key, value)} />
        );
      case 'memory_intro':
        return (
          <MemoryIntroScreen screen={screenData} onNext={() => handleNext(screenData.key, 'started')} />
        );
      case 'color_sequence':
        return (
          <ColorSequenceScreen screen={screenData} onNext={(value) => handleNext(screenData.key, value)} />
        );
      case 'number_sequence':
        return (
          <NumberSequenceScreen screen={screenData} onNext={(value) => handleNext(screenData.key, value)} />
        );
      case 'word_list':
        return (
          <WordListScreen screen={screenData} onNext={(value) => handleNext(screenData.key, value)} />
        );
      default:
        // Fallback for welcome screen or unknown types
        return <WelcomeScreen onNext={startQuiz} screen={quiz.screens[0]} />;
    }
  };

  const showProgressBar = isQuizStarted && !isQuizFinished && screenData.type !== 'memory_intro';
  const totalQuestions = quiz.screens.filter(s => s.type !== 'welcome' && s.type !== 'memory_intro').length;
  const currentQuestionNumber = quiz.screens.slice(0, currentScreenIndex).filter(s => s.type !== 'welcome' && s.type !== 'memory_intro').length;

  return (
    <div className="w-full max-w-2xl">
      {showProgressBar && (
        <ProgressBar current={currentQuestionNumber} total={totalQuestions} />
      )}
      <div className="relative mt-4 h-[600px] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={isQuizStarted ? (isQuizFinished ? 'results' : currentScreenIndex) : 'welcome'}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute w-full h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
