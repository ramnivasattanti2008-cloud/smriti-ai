'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  sources?: string[]
}

export default function MemoryAssistant() {
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleAsk = async () => {
    if (!query.trim() || loading) return

    const userMsg: Message = { role: 'user', content: query }
    setMessages(prev => [...prev, userMsg])
    const currentQuery = query
    setQuery('')
    setLoading(true)
    setError(null)
    inputRef.current?.blur()

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: currentQuery }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Request failed')
      }

      const data = await res.json()
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.answer, sources: data.sources },
      ])
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      setError(msg.includes('API key')
        ? '⚠️ GEMINI_API_KEY not configured. Add your key in .env.local'
        : `⚠️ ${msg}. Please try again.`
      )
      // Remove the user message if the request failed
      setMessages(prev => prev.filter((m, i) => i !== prev.length - 1 || m.role !== 'user'))
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Message area */}
      <div className="p-6 space-y-4 min-h-[400px] max-h-[520px] overflow-y-auto chat-scroll">
        {messages.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Start a conversation</h3>
            <p className="text-sm text-gray-400 max-w-xs mx-auto">
              Add some documents first, then ask me anything about them.
            </p>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[78%] rounded-2xl px-5 py-3.5 ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-900 rounded-bl-md'
                }`}
              >
                <p className="text-xs font-semibold mb-1.5 opacity-70">
                  {m.role === 'user' ? 'You' : '🧠 smriti-ai'}
                </p>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>

                {/* Sources for assistant messages */}
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-gray-200/50">
                    <p className="text-xs font-semibold mb-1.5 opacity-60">📚 Sources:</p>
                    {m.sources.map((s, j) => (
                      <p key={j} className="text-xs opacity-70 flex items-start gap-1">
                        <span className="opacity-50">•</span>
                        <span className="truncate">{s}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-md px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="text-lg">🤔</span>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-gray-500 ml-1">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3.5 text-sm flex items-start gap-2">
            <span className="text-red-500 mt-0.5">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex gap-3">
          <input
            ref={inputRef}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              placeholder-gray-400 transition-all"
            placeholder="Ask something about your documents..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleAsk()}
            disabled={loading}
          />
          <button
            onClick={handleAsk}
            disabled={loading || !query.trim()}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800
              disabled:opacity-40 disabled:cursor-not-allowed
              text-white px-6 py-3 rounded-xl text-sm font-semibold
              transition-all duration-200 shadow-sm hover:shadow-md
              flex items-center gap-2"
          >
            <span>Ask</span>
            <span>→</span>
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
