'use client'

import { useState } from 'react'
import MemoryAssistant from '@/components/MemoryAssistant'
import DocUploader from '@/components/DocUploader'
import DocumentList from '@/components/DocumentList'

type Tab = 'chat' | 'documents'

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('chat')

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                🧠 smriti-ai
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Smart Memory Assistant — powered by RAG + Gemini LLM
              </p>
            </div>
            {/* Tab switcher */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'chat'
                    ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                💬 Chat
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'documents'
                    ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                📄 Documents
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === 'chat' ? (
          <div className="space-y-6">
            {/* How it works */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-blue-800 mb-2">🧠 How it works</h2>
              <ol className="text-sm text-blue-700 space-y-1">
                <li>① <strong>Add documents</strong> — paste notes, project descriptions, study material</li>
                <li>② The AI <strong>indexes and embeds</strong> your documents using Gemini embeddings</li>
                <li>③ <strong>Ask questions</strong> in natural language</li>
                <li>④ Get <strong>grounded answers</strong> with source citations</li>
              </ol>
            </div>

            {/* Document uploader */}
            <DocUploader />

            {/* Chat interface */}
            <MemoryAssistant />
          </div>
        ) : (
          <DocumentList />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-8">
        <div className="max-w-5xl mx-auto px-4 py-4 text-center">
          <p className="text-xs text-gray-400">
            Built with Next.js 15 + Google Gemini LLM ·
            <a href="https://github.com/ramnivasattanti2008-cloud/smriti-ai" className="underline hover:text-gray-600 ml-1">
              View on GitHub
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}
