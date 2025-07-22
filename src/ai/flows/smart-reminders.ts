'use server';

/**
 * @fileOverview Implements a smart reminder system that tailors the timing and tone of invoice reminders based on client payment history.
 *
 * - getSmartReminder - A function that generates a smart reminder message.
 * - SmartReminderInput - The input type for the getSmartReminder function.
 * - SmartReminderOutput - The return type for the getSmartReminder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartReminderInputSchema = z.object({
  clientId: z.string().describe('The ID of the client.'),
  invoiceId: z.string().describe('The ID of the invoice.'),
  invoiceAmount: z.number().describe('The amount of the invoice.'),
  daysPastDue: z.number().describe('The number of days the invoice is past due.'),
  clientPaymentHistory: z
    .string()
    .describe(
      'A summary of the client payment history, including on-time payments, late payments, and any payment issues.'
    ),
});
export type SmartReminderInput = z.infer<typeof SmartReminderInputSchema>;

const SmartReminderOutputSchema = z.object({
  reminderType: z.enum(['friendly', 'firm']).describe('The type of reminder to send.'),
  reminderMessage: z.string().describe('The content of the reminder message.'),
});
export type SmartReminderOutput = z.infer<typeof SmartReminderOutputSchema>;

export async function getSmartReminder(input: SmartReminderInput): Promise<SmartReminderOutput> {
  return smartReminderFlow(input);
}

const decideReminderType = ai.defineTool({
  name: 'decideReminderType',
  description: 'Decides whether a friendly or firm reminder is more appropriate based on client history.',
  inputSchema: z.object({
    clientPaymentHistory: z
      .string()
      .describe(
        'A summary of the client payment history, including on-time payments, late payments, and any payment issues.'
      ),
    daysPastDue: z.number().describe('The number of days the invoice is past due.'),
  }),
  outputSchema: z.enum(['friendly', 'firm']),
},
async (input) => {
    if (input.daysPastDue > 30) {
      return 'firm';
    }
    const history = input.clientPaymentHistory.toLowerCase();
    if (history.includes('late') || history.includes('issue')) {
      return 'firm';
    }
    return 'friendly';
  }
);

const smartReminderPrompt = ai.definePrompt({
  name: 'smartReminderPrompt',
  tools: [decideReminderType],
  input: {schema: SmartReminderInputSchema},
  output: {schema: SmartReminderOutputSchema},
  prompt: `You are an AI assistant helping to draft invoice reminders for freelancers. Given the client's payment history and the invoice details, determine the appropriate tone and content for the reminder message.

Client ID: {{{clientId}}}
Invoice ID: {{{invoiceId}}}
Invoice Amount: {{{invoiceAmount}}}
Days Past Due: {{{daysPastDue}}}
Client Payment History: {{{clientPaymentHistory}}}

Based on the client's payment history and the number of days the invoice is past due, use the decideReminderType tool to determine whether a friendly or firm reminder is more appropriate. Then, generate a reminder message that is appropriate for the determined type.

If the reminder type is "friendly", the message should be polite and understanding. If the reminder type is "firm", the message should be direct and assertive.

Output the reminderType and reminderMessage.
`,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const smartReminderFlow = ai.defineFlow(
  {
    name: 'smartReminderFlow',
    inputSchema: SmartReminderInputSchema,
    outputSchema: SmartReminderOutputSchema,
  },
  async input => {
    const {output} = await smartReminderPrompt(input);
    return output!;
  }
);
