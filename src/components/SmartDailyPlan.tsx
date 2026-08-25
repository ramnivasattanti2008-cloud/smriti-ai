import React, { useState } from 'react';
import { Sun, CloudSun, Moon, Sparkles, CheckCircle2, Play, Info } from 'lucide-react';
import { Button, Badge, Modal } from './';
import { getPersonalizationAnalysis } from '../services/adaptiveEngine';
import type { GameDifficulty } from '../types';

export interface SmartDailyPlanProps {
  onStartActivity: (activityId: string, difficulty?: GameDifficulty) => void;
}

export const SmartDailyPlan: React.FC<SmartDailyPlanProps> = ({
  onStartActivity,
}) => {
  const analysis = getPersonalizationAnalysis();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const getPlanIcon = (timeOfDay: string) => {
    switch (timeOfDay) {
      case 'Morning':
        return <Sun className="w-6 h-6 text-amber-400" />;
      case 'Afternoon':
        return <CloudSun className="w-6 h-6 text-sky-400" />;
      case 'Evening':
      default:
        return <Moon className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-950/80 border border-teal-700 text-teal-400 rounded-2xl shrink-0">
            <Sparkles className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-extrabold text-slate-50">
                Today&apos;s Smart Plan
              </h3>
              <Badge variant="info">AI Personalization</Badge>
            </div>
            <p className="text-sm text-slate-300 font-medium mt-0.5">
              Personalized for Ravi &bull; {analysis.streakDays}-Day Activity Streak
            </p>
          </div>
        </div>
      </div>

      {/* Daily Plan Schedule Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {analysis.smartDailyPlan.map((item) => (
          <div
            key={item.timeOfDay}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
              item.completed
                ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                : 'bg-slate-900/90 border-slate-700 text-slate-100 hover:border-slate-600'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-400 uppercase tracking-wider">
                  {getPlanIcon(item.timeOfDay)}
                  <span>{item.timeOfDay}</span>
                </div>
                {item.completed && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Done
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-50">{item.activityTitle}</h4>
                <p className="text-xs font-semibold text-teal-400 mt-1">
                  {item.duration} &bull; {item.difficulty.toUpperCase()}
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {item.reason}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedReason(item.reason)}
                className="text-xs font-semibold text-slate-400 hover:text-teal-300 flex items-center gap-1 min-h-[36px]"
              >
                <Info className="w-3.5 h-3.5" />
                Why this?
              </button>

              <Button
                variant={item.completed ? 'secondary' : 'primary'}
                size="md"
                leftIcon={<Play className="w-4 h-4 fill-white" />}
                onClick={() => onStartActivity(item.activityId, item.difficulty)}
              >
                {item.completed ? 'Replay' : 'Start'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Personalization Insight Modal */}
      {selectedReason && (
        <Modal
          isOpen={Boolean(selectedReason)}
          onClose={() => setSelectedReason(null)}
          title="Personalization Logic"
          description="SMRITI AI Personalization Engine"
          footer={
            <Button variant="primary" onClick={() => setSelectedReason(null)}>
              Got it
            </Button>
          }
        >
          <div className="space-y-3 text-slate-200">
            <p className="text-base leading-relaxed">{selectedReason}</p>
            <p className="text-xs text-slate-400 border-t border-slate-700/80 pt-3">
              Note: Activity recommendations are calculated strictly from gameplay response signals to keep your experience enjoyable and non-frustrating.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};
