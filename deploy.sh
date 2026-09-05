#!/bin/bash
# smriti-ai — Push to GitHub Script
# Run this from the smriti-ai directory

echo "=== smriti-ai Push Script ==="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing git..."
    git init
    git branch -M main
fi

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "Adding remote origin..."
    git remote add origin https://github.com/ramnivasattanti2008-cloud/smriti-ai.git
fi

# Stage all files
echo "Staging files..."
git add .

# Check if there are changes
if git diff --cached --quiet; then
    echo "No changes to commit."
    exit 0
fi

# Commit
echo "Committing..."
git commit -m "smriti-ai v1.0: RAG memory assistant with Gemini LLM and vector embeddings

- Next.js 15 App Router with TypeScript and Tailwind CSS
- Google Gemini 1.5 Flash for LLM answering
- text-embedding-004 for embedding generation
- In-memory vector store with cosine similarity retrieval
- Document ingestion with text chunking
- Chat UI with message history and source citations
- Production deployment ready (Vercel)
- MIT License"

# Push
echo "Pushing to GitHub..."
git branch -M main
git push -u origin main --force

echo ""
echo "=== Done! ==="
echo "Check your repo at: https://github.com/ramnivasattanti2008-cloud/smriti-ai"
echo "Then deploy to Vercel at: https://vercel.com"
