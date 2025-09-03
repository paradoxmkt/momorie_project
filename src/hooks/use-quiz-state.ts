'use client';

import { useState, useEffect, useCallback } from 'react';

const LOCAL_STORAGE_KEY = 'desafio-mindfulness-quiz-state';

type QuizState = {
  currentScreenIndex: number;
  answers: Record<string, any>;
  isQuizStarted: boolean;
};

const getInitialState = (): QuizState => {
  if (typeof window === 'undefined') {
    return { currentScreenIndex: 0, answers: {}, isQuizStarted: false };
  }
  
  try {
    const savedState = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // Basic validation to prevent bad state
      if (typeof parsedState.currentScreenIndex === 'number' && typeof parsedState.answers === 'object') {
        return parsedState;
      }
    }
  } catch (error) {
    console.error("Failed to parse quiz state from localStorage", error);
  }

  return { currentScreenIndex: 0, answers: {}, isQuizStarted: false };
};


export function useQuizState(totalScreens: number) {
  const [state, setState] = useState<QuizState>(getInitialState);

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save quiz state to localStorage", error);
    }
  }, [state]);

  const startQuiz = useCallback(() => {
    setState(prev => ({...prev, isQuizStarted: true, currentScreenIndex: 1 })); // Skip welcome screen
  }, []);

  const goToNextScreen = useCallback((key: string, answer: any) => {
    setState(prevState => {
      const newAnswers = { ...prevState.answers, [key]: answer };
      const nextIndex = prevState.currentScreenIndex + 1;
      return { ...prevState, answers: newAnswers, currentScreenIndex: nextIndex };
    });
  }, []);

  const resetQuiz = useCallback(() => {
    const initialState = { currentScreenIndex: 0, answers: {}, isQuizStarted: false };
    setState(initialState);
    try {
        window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (error) {
        console.error("Failed to remove quiz state from localStorage", error);
    }
  }, []);

  return { ...state, goToNextScreen, resetQuiz, startQuiz };
}
