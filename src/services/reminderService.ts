import type { Reminder } from '../types';
import { MOCK_REMINDERS } from '../data/mockData';

const REMINDER_STORAGE_KEY = 'smriti_ai_reminders';

const DEFAULT_REMINDERS: Reminder[] = MOCK_REMINDERS.map((r) => ({
  id: r.id,
  userId: 'elder-user-1',
  title: r.title,
  time: r.time,
  type: r.category,
  completed: r.completed,
  repeatDaily: true,
}));

export const getReminders = (): Reminder[] => {
  try {
    const raw = localStorage.getItem(REMINDER_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(DEFAULT_REMINDERS));
      return DEFAULT_REMINDERS;
    }
    return JSON.parse(raw) as Reminder[];
  } catch (error) {
    console.error('Failed to get reminders:', error);
    return DEFAULT_REMINDERS;
  }
};

export const toggleReminderStatus = (id: string): Reminder[] => {
  const existing = getReminders();
  const updated = existing.map((r) =>
    r.id === id ? { ...r, completed: !r.completed } : r
  );
  try {
    localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to toggle reminder status:', error);
  }
  return updated;
};

export const addReminder = (
  newRem: Omit<Reminder, 'id' | 'completed'>
): Reminder[] => {
  const existing = getReminders();
  const created: Reminder = {
    ...newRem,
    id: `rem-${Date.now()}`,
    completed: false,
  };
  const updated = [created, ...existing];
  try {
    localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to add reminder:', error);
  }
  return updated;
};
