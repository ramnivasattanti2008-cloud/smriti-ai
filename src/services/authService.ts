import type { UserRole } from '../types';

export interface DemoSession {
  role: UserRole;
  name: string;
}

const AUTH_STORAGE_KEY = 'smriti_ai_demo_session';

export const getStoredSession = (): DemoSession | null => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as DemoSession;
    if (!session.name || !['elder', 'caregiver', 'health_worker'].includes(session.role)) return null;
    return session;
  } catch {
    return null;
  }
};

export const saveDemoSession = (session: DemoSession): void => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Demo mode remains usable when browser storage is unavailable.
  }
};

export const clearDemoSession = (): void => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // Sign-out still clears the in-memory session.
  }
};
