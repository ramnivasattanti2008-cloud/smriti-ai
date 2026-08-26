import React from 'react';
import { Brain, Play, Sparkles } from 'lucide-react';
import { Badge, Button, Card } from './';
import type { ActivityRecommendation } from '../types';

export interface RecommendationCardProps {
  recommendation: ActivityRecommendation;
  onStartActivity: (
    activityId: string,
    difficulty: ActivityRecommendation['difficulty']
  ) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onStartActivity,
}) => (
  <section aria-label="Recommended activity">
    <Card className="border-teal-500/50 bg-gradient-to-r from-teal-950/90 via-slate-800 to-slate-800/90 p-6 sm:p-8">
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-4">
        <div className="shrink-0 rounded-2xl border border-teal-700 bg-teal-900/80 p-3 text-teal-300">
          <Brain className="h-8 w-8" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-400" aria-hidden="true" />
            <p className="text-sm font-bold uppercase tracking-wide text-teal-300">
              Recommended for you
            </p>
          </div>
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            {recommendation.activityName}
          </h2>
          <Badge variant="info">
            Difficulty: {recommendation.difficulty}
          </Badge>
          <p className="max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            {recommendation.explanation}
          </p>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        leftIcon={<Play className="h-6 w-6 fill-white" aria-hidden="true" />}
        onClick={() =>
          onStartActivity(recommendation.activityId, recommendation.difficulty)
        }
        className="w-full shrink-0 md:w-auto"
      >
        Start Activity
      </Button>
    </div>
    </Card>
  </section>
);