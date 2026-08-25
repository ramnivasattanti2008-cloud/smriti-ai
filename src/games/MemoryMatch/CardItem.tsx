import React from 'react';
import {
  Sun,
  Heart,
  Star,
  Flower2,
  Apple,
  Bell,
  Smile,
  Coffee,
  HelpCircle,
} from 'lucide-react';
import type { GameCard } from '../../types';

export interface CardItemProps {
  card: GameCard;
  index: number;
  onClick: () => void;
  disabled?: boolean;
}

export const CardItem: React.FC<CardItemProps> = ({
  card,
  index,
  onClick,
  disabled = false,
}) => {
  const renderSymbol = (symbolName: string) => {
    switch (symbolName) {
      case 'sun':
        return <Sun className="w-10 h-10 text-amber-400" />;
      case 'heart':
        return <Heart className="w-10 h-10 text-rose-400" />;
      case 'star':
        return <Star className="w-10 h-10 text-yellow-300" />;
      case 'flower':
        return <Flower2 className="w-10 h-10 text-emerald-400" />;
      case 'apple':
        return <Apple className="w-10 h-10 text-red-400" />;
      case 'bell':
        return <Bell className="w-10 h-10 text-sky-400" />;
      case 'smile':
        return <Smile className="w-10 h-10 text-teal-300" />;
      case 'coffee':
        return <Coffee className="w-10 h-10 text-orange-400" />;
      default:
        return <HelpCircle className="w-10 h-10 text-slate-400" />;
    }
  };

  const isVisible = card.flipped || card.matched;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isVisible}
      aria-label={`Card ${index + 1}: ${
        isVisible ? `${card.symbolName} symbol` : 'Face down'
      }${card.matched ? ', matched' : ''}`}
      className={`w-full aspect-square min-h-[96px] sm:min-h-[110px] rounded-2xl border-2 transition-all duration-200 flex items-center justify-center select-none shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-400 ${
        card.matched
          ? 'bg-emerald-950/80 border-emerald-500/80 shadow-emerald-950/40 scale-[0.98]'
          : card.flipped
          ? 'bg-slate-800 border-teal-400 shadow-teal-950/40 scale-105'
          : 'bg-slate-850 hover:bg-slate-800 border-slate-700 hover:border-slate-500 active:scale-95'
      }`}
    >
      {isVisible ? (
        <div className="p-2 animate-in zoom-in-75 duration-150">
          {renderSymbol(card.symbolName)}
        </div>
      ) : (
        <div className="text-slate-600 flex items-center justify-center">
          <HelpCircle className="w-8 h-8 opacity-40" />
        </div>
      )}
    </button>
  );
};
