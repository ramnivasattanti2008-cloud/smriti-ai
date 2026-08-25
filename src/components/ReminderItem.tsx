import React from 'react';
import { CheckCircle2, Clock, Phone, Activity, Droplet } from 'lucide-react';

export interface ReminderItemProps {
  title: string;
  time: string;
  category: 'medication' | 'water' | 'family' | 'activity' | 'appointment' | 'meal';
  completed: boolean;
  onToggle?: () => void;
}

export const ReminderItem: React.FC<ReminderItemProps> = ({
  title,
  time,
  category,
  completed,
  onToggle,
}) => {
  const getCategoryIcon = () => {
    switch (category) {
      case 'water':
        return <Droplet className="w-5 h-5 text-sky-400" />;
      case 'family':
        return <Phone className="w-5 h-5 text-indigo-400" />;
      case 'activity':
        return <Activity className="w-5 h-5 text-teal-400" />;
      case 'medication':
      default:
        return <Clock className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div
      onClick={onToggle}
      className={`p-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-4 select-none ${
        completed
          ? 'bg-slate-900/60 border-slate-800 text-slate-400'
          : 'bg-slate-800 border-slate-700 text-slate-100 hover:border-slate-600'
      } ${onToggle ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center gap-3.5">
        <div
          className={`p-2.5 rounded-lg border shrink-0 ${
            completed
              ? 'bg-slate-900 border-slate-800 text-slate-500'
              : 'bg-slate-900/90 border-slate-700'
          }`}
        >
          {getCategoryIcon()}
        </div>
        <div>
          <h4
            className={`text-base sm:text-lg font-bold ${
              completed ? 'line-through text-slate-400' : 'text-slate-100'
            }`}
          >
            {title}
          </h4>
          <span className="text-xs sm:text-sm font-semibold text-teal-400">
            {time}
          </span>
        </div>
      </div>

      <button
        type="button"
        aria-label={completed ? 'Mark reminder incomplete' : 'Mark reminder complete'}
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all ${
          completed
            ? 'bg-emerald-950 border-emerald-700 text-emerald-400'
            : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-teal-400 hover:border-teal-500'
        }`}
      >
        <CheckCircle2 className="w-6 h-6" />
      </button>
    </div>
  );
};
