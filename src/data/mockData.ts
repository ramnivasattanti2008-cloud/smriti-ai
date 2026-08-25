export interface ActivityItem {
  id: string;
  title: string;
  duration: string;
  category: string;
  iconName: 'brain' | 'target' | 'cloud' | 'droplet';
  completed?: boolean;
}

export type ActivityCategory = 'All' | 'Memory' | 'Focus' | 'Patterns';

export interface ActivityDefinition {
  id: string;
  title: string;
  description: string;
  category: 'Memory' | 'Focus' | 'Patterns';
  duration: string;
  difficultyLabel: string;
  status: 'available' | 'coming_soon';
  iconName: 'brain' | 'target' | 'sparkles';
}

export interface MemoryItem {
  id: string;
  title: string;
  description: string;
  date: string;
  bgGradient: string;
  iconName: 'heart' | 'users' | 'sun';
}

export interface ReminderData {
  id: string;
  title: string;
  time: string;
  category: 'medication' | 'water' | 'family' | 'activity';
  completed: boolean;
}

export interface UserProgress {
  activitiesCompletedToday: number;
  totalActivitiesToday: number;
  currentStreakDays: number;
  weeklyEngagementPercent: number;
}

export const MOCK_USER = {
  name: 'Ravi',
  greeting: 'Good morning, Ravi',
  supportiveMessage: "Let's have a calm and meaningful day.",
};

export const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Memory Match',
    duration: '5 minutes',
    category: 'Cognitive',
    iconName: 'brain',
    completed: true,
  },
  {
    id: 'act-2',
    title: 'Focus Finder',
    duration: '3 minutes',
    category: 'Attention',
    iconName: 'target',
    completed: false,
  },
  {
    id: 'act-3',
    title: 'Pattern Recall',
    duration: '5 minutes',
    category: 'Patterns',
    iconName: 'cloud',
    completed: false,
  },
  {
    id: 'act-4',
    title: 'Water Reminder',
    duration: 'Next reminder at 10:30 AM',
    category: 'Wellness',
    iconName: 'droplet',
    completed: false,
  },
];

export const ACTIVITIES_HUB_DATA: ActivityDefinition[] = [
  {
    id: 'memory-match',
    title: 'Memory Match',
    description: 'Find matching pairs and complete the activity at your own pace.',
    category: 'Memory',
    duration: '5–10 minutes',
    difficultyLabel: 'Easy • Medium • Hard',
    status: 'available',
    iconName: 'brain',
  },
  {
    id: 'pattern-recall',
    title: 'Pattern Recall',
    description: 'Look at a pattern and try to remember its sequence.',
    category: 'Patterns',
    duration: '3–5 minutes',
    difficultyLabel: 'Planned',
    status: 'coming_soon',
    iconName: 'sparkles',
  },
  {
    id: 'focus-finder',
    title: 'Focus Finder',
    description: 'A simple activity designed to practice attention and observation.',
    category: 'Focus',
    duration: '3–5 minutes',
    difficultyLabel: 'Planned',
    status: 'coming_soon',
    iconName: 'target',
  },
];

export const MOCK_MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    title: 'Family Celebration',
    description: 'Sunday afternoon with family and children.',
    date: 'August 18, 2026',
    bgGradient: 'from-amber-600/30 to-orange-700/40',
    iconName: 'users',
  },
  {
    id: 'mem-2',
    title: 'Old Friends Gathering',
    description: 'A special day reuniting with school friends.',
    date: 'July 24, 2026',
    bgGradient: 'from-indigo-600/30 to-purple-700/40',
    iconName: 'heart',
  },
  {
    id: 'mem-3',
    title: 'Favorite Park Walk',
    description: 'A peaceful sunny walk under the green trees.',
    date: 'June 10, 2026',
    bgGradient: 'from-emerald-600/30 to-teal-700/40',
    iconName: 'sun',
  },
];

export const MOCK_REMINDERS: ReminderData[] = [
  {
    id: 'rem-1',
    title: 'Morning Activity Practice',
    time: '8:30 AM',
    category: 'activity',
    completed: true,
  },
  {
    id: 'rem-2',
    title: 'Drink a Glass of Water',
    time: '10:30 AM',
    category: 'water',
    completed: false,
  },
  {
    id: 'rem-3',
    title: 'Call Family (Ananya)',
    time: '4:00 PM',
    category: 'family',
    completed: false,
  },
  {
    id: 'rem-4',
    title: 'Evening Relaxing Game',
    time: '7:00 PM',
    category: 'activity',
    completed: false,
  },
];

export const MOCK_PROGRESS: UserProgress = {
  activitiesCompletedToday: 2,
  totalActivitiesToday: 4,
  currentStreakDays: 5,
  weeklyEngagementPercent: 85,
};
