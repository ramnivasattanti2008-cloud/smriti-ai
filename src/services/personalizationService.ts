import { getGameSessions } from './gameService';
import type {
  ActivityRecommendation,
  DifficultyRecommendation,
  EngagementLevel,
  GameDifficulty,
  GameSession,
  PersonalizationProfile,
} from '../types';

const RECENT_ACTIVITY_WINDOW_DAYS = 7;
const AVAILABLE_ACTIVITY = {
  id: 'memory-match',
  name: 'Memory Match',
};

const getDaysSince = (date: string, now: Date): number => {
  const elapsed = now.getTime() - new Date(date).getTime();
  return Math.max(0, Math.floor(elapsed / 86_400_000));
};

const getRecentSessions = (sessions: GameSession[], now: Date): GameSession[] =>
  sessions.filter(
    (session) =>
      session.completed &&
      getDaysSince(session.completedAt, now) <= RECENT_ACTIVITY_WINDOW_DAYS
  );

const getActivityDates = (sessions: GameSession[]): Set<string> =>
  new Set(
    sessions.map((session) =>
      new Date(session.completedAt).toISOString().slice(0, 10)
    )
  );

const calculateCurrentStreak = (sessions: GameSession[], now: Date): number => {
  const activityDates = getActivityDates(sessions);
  let streak = 0;
  const date = new Date(now);
  date.setHours(0, 0, 0, 0);

  while (activityDates.has(date.toISOString().slice(0, 10))) {
    streak += 1;
    date.setDate(date.getDate() - 1);
  }

  return streak;
};

const getEngagementLevel = (
  recentSessions: GameSession[],
  currentStreakDays: number
): EngagementLevel => {
  if (recentSessions.length >= 4 && currentStreakDays >= 3) return 'high';
  if (recentSessions.length >= 1) return 'moderate';
  return 'low';
};

export const analyzeGameSessions = (
  sessions: GameSession[],
  now: Date = new Date()
): PersonalizationProfile => {
  const completedSessions = sessions.filter((session) => session.completed);
  const recentSessions = getRecentSessions(sessions, now);
  const sessionCount = completedSessions.length;
  const average = (select: (session: GameSession) => number): number =>
    sessionCount === 0
      ? 0
      : Math.round(
          (completedSessions.reduce((sum, session) => sum + select(session), 0) /
            sessionCount) *
            100
        ) / 100;

  const activityCounts = completedSessions.reduce<Record<string, number>>(
    (counts, session) => {
      counts[session.gameId] = (counts[session.gameId] ?? 0) + 1;
      return counts;
    },
    {}
  );
  const preferredActivities = Object.entries(activityCounts)
    .sort(([, firstCount], [, secondCount]) => secondCount - firstCount)
    .map(([activityId]) => activityId);
  const currentStreakDays = calculateCurrentStreak(recentSessions, now);

  return {
    preferredActivities,
    completedSessions: sessionCount,
    averageGameScore: average((session) => session.score),
    averageMistakes: average((session) => session.mistakes),
    averageCompletionTimeSeconds: average((session) => session.durationSeconds),
    recentActivityCount: recentSessions.length,
    currentStreakDays,
    engagementLevel: getEngagementLevel(recentSessions, currentStreakDays),
  };
};

const getDifficultyStep = (difficulty: GameDifficulty): number =>
  difficulty === 'easy' ? 0 : difficulty === 'medium' ? 1 : 2;

const getDifficultyFromStep = (step: number): GameDifficulty =>
  step <= 0 ? 'easy' : step === 1 ? 'medium' : 'hard';

export const recommendDifficulty = (
  sessions: GameSession[],
  now: Date = new Date()
): DifficultyRecommendation => {
  const profile = analyzeGameSessions(sessions, now);
  const latestSession = sessions.find((session) => session.completed);

  if (!latestSession || profile.recentActivityCount === 0) {
    return {
      difficulty: 'easy',
      explanation: latestSession
        ? 'You have had a short break from activities, so an easy session is a comfortable way to begin again.'
        : 'Start with an easy activity and we will personalize future activities from your game sessions.',
    };
  }

  const completionRate = latestSession.totalPairs > 0
    ? latestSession.pairsCompleted / latestSession.totalPairs
    : 0;
  const strongPerformance =
    completionRate >= 0.85 &&
    profile.averageGameScore >= 80 &&
    profile.averageMistakes <= 2;
  const needsMoreSupport =
    completionRate < 0.6 || profile.averageMistakes >= 5;
  const currentStep = getDifficultyStep(latestSession.difficulty);

  if (strongPerformance) {
    const difficulty = getDifficultyFromStep(currentStep + 1);
    return {
      difficulty,
      explanation: `You completed your recent activity with few mistakes. ${difficulty === latestSession.difficulty ? 'Let’s continue at this level.' : 'A small step up may be a nice next challenge.'}`,
    };
  }

  if (needsMoreSupport) {
    const difficulty = getDifficultyFromStep(currentStep - 1);
    return {
      difficulty,
      explanation: 'A gentler difficulty can keep the next activity comfortable while you build confidence.',
    };
  }

  return {
    difficulty: latestSession.difficulty,
    explanation: 'Your recent game performance is steady, so we will keep the same difficulty for a familiar experience.',
  };
};

export const recommendActivity = (
  sessions: GameSession[],
  now: Date = new Date()
): ActivityRecommendation => {
  const difficultyRecommendation = recommendDifficulty(sessions, now);
  const explanation = sessions.some((session) => session.completed)
    ? `Recommended because ${difficultyRecommendation.explanation.charAt(0).toLowerCase()}${difficultyRecommendation.explanation.slice(1)}`
    : 'Start with a short activity and we will personalize future activities based on how you use SMRITI AI.';

  return {
    activityId: AVAILABLE_ACTIVITY.id,
    activityName: AVAILABLE_ACTIVITY.name,
    difficulty: difficultyRecommendation.difficulty,
    explanation,
  };
};

export const getPersonalizationProfile = (): PersonalizationProfile =>
  analyzeGameSessions(getGameSessions());

export const getActivityRecommendation = (): ActivityRecommendation =>
  recommendActivity(getGameSessions());