import { NextRequest, NextResponse } from 'next/server'
import { ingestDocument } from '@/lib/vectorStore'

export async function POST(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY is not configured.' },
      { status: 500 }
    )
  }

  let text: string
  let title: string

  try {
    const body = await req.json()
    text = body.text
    title = body.title
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!text?.trim()) {
    return NextResponse.json({ error: 'Text content is required' }, { status: 400 })
  }

  if (!title?.trim()) {
    return NextResponse.json({ error: 'Document title is required' }, { status: 400 })
  }

  if (text.trim().length < 20) {
    return NextResponse.json(
      { error: 'Text is too short. Please provide at least 20 characters.' },
      { status: 400 }
    )
  }

  try {
    const result = await ingestDocument(title.trim(), text.trim())
    return NextResponse.json(result, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[/api/ingest]', message)

    if (message.includes('quota') || message.includes('limit')) {
      return NextResponse.json(
        { error: 'Gemini API quota exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
