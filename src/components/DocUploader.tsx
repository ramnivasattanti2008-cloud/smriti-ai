'use client'

import { useState } from 'react'

export default function DocUploader() {
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [wordCount, setWordCount] = useState(0)

  const handleTextChange = (value: string) => {
    setText(value)
    setWordCount(value.trim() ? value.trim().split(/\s+/).length : 0)
  }

  const handleIngest = async () => {
    if (!text.trim() || !title.trim()) {
      setError('Please provide both a title and some content.')
      return
    }
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch('/api/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim(), title: title.trim() }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to ingest document')
      }

      const data = await res.json()
      setSuccess(
        `✅ "${title}" ingested successfully — ${data.chunkCount} chunk${data.chunkCount !== 1 ? 's' : ''} stored and indexed.`
      )
      setText('')
      setTitle('')
      setWordCount(0)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to ingest'
      if (msg.includes('API key') || msg.includes('GEMINI')) {
        setError('⚠️ API key issue. Make sure GEMINI_API_KEY is set in your environment.')
      } else {
        setError(`⚠️ ${msg}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-gray-900">📄 Add Document</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Add notes, project descriptions, or any text you want to query later
          </p>
        </div>
        <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg">
          {wordCount} word{wordCount !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="space-y-4">
        {/* Title input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Document title
          </label>
          <input
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              placeholder-gray-400 transition-all"
            placeholder="e.g., VOJAS Project Notes, DSA Study Guide, Interview Prep..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Text area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Content
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              placeholder-gray-400 transition-all resize-y min-h-[140px]"
            placeholder={`Paste your notes, project descriptions, study material, or any text...\n\nExample:\n"This project uses Next.js 15 with App Router, React 19, and TypeScript. The backend is Express.js with Prisma ORM connected to PostgreSQL. Authentication uses JWT tokens..."`}
            value={text}
            onChange={e => handleTextChange(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Feedback */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-2.5 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-2.5 text-sm">
            {success}
          </div>
        )}

        {/* Submit button */}
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-gray-400">
            Text is split into chunks and embedded for semantic search
          </p>
          <button
            onClick={handleIngest}
            disabled={loading || !text.trim() || !title.trim()}
            className="bg-green-600 hover:bg-green-700 active:bg-green-800
              disabled:opacity-40 disabled:cursor-not-allowed
              text-white px-6 py-2.5 rounded-xl text-sm font-semibold
              transition-all duration-200 shadow-sm hover:shadow-md
              flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Ingesting...
              </>
            ) : (
              <>
                <span>+</span> Add to Knowledge Base
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
