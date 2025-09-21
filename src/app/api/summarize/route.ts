import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SummarizeTextInputSchema = z.object({
  text: z.string().min(100, { message: 'متن برای خلاصه‌سازی باید حداقل ۱۰۰ کاراکتر باشد.' }),
});

const SummarizeTextOutputSchema = z.object({
  summary: z.string(),
});

const prompt = ai.definePrompt({
  name: 'summarizeTextPrompt',
  input: { schema: SummarizeTextInputSchema },
  output: { schema: SummarizeTextOutputSchema },
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are an expert text summarizer. Your task is to provide a concise and clear summary of the given text in Persian. Focus on the main points and key information.

The user has provided the following text:
---
{{{text}}}
---

Please provide the summary in the 'summary' field of the output.`,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = SummarizeTextInputSchema.parse(body);

    const { output } = await prompt(input);
    
    if (!output) {
      throw new Error('Failed to generate summary.');
    }

    return NextResponse.json(output);
  } catch (error) {
    console.error('Summarization API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'خطا در خلاصه‌سازی متن' },
      { status: 500 }
    );
  }
}
