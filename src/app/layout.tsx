import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'smriti-ai — Smart Memory Assistant',
  description: 'An AI-powered personal knowledge base using RAG architecture. Ask questions — get grounded answers from your own documents.',
  keywords: ['AI', 'RAG', 'LLM', 'Gemini', 'vector embeddings', 'memory assistant', 'knowledge base'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  )
}
