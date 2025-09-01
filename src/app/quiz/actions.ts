'use server';

import {
  generatePersonalizedFeedback,
  type PersonalizedFeedbackInput,
  type PersonalizedFeedbackOutput,
} from '@/ai/flows/personalized-cognitive-feedback';

export async function getAIFeedback(
  quizData: PersonalizedFeedbackInput
): Promise<{ success: true, data: PersonalizedFeedbackOutput } | { success: false, error: string }> {
  try {
    const feedback = await generatePersonalizedFeedback(quizData);
    return { success: true, data: feedback };
  } catch (error) {
    console.error('Error generating AI feedback:', error);
    // In a real app, you might want to log this error to a monitoring service
    return { success: false, error: 'Ocorreu um erro ao gerar seu feedback. Por favor, tente novamente mais tarde.' };
  }
}
