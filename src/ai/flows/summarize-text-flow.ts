/**
 * @fileOverview A flow to summarize long texts using an AI model.
 * - summarizeText - A function that takes a long text and returns a summary.
 * - SummarizeTextInput - The input type for the summarizeText function.
 * - SummarizeTextOutput - The return type for the summarizeText function.
 */

import { z } from 'zod';

const SummarizeTextInputSchema = z.object({
  text: z.string().min(100, { message: 'متن برای خلاصه‌سازی باید حداقل ۱۰۰ کاراکتر باشد.' }).describe('The text to be summarized.'),
});
export type SummarizeTextInput = z.infer<typeof SummarizeTextInputSchema>;

const SummarizeTextOutputSchema = z.object({
  summary: z.string().describe('The generated summary.'),
});
export type SummarizeTextOutput = z.infer<typeof SummarizeTextOutputSchema>;

// In-memory store for rate limiting
const requestTracker = new Map<string, number[]>();
const RATE_LIMIT_COUNT = 3; // Max requests
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes in milliseconds

export async function summarizeText(input: SummarizeTextInput): Promise<SummarizeTextOutput> {
  // Rate limiting logic
  const now = Date.now();
  const ip = 'client'; // Simplified for client-side

  const userRequests = (requestTracker.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  if (userRequests.length >= RATE_LIMIT_COUNT) {
    throw new Error('شما به حداکثر تعداد درخواست مجاز (۳ بار در ۱۰ دقیقه) رسیده‌اید. لطفاً کمی صبر کنید.');
  }

  // Add current request timestamp
  userRequests.push(now);
  requestTracker.set(ip, userRequests);

  try {
    // Call the API route
    const response = await fetch('/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'خطا در ارتباط با سرور');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Summarization error:', error);
    throw new Error('خطا در خلاصه‌سازی متن. لطفاً دوباره تلاش کنید.');
  }
}
