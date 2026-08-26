export type UserRole = 'elder' | 'caregiver' | 'health_worker';

export type GameDifficulty = 'easy' | 'medium' | 'hard';

export type EngagementLevel = 'low' | 'moderate' | 'high';

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

export interface PersonalizationProfile {
  preferredActivities: string[];
  completedSessions: number;
  averageGameScore: number;
  averageMistakes: number;
  averageCompletionTimeSeconds: number;
  recentActivityCount: number;
  currentStreakDays: number;
  engagementLevel: EngagementLevel;
}

export interface ActivityRecommendation {
  activityId: string;
  activityName: string;
  difficulty: GameDifficulty;
  explanation: string;
}

export interface DifficultyRecommendation {
  difficulty: GameDifficulty;
  explanation: string;
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
