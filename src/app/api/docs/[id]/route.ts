import { NextRequest, NextResponse } from 'next/server'
import { deleteChunk } from '@/lib/vectorStore'

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    if (!id) {
      return NextResponse.json({ error: 'Document ID is required' }, { status: 400 })
    }
    const deleted = deleteChunk(id)
    return NextResponse.json({ success: deleted })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
