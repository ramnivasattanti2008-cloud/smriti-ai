import React from 'react';
import { Award, Flame, TrendingUp } from 'lucide-react';
import type { UserProgress } from '../data/mockData';

export interface ProgressCardProps {
  progress: UserProgress;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ progress }) => {
  return (
    <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-lg text-slate-100 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-50">Your Progress</h3>
          <p className="text-sm text-slate-300">Activity & Engagement Summary</p>
        </div>
        <div className="p-2.5 bg-teal-950/80 border border-teal-800 text-teal-400 rounded-xl">
          <Award className="w-6 h-6" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Completed Activities */}
        <div className="p-4 bg-slate-900/80 border border-slate-700/80 rounded-xl text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">
            {progress.activitiesCompletedToday} / {progress.totalActivitiesToday}
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-300 mt-1">
            Activities Done Today
          </p>
        </div>

        {/* Day Streak */}
        <div className="p-4 bg-slate-900/80 border border-slate-700/80 rounded-xl text-center">
          <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl font-extrabold text-amber-400">
            <Flame className="w-7 h-7 text-amber-500 fill-amber-500/20" />
            <span>{progress.currentStreakDays} Days</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-300 mt-1">
            Active Day Streak
          </p>
        </div>

        {/* Weekly Engagement */}
        <div className="p-4 bg-slate-900/80 border border-slate-700/80 rounded-xl text-center">
          <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-extrabold text-indigo-400">
            <TrendingUp className="w-7 h-7 text-indigo-400" />
            <span>{progress.weeklyEngagementPercent}%</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-300 mt-1">
            Weekly Engagement
          </p>
        </div>
      </div>
    </div>
  );
};
