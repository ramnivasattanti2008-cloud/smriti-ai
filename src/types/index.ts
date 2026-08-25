export type UserRole = 'elder' | 'caregiver' | 'health_worker';

export type GameDifficulty = 'easy' | 'medium' | 'hard';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface GameCard {
  id: string;
  pairId: string;
  symbolName: string;
  flipped: boolean;
  matched: boolean;
}

export interface GameSession {
  id: string;
  userId: string;
  gameId: string;
  gameTitle: string;
  difficulty: GameDifficulty;
  score: number;
  moves: number;
  mistakes: number;
  durationSeconds: number;
  pairsCompleted: number;
  totalPairs: number;
  startedAt: string;
  completedAt: string;
  completed: boolean;
}

export interface GameResult {
  score: number;
  moves: number;
  mistakes: number;
  durationFormatted: string;
  pairsCompleted: number;
  totalPairs: number;
  difficulty: GameDifficulty;
}

export interface Memory {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl?: string;
  audioUrl?: string;
  createdAt: string;
}

export interface Reminder {
  id: string;
  userId: string;
  title: string;
  time: string;
  type: 'medication' | 'appointment' | 'meal' | 'water' | 'activity' | 'family';
  completed: boolean;
  repeatDaily: boolean;
}
