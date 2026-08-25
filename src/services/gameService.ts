import type { GameSession } from '../types';

const STORAGE_KEY = 'smriti_ai_game_sessions';

export const saveGameSession = (session: GameSession): void => {
  try {
    const existing = getGameSessions();
    const updated = [session, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save game session to localStorage:', error);
  }
};

export const getGameSessions = (): GameSession[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as GameSession[];
  } catch (error) {
    console.error('Failed to fetch game sessions from localStorage:', error);
    return [];
  }
};

export const getLatestGameSession = (): GameSession | null => {
  const sessions = getGameSessions();
  return sessions.length > 0 ? sessions[0] : null;
};
