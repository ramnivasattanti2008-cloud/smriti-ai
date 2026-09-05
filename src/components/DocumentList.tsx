'use client'

import { useState, useEffect } from 'react'

interface Doc {
  id: string
  title: string
  text: string
  chunkCount: number
  createdAt: string
}

export default function DocumentList() {
  const [docs, setDocs] = useState<Doc[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchDocs()
  }, [])

  const fetchDocs = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/docs')
      if (res.ok) {
        const data = await res.json()
        setDocs(data.documents || [])
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return
    setDeleting(id)
    try {
      await fetch(`/api/docs/${id}`, { method: 'DELETE' })
      setDocs(prev => prev.filter(d => d.id !== id))
    } catch {
      // Silently fail
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading documents...</p>
        </div>
      </div>
    )
  }

  if (docs.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
        <div className="text-5xl mb-4">📭</div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No documents yet</h3>
        <p className="text-sm text-gray-400 max-w-sm mx-auto">
          Go to the Chat tab, add some documents using the form, then ask questions about them here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{docs.length}</span> document{docs.length !== 1 ? 's' : ''} in knowledge base
        </p>
        <button
          onClick={fetchDocs}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          🔄 Refresh
        </button>
      </div>

      {docs.map(doc => (
        <div key={doc.id} className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-gray-300 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-semibold text-gray-900">{doc.title}</h4>
              <p className="text-xs text-gray-400 mt-0.5">
                {doc.chunkCount} chunk{doc.chunkCount !== 1 ? 's' : ''} ·
                Added {new Date(doc.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'short', year: 'numeric'
                })}
              </p>
            </div>
            <button
              onClick={() => handleDelete(doc.id, doc.title)}
              disabled={deleting === doc.id}
              className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50
                px-3 py-1.5 rounded-lg font-medium transition-colors
                disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {deleting === doc.id ? 'Deleting...' : '🗑 Delete'}
            </button>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
            {doc.text}
          </p>
        </div>
      ))}
    </div>
  )
}
