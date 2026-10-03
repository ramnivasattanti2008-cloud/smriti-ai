export interface AiMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

const responses = [
  'I can help you plan a gentle activity, revisit a memory, or check your reminders.',
  'That sounds like a meaningful moment. Would you like to save it as a memory?',
  'Let us take this one small step at a time. A quiet breathing pause could be a nice choice.',
];

export const getDemoAiResponse = (message: string): AiMessage => ({
  id: `ai-${Date.now()}`,
  role: 'assistant',
  content: message.toLowerCase().includes('remind')
    ? 'Your next demo reminder is to drink water at 10:30 AM.'
    : responses[message.length % responses.length],
  createdAt: new Date().toISOString(),
});
