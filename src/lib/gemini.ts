import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini client — throws if key is missing
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY ?? ''
)

/**
 * Get vector embedding for a text chunk using Gemini text-embedding-004
 */
export async function getEmbedding(text: string): Promise<number[]> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not set')
  }
  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' })
  const result = await model.embedContent(text)
  return result.embedding.values
}

/**
 * Generate a grounded answer from context using Gemini 1.5 Flash
 */
export async function generateAnswer(
  context: string,
  question: string
): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not set')
  }
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  const prompt = `You are a helpful AI assistant answering questions based ONLY on the user's personal documents.
Follow these rules strictly:
1. Answer using ONLY the information provided in the CONTEXT below
2. If the answer is not in the context, say "I don't have enough information to answer this question based on your documents."
3. Never make up or assume information not present in the context
4. Be concise but complete
5. If relevant, cite which document(s) the answer comes from

CONTEXT:
${context}

---
QUESTION: ${question}

ANSWER:`
  const result = await model.generateContent(prompt)
  return result.response.text()
}
