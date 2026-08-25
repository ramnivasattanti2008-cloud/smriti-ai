import type { GameDifficulty } from '../types';
import { getGameSessions } from './gameService';

export interface AdaptiveRecommendation {
  recommendedGameId: string;
  recommendedGameTitle: string;
  recommendedDifficulty: GameDifficulty;
  reason: string;
  engagementTip: string;
  accuracyPercent: number;
  avgMoves: number;
  recentActivityCount: number;
}

/**
 * Adaptive Cognitive Engine
 * Calculates activity trends and personalized recommendations.
 * CRITICAL RULE: Non-diagnostic engine. Does NOT diagnose medical conditions.
 */
export const getAdaptiveRecommendation = (): AdaptiveRecommendation => {
  const sessions = getGameSessions();

  if (sessions.length === 0) {
    return {
      recommendedGameId: 'memory-match',
      recommendedGameTitle: 'Memory Match',
      recommendedDifficulty: 'easy',
      reason: 'Welcome! Start with a relaxed 4-pair matching game to warm up.',
      engagementTip: 'Take your time and enjoy the friendly cards.',
      accuracyPercent: 100,
      avgMoves: 0,
      recentActivityCount: 0,
    };
  }

  // Calculate metrics over past sessions
  const totalMoves = sessions.reduce((sum, s) => sum + s.moves, 0);
  const totalMistakes = sessions.reduce((sum, s) => sum + s.mistakes, 0);
  const avgMoves = Math.round(totalMoves / sessions.length);

  // Estimate accuracy (fewer mistakes = higher accuracy)
  const totalAttempts = totalMoves + totalMistakes;
  const accuracyPercent = totalAttempts > 0
    ? Math.max(50, Math.min(100, Math.round(((totalAttempts - totalMistakes) / totalAttempts) * 100)))
    : 90;

  const lastSession = sessions[0];
  let recommendedDifficulty: GameDifficulty = lastSession.difficulty;
  let reason = '';
  let engagementTip = '';

  if (accuracyPercent >= 85 && lastSession.score >= 80) {
    if (lastSession.difficulty === 'easy') {
      recommendedDifficulty = 'medium';
      reason = 'You did great on Easy! Ready to try 6 pairs in Medium mode?';
      engagementTip = 'Great progress! Stepping up difficulty keeps focus sharp.';
    } else if (lastSession.difficulty === 'medium') {
      recommendedDifficulty = 'hard';
      reason = 'Outstanding performance on Medium! Try the full 8-pair Hard challenge.';
      engagementTip = 'Your engagement is fantastic today.';
    } else {
      recommendedDifficulty = 'hard';
      reason = 'Excellent mastery on Hard mode! Keep up the daily practice.';
      engagementTip = 'Consistency is the key to daily enjoyment.';
    }
  } else if (accuracyPercent < 65 || lastSession.mistakes > 8) {
    recommendedDifficulty = 'easy';
    reason = 'Let’s enjoy a calm, relaxed session with 4 pairs.';
    engagementTip = 'Remember there is no rush—enjoy each match!';
  } else {
    recommendedDifficulty = lastSession.difficulty;
    reason = `Continuing with ${lastSession.difficulty.toUpperCase()} mode for comfortable practice.`;
    engagementTip = 'Pacing yourself brings the best experience.';
  }

  return {
    recommendedGameId: 'memory-match',
    recommendedGameTitle: 'Memory Match',
    recommendedDifficulty,
    reason,
    engagementTip,
    accuracyPercent,
    avgMoves,
    recentActivityCount: sessions.length,
  };
};
