import type { LucideIcon } from "lucide-react";

export type QuizOption = {
    text: string;
    icon?: LucideIcon;
};

export type Shape = 'circle' | 'triangle' | 'star';

export type VisualMatchData = {
    gridSize: { rows: number; cols: number };
    leftGrid: Shape[][];
    rightGrid: Shape[][];
    correctSide: 'left' | 'right';
    memorizeDuration: number;
};


export type QuizScreen = {
  id: string;
  key: string;
  type: 'welcome' | 'demographic' | 'single_choice' | 'self_assessment' | 'memory_intro' | 'color_sequence' | 'pattern_recall' | 'word_list' | 'number_sequence' | 'visual_match';
  order?: number;
  title: string;
  description?: string;
  question?: string;
  options?: string[] | QuizOption[];
  data?: {
    sequence?: string[] | number[];
    pattern?: boolean[][];
    words_to_memorize?: string[];
    all_words?: string[];
    reversed?: boolean;
    gridSize?: number;
    visualMatch?: VisualMatchData;
  };
  buttonText?: string;
};

export type QuizData = {
    id: string;
    title: string;
    description: string;
    totalQuestions: number;
    estimatedTime: string;
    screens: QuizScreen[];
}
