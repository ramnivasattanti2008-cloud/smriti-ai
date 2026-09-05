/**
 * In-memory vector store for RAG.
 *
 * Architecture:
 * 1. ingestDocument() → chunks text → generates embeddings → stores in memory
 * 2. search() → embeds query → cosine similarity → returns top-k chunks
 * 3. getAllDocuments() → deduplicates by title → returns document list
 *
 * Production upgrade path: Replace this with Pinecone, Weaviate, or Qdrant
 */

export interface Chunk {
  id: string
  text: string
  embedding: number[]
  metadata: {
    title: string
    source: string
  }
  createdAt: string
}

// In-memory storage — persists for the server process lifetime
// On Vercel/serverless: resets on each cold start (design for this)
const store: Chunk[] = []

/**
 * Split text into overlapping chunks of ~chunkSize words
 */
export function chunkText(text: string, chunkSize = 512, overlap = 64): string[] {
  const words = text.split(/\s+/)
  const chunks: string[] = []
  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(' ')
    if (chunk.trim().length > 0) {
      chunks.push(chunk.trim())
    }
  }
  return chunks
}

/**
 * Compute cosine similarity between two vectors
 */
function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0)
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
  return normA && normB ? dot / (normA * normB) : 0
}

/**
 * Ingest a document: chunk → embed → store
 * Returns the first chunk ID and total chunk count
 */
export async function ingestDocument(
  title: string,
  text: string
): Promise<{ id: string; chunkCount: number }> {
  const chunks = chunkText(text)
  const { getEmbedding } = await import('./gemini')

  const ids: string[] = []
  const createdAt = new Date().toISOString()

  for (const chunkText of chunks) {
    const embedding = await getEmbedding(chunkText)
    const id = crypto.randomUUID()
    store.push({
      id,
      text: chunkText,
      embedding,
      metadata: { title, source: title },
      createdAt,
    })
    ids.push(id)
  }

  return { id: ids[0], chunkCount: chunks.length }
}

/**
 * Search for the top-k most relevant chunks using cosine similarity
 */
export async function search(
  queryEmbedding: number[],
  topK = 5
): Promise<Chunk[]> {
  if (store.length === 0) return []

  const scored = store.map(chunk => ({
    chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }))

  scored.sort((a, b) => b.score - a.score)

  return scored.slice(0, topK).map(s => s.chunk)
}

/**
 * Get all unique documents (deduplicated by title)
 */
export function getAllDocuments(): Chunk[] {
  const seen = new Set<string>()
  return store.filter(c => {
    if (seen.has(c.metadata.title)) return false
    seen.add(c.metadata.title)
    return true
  })
}

/**
 * Delete a chunk by ID
 */
export function deleteChunk(id: string): boolean {
  const idx = store.findIndex(c => c.id === id)
  if (idx === -1) return false
  store.splice(idx, 1)
  return true
}

/**
 * Get store stats (useful for debugging)
 */
export function getStoreStats(): { totalChunks: number; uniqueDocs: number } {
  const unique = new Set(store.map(c => c.metadata.title))
  return { totalChunks: store.length, uniqueDocs: unique.size }
}
