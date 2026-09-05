import { NextRequest, NextResponse } from 'next/server'
import { getEmbedding, generateAnswer } from '@/lib/gemini'
import { search } from '@/lib/vectorStore'

export async function POST(req: NextRequest) {
  // Validate API key
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      {
        error: 'GEMINI_API_KEY is not configured. Please add your API key to .env.local',
      },
      { status: 500 }
    )
  }

  // Parse and validate request body
  let question: string
  try {
    const body = await req.json()
    question = body.question
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!question?.trim()) {
    return NextResponse.json({ error: 'Question is required' }, { status: 400 })
  }

  if (question.trim().length < 3) {
    return NextResponse.json(
      { error: 'Question is too short. Please ask a more specific question.' },
      { status: 400 }
    )
  }

  try {
    // Step 1: Embed the query
    const queryEmbedding = await getEmbedding(question.trim())

    // Step 2: Retrieve top-k relevant chunks
    const relevantChunks = await search(queryEmbedding, 5)

    // Step 3: Handle empty knowledge base
    if (relevantChunks.length === 0) {
      return NextResponse.json({
        answer:
          "I don't have any documents in my knowledge base yet. Please add some documents first using the form above, then come back to ask me questions.",
        sources: [],
      })
    }

    // Step 4: Build context from retrieved chunks
    const context = relevantChunks
      .map(c => `[Source: ${c.metadata.source}]\n${c.text}`)
      .join('\n\n---\n\n')

    // Step 5: Generate grounded answer
    const answer = await generateAnswer(context, question.trim())

    // Step 6: Return answer with sources
    return NextResponse.json({
      answer,
      sources: relevantChunks.map(c => c.metadata.source),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[/api/ask]', message)

    if (message.includes('API_KEY') || message.includes('quota') || message.includes('limit')) {
      return NextResponse.json(
        { error: 'Gemini API error. Check your API key and quota.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
