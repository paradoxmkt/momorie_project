'use server';

/**
 * @fileOverview Generates personalized feedback and cognitive enhancement strategies based on quiz results.
 *
 * - generatePersonalizedFeedback - A function that generates personalized feedback based on quiz results.
 * - PersonalizedFeedbackInput - The input type for the generatePersonalizedFeedback function.
 * - PersonalizedFeedbackOutput - The return type for the generatePersonalizedFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedFeedbackInputSchema = z.object({
  quizResponses: z.record(z.string(), z.any()).describe('The responses to the quiz questions.'),
  demographicData: z.object({
    gender: z.string().describe('The gender of the user.'),
  }).optional().describe('Demographic information about the user.'),
});
export type PersonalizedFeedbackInput = z.infer<typeof PersonalizedFeedbackInputSchema>;

const PersonalizedFeedbackOutputSchema = z.object({
  feedback: z.string().describe('The personalized feedback based on the quiz responses.'),
  suggestions: z.string().describe('The cognitive enhancement strategies suggested for the user.'),
});
export type PersonalizedFeedbackOutput = z.infer<typeof PersonalizedFeedbackOutputSchema>;

export async function generatePersonalizedFeedback(input: PersonalizedFeedbackInput): Promise<PersonalizedFeedbackOutput> {
  return personalizedFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFeedbackPrompt',
  input: {schema: PersonalizedFeedbackInputSchema},
  output: {schema: PersonalizedFeedbackOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized feedback and cognitive enhancement strategies based on a user's quiz responses.

  Analyze the following quiz responses and demographic data (if available) to provide tailored recommendations for cognitive enhancement.

  Quiz Responses:
  {{#each quizResponses}}
    {{@key}}: {{this}}
  {{/each}}

  {{#if demographicData}}
  Demographic Data:
    Gender: {{demographicData.gender}}
  {{/if}}

  Based on these responses, provide personalized feedback on their cognitive performance, areas of strength, and areas for improvement. Also suggest specific, actionable strategies for cognitive enhancement, such as memory exercises, focus techniques, or lifestyle adjustments.

  Ensure the feedback is positive, encouraging, and tailored to the individual's specific needs and performance. Do not be overly critical.
  `,
});

const personalizedFeedbackFlow = ai.defineFlow(
  {
    name: 'personalizedFeedbackFlow',
    inputSchema: PersonalizedFeedbackInputSchema,
    outputSchema: PersonalizedFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
