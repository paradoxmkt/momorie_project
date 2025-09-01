import type { LucideIcon } from "lucide-react";

export type QuizOption = {
    text: string;
    icon?: LucideIcon;
};

export type QuizScreen = {
  id: string;
  key: string;
  type: 'welcome' | 'demographic' | 'single_choice' | 'self_assessment' | 'memory_intro' | 'color_sequence' | 'pattern_recall' | 'word_list';
  order?: number;
  title: string;
  description?: string;
  question?: string;
  options?: string[] | QuizOption[];
  data?: {
    sequence?: string[];
    pattern?: boolean[][];
    words_to_memorize?: string[];
    all_words?: string[];
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
