import React from 'react';
import { Brain, Target, Cloud, Droplet, CheckCircle2 } from 'lucide-react';

export interface ActivityCardProps {
  title: string;
  duration: string;
  category: string;
  iconName: 'brain' | 'target' | 'cloud' | 'droplet';
  completed?: boolean;
  onClick?: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  duration,
  category,
  iconName,
  completed = false,
  onClick,
}) => {
  const getIcon = () => {
    switch (iconName) {
      case 'brain':
        return <Brain className="w-7 h-7 text-indigo-400" />;
      case 'target':
        return <Target className="w-7 h-7 text-emerald-400" />;
      case 'cloud':
        return <Cloud className="w-7 h-7 text-amber-400" />;
      case 'droplet':
        return <Droplet className="w-7 h-7 text-sky-400" />;
      default:
        return <Brain className="w-7 h-7 text-teal-400" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-md transition-all duration-150 flex items-center justify-between gap-4 ${
        onClick
          ? 'cursor-pointer hover:border-slate-500 hover:bg-slate-800 active:scale-[0.99] focus-within:ring-4 focus-within:ring-teal-400'
          : ''
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-900/90 border border-slate-700 rounded-xl shrink-0">
          {getIcon()}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
              {category}
            </span>
            {completed && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800/80">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Done
              </span>
            )}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-100 mt-0.5">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-slate-300 font-medium mt-0.5">
            {duration}
          </p>
        </div>
      </div>
    </div>
  );
};
