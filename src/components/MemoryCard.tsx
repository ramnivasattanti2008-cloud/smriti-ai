import React from 'react';
import { Heart, Users, Sun, Calendar } from 'lucide-react';

export interface MemoryCardProps {
  title: string;
  description: string;
  date: string;
  bgGradient: string;
  iconName: 'heart' | 'users' | 'sun';
  onClick?: () => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  title,
  description,
  date,
  bgGradient,
  iconName,
  onClick,
}) => {
  const renderIcon = () => {
    switch (iconName) {
      case 'heart':
        return <Heart className="w-10 h-10 text-rose-300" />;
      case 'users':
        return <Users className="w-10 h-10 text-amber-300" />;
      case 'sun':
        return <Sun className="w-10 h-10 text-emerald-300" />;
      default:
        return <Heart className="w-10 h-10 text-teal-300" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-slate-800/90 border border-slate-700/80 rounded-2xl overflow-hidden shadow-lg transition-all duration-150 flex flex-col ${
        onClick
          ? 'cursor-pointer hover:border-slate-500 hover:scale-[1.01] active:scale-[0.99]'
          : ''
      }`}
    >
      {/* Visual Placeholder Art Box */}
      <div
        className={`h-40 w-full bg-gradient-to-br ${bgGradient} border-b border-slate-700/60 flex items-center justify-center p-6 relative`}
      >
        <div className="p-4 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-inner">
          {renderIcon()}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-xl font-bold text-slate-50">{title}</h3>
          <p className="text-base text-slate-300 mt-1 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 pt-2 border-t border-slate-700/60">
          <Calendar className="w-4 h-4 text-teal-400" />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};
