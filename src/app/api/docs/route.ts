import { NextResponse } from 'next/server'
import { getAllDocuments } from '@/lib/vectorStore'

export async function GET() {
  try {
    const docs = getAllDocuments()
    return NextResponse.json({
      documents: docs.map(d => ({
        id: d.id,
        title: d.metadata.title,
        text: d.text,
        chunkCount: 1,
        createdAt: d.createdAt,
      })),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
