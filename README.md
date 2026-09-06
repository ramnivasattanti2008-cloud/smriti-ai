# smriti-ai — RAG Memory Assistant

> 🤖 AI-powered document Q&A with source-grounded answers

smriti-ai is a Retrieval-Augmented Generation (RAG) chatbot that understands your documents and answers questions with citations. Upload any text, ask questions, and get grounded responses.

## How It Works

```
┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│  Document    │────▶│   Chunk     │────▶│  Embedding   │
│  Upload      │     │   (512w)    │     │  (Gemini)    │
└──────────────┘     └─────────────┘     └──────────────┘
                                                │
                                                ▼
┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│  Grounded    │◀────│   LLM       │◀────│   Query      │
│  Answer +    │     │  (Gemini)   │     │  Embedding   │
│  Sources     │     └─────────────┘     └──────────────┘
└──────────────┘            ▲
                            │
                     ┌──────────────┐
                     │  Top-K       │
                     │  Similarity  │
                     └──────────────┘
```

## Features

- 📄 **Document Ingestion** — Upload any text content
- 🧠 **RAG Architecture** — Combines retrieval + generation
- 🔍 **Semantic Search** — Cosine similarity on embeddings
- 📚 **Source Citations** — Every answer cites the source chunks
- 💬 **Chat Interface** — Clean, modern conversation UI
- 🚀 **Powered by Gemini** — Google's latest embedding + chat models

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React, Tailwind CSS |
| Embeddings | Google Gemini Embedding API |
| LLM | Google Gemini 2.0 Flash |
| Vector Store | In-memory (upgradeable to Pinecone/Weaviate) |
| Deployment | Vercel |

## Quick Start

```bash
# Clone the repo
git clone https://github.com/ramnivasattanti2008-cloud/smriti-ai.git
cd smriti-ai

# Install dependencies
npm install

# Set up environment
cp .env.local.example .env.local
# Add your GEMINI_API_KEY to .env.local

# Run development server
npm run dev
```

## Environment Variables

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key at [Google AI Studio](https://aistudio.google.com/apikey)

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ingest` | POST | Upload and index a document |
| `/api/docs` | GET | List all indexed documents |
| `/api/docs/[id]` | DELETE | Remove a document |
| `/api/ask` | POST | Ask a question (RAG query) |

## Example Usage

```typescript
// Ingest a document
const ingestRes = await fetch('/api/ingest', {
  method: 'POST',
  body: JSON.stringify({ title: 'My Notes', text: '...' })
})

// Ask a question
const askRes = await fetch('/api/ask', {
  method: 'POST',
  body: JSON.stringify({ question: 'What is the main topic?' })
})
// Returns: { answer: "...", sources: ["My Notes"] }
```

## Architecture

```
src/
├── app/
│   ├── api/
│   │   ├── ask/route.ts      # RAG query endpoint
│   │   ├── docs/route.ts     # Document management
│   │   └── ingest/route.ts   # Document ingestion
│   ├── page.tsx              # Main chat UI
│   └── layout.tsx            # App layout
├── components/
│   ├── MemoryAssistant.tsx    # Chat interface
│   ├── DocUploader.tsx      # Document upload
│   └── DocumentList.tsx      # Document list
└── lib/
    ├── vectorStore.ts        # RAG vector store
    └── gemini.ts             # Gemini API client
```

## Production Considerations

This demo uses in-memory vector storage. For production:

- **Pinecone** — Managed vector database
- **Weaviate** — Open-source vector search
- **Qdrant** — Vector similarity search engine
- **ChromaDB** — Lightweight vector database

## License

MIT

---

Built with 💜 by [Attanti Ramnivas](https://github.com/ramnivasattanti2008-cloud)
