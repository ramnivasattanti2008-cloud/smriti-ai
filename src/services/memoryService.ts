import type { Memory } from '../types';
import { MOCK_MEMORIES } from '../data/mockData';

const MEMORY_STORAGE_KEY = 'smriti_ai_memories';

// Initial default memories mapped from mockData
const DEFAULT_MEMORIES: Memory[] = MOCK_MEMORIES.map((m) => ({
  id: m.id,
  userId: 'elder-user-1',
  title: m.title,
  description: m.description,
  createdAt: m.date,
}));

export const getMemories = (): Memory[] => {
  try {
    const raw = localStorage.getItem(MEMORY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(MEMORY_STORAGE_KEY, JSON.stringify(DEFAULT_MEMORIES));
      return DEFAULT_MEMORIES;
    }
    return JSON.parse(raw) as Memory[];
  } catch (error) {
    console.error('Failed to get memories:', error);
    return DEFAULT_MEMORIES;
  }
};

export const addMemory = (newMem: Omit<Memory, 'id' | 'createdAt'>): Memory => {
  const existing = getMemories();
  const created: Memory = {
    ...newMem,
    id: `mem-${Date.now()}`,
    createdAt: new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  };

  const updated = [created, ...existing];
  try {
    localStorage.setItem(MEMORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to add memory:', error);
  }

  return created;
};
