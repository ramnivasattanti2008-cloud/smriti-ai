import React from 'react';
import { Sparkles, TrendingUp, Target, Play } from 'lucide-react';
import { Button, Badge } from './';
import { getAdaptiveRecommendation } from '../services/adaptiveEngine';

export interface AdaptiveWidgetProps {
  onStartRecommended: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

export const AdaptiveWidget: React.FC<AdaptiveWidgetProps> = ({
  onStartRecommended,
}) => {
  const rec = getAdaptiveRecommendation();

  return (
    <div className="bg-gradient-to-r from-teal-950/90 via-slate-800 to-indigo-950/90 border border-teal-500/50 rounded-2xl p-6 sm:p-8 shadow-xl text-slate-100 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-800/60 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-teal-900/80 text-teal-300 rounded-xl border border-teal-700">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-50">
              Personalized Activity Insight
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Smart recommendation based on your recent activity engagement
            </p>
          </div>
        </div>
        <Badge variant="info">Adaptive Engine</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-teal-300">
            <Target className="w-4 h-4" />
            Recommended Difficulty: <span className="uppercase text-amber-300 font-extrabold">{rec.recommendedDifficulty}</span>
          </div>
          <p className="text-base text-slate-200 font-medium leading-relaxed">
            {rec.reason}
          </p>
          <p className="text-xs sm:text-sm text-slate-400 italic">
            &ldquo;{rec.engagementTip}&rdquo;
          </p>
        </div>

        <div className="flex flex-col justify-between p-4 bg-slate-900/80 border border-slate-700/80 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Accuracy Trend</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              {rec.accuracyPercent}%
            </span>
          </div>
          <Button
            variant="primary"
            size="md"
            leftIcon={<Play className="w-5 h-5 fill-white" />}
            onClick={() => onStartRecommended(rec.recommendedDifficulty)}
            className="w-full"
          >
            Start ({rec.recommendedDifficulty.toUpperCase()})
          </Button>
        </div>
      </div>
    </div>
  );
};
