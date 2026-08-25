import type { GameDifficulty } from '../types';
import { getGameSessions } from './gameService';

export interface SmartDailyPlanItem {
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
  activityId: string;
  activityTitle: string;
  category: 'Memory' | 'Focus' | 'Patterns' | 'Reflection';
  duration: string;
  difficulty: GameDifficulty;
  reason: string;
  completed: boolean;
}

export interface PersonalizationAnalysis {
  recommendedGameId: string;
  recommendedGameTitle: string;
  recommendedDifficulty: GameDifficulty;
  recommendedDuration: string;
  reason: string;
  engagementTip: string;
  accuracyPercent: number;
  avgResponseSpeed: 'Calm & Steady' | 'Balanced' | 'Quick';
  avgMoves: number;
  recentActivityCount: number;
  streakDays: number;
  smartDailyPlan: SmartDailyPlanItem[];
}

/**
 * SMRITI AI - Adaptive Personalization Engine
 * Analyzes gameplay signals (accuracy, response time, mistakes, completion patterns)
 * and generates personalized recommendations and a Smart Daily Plan.
 *
 * CRITICAL RULE: Non-diagnostic engine. Does NOT diagnose medical conditions.
 * Uses engagement and activity trend metrics ONLY.
 */
export const getPersonalizationAnalysis = (): PersonalizationAnalysis => {
  const sessions = getGameSessions();

  if (sessions.length === 0) {
    return {
      recommendedGameId: 'memory-match',
      recommendedGameTitle: 'Memory Match',
      recommendedDifficulty: 'easy',
      recommendedDuration: '5 minutes',
      reason: 'Welcome to SMRITI AI! We suggest a relaxed 4-pair Memory Match to start your morning.',
      engagementTip: 'Take all the time you need. Enjoy each friendly card match.',
      accuracyPercent: 100,
      avgResponseSpeed: 'Calm & Steady',
      avgMoves: 0,
      recentActivityCount: 0,
      streakDays: 5,
      smartDailyPlan: [
        {
          timeOfDay: 'Morning',
          activityId: 'memory-match',
          activityTitle: 'Memory Match',
          category: 'Memory',
          duration: '5 minutes',
          difficulty: 'easy',
          reason: 'Calm warm-up for memory recognition.',
          completed: true,
        },
        {
          timeOfDay: 'Afternoon',
          activityId: 'memory-moment',
          activityTitle: 'Memory Moment',
          category: 'Reflection',
          duration: '3 minutes',
          difficulty: 'easy',
          reason: 'Look back at a special family memory.',
          completed: false,
        },
        {
          timeOfDay: 'Evening',
          activityId: 'focus-finder',
          activityTitle: 'Focus Finder',
          category: 'Focus',
          duration: '5 minutes',
          difficulty: 'easy',
          reason: 'Gentle evening attention exercise.',
          completed: false,
        },
      ],
    };
  }

  // Calculate metrics over past sessions
  const totalMoves = sessions.reduce((sum, s) => sum + s.moves, 0);
  const totalMistakes = sessions.reduce((sum, s) => sum + s.mistakes, 0);
  const totalSeconds = sessions.reduce((sum, s) => sum + s.durationSeconds, 0);

  const avgMoves = Math.round(totalMoves / sessions.length);
  const avgDuration = Math.round(totalSeconds / sessions.length);

  // Response speed rating
  let avgResponseSpeed: 'Calm & Steady' | 'Balanced' | 'Quick' = 'Balanced';
  if (avgDuration > 90) {
    avgResponseSpeed = 'Calm & Steady';
  } else if (avgDuration < 45) {
    avgResponseSpeed = 'Quick';
  }

  // Accuracy calculation
  const totalAttempts = totalMoves + totalMistakes;
  const accuracyPercent = totalAttempts > 0
    ? Math.max(50, Math.min(100, Math.round(((totalAttempts - totalMistakes) / totalAttempts) * 100)))
    : 90;

  const lastSession = sessions[0];
  let recommendedDifficulty: GameDifficulty = lastSession.difficulty;
  let recommendedDuration = '5 minutes';
  let reason = '';
  let engagementTip = '';

  if (accuracyPercent >= 85 && lastSession.score >= 80) {
    if (lastSession.difficulty === 'easy') {
      recommendedDifficulty = 'medium';
      recommendedDuration = '5–7 minutes';
      reason = 'You scored 85%+ accuracy on Easy! We recommend stepping up to 6 pairs in Medium mode.';
      engagementTip = 'Gradual progression strengthens focus while maintaining a calm pace.';
    } else if (lastSession.difficulty === 'medium') {
      recommendedDifficulty = 'hard';
      recommendedDuration = '8–10 minutes';
      reason = 'Outstanding performance on Medium! Try the full 8-pair Hard challenge.';
      engagementTip = 'Your engagement is fantastic today.';
    } else {
      recommendedDifficulty = 'hard';
      recommendedDuration = '10 minutes';
      reason = 'High consistency on Hard mode! Keep up your daily cognitive routine.';
      engagementTip = 'Daily practice fosters positive habit building.';
    }
  } else if (accuracyPercent < 65 || lastSession.mistakes > 8) {
    recommendedDifficulty = 'easy';
    recommendedDuration = '3–5 minutes';
    reason = 'Let’s enjoy a calm, relaxed 4-pair activity to ensure zero frustration.';
    engagementTip = 'Remember there is no rush—enjoy each match at your own speed.';
  } else {
    recommendedDifficulty = lastSession.difficulty;
    recommendedDuration = '5 minutes';
    reason = `Continuing with ${lastSession.difficulty.toUpperCase()} mode for optimal comfort and engagement.`;
    engagementTip = 'Pacing yourself brings the best experience.';
  }

  const smartDailyPlan: SmartDailyPlanItem[] = [
    {
      timeOfDay: 'Morning',
      activityId: 'memory-match',
      activityTitle: 'Memory Match',
      category: 'Memory',
      duration: recommendedDuration,
      difficulty: recommendedDifficulty,
      reason: reason,
      completed: sessions.length > 0,
    },
    {
      timeOfDay: 'Afternoon',
      activityId: 'memory-moment',
      activityTitle: 'Memory Moment',
      category: 'Reflection',
      duration: '3 minutes',
      difficulty: 'easy',
      reason: 'Reflect on a cherished family photo and story.',
      completed: false,
    },
    {
      timeOfDay: 'Evening',
      activityId: 'focus-finder',
      activityTitle: 'Focus Finder',
      category: 'Focus',
      duration: '5 minutes',
      difficulty: recommendedDifficulty === 'hard' ? 'medium' : 'easy',
      reason: 'Gentle evening focus practice before rest.',
      completed: false,
    },
  ];

  return {
    recommendedGameId: 'memory-match',
    recommendedGameTitle: 'Memory Match',
    recommendedDifficulty,
    recommendedDuration,
    reason,
    engagementTip,
    accuracyPercent,
    avgResponseSpeed,
    avgMoves,
    recentActivityCount: sessions.length,
    streakDays: Math.min(30, sessions.length + 4),
    smartDailyPlan,
  };
};

export const getAdaptiveRecommendation = getPersonalizationAnalysis;
