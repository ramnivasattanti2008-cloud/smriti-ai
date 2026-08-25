import React from 'react';
import { Award, Clock, RotateCcw, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button, Card, Badge } from '../../components';
import type { GameResult } from '../../types';

export interface ResultsScreenProps {
  result: GameResult;
  onPlayAgain: () => void;
  onBackToActivities: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  result,
  onPlayAgain,
  onBackToActivities,
}) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 text-slate-100 p-4 sm:p-6 animate-in fade-in duration-200">
      <Card className="text-center p-8 sm:p-10 space-y-6 bg-slate-800/90 border-slate-700 shadow-2xl">
        <div className="w-20 h-20 bg-teal-950/80 border-2 border-teal-500/80 text-teal-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-teal-950/40">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div>
          <Badge variant="success" className="mb-2">
            Activity Completed
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Great Job!
          </h2>
          <p className="text-lg text-slate-300 font-medium mt-2 leading-relaxed">
            Nice work! You completed today&apos;s memory matching activity.
          </p>
        </div>

        {/* Score & Key Metrics */}
        <div className="p-6 bg-slate-900/90 border border-slate-700/80 rounded-2xl space-y-4">
          <div className="text-center">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Total Game Score
            </span>
            <div className="text-4xl sm:text-5xl font-black text-teal-400 mt-1">
              {result.score} pts
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
            <div className="p-3 bg-slate-800/80 rounded-xl">
              <div className="flex items-center justify-center gap-1 text-slate-400 text-xs font-semibold">
                <Clock className="w-4 h-4 text-sky-400" />
                Time
              </div>
              <p className="text-xl font-bold text-slate-100 mt-1">
                {result.durationFormatted}
              </p>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl">
              <div className="text-slate-400 text-xs font-semibold">Moves</div>
              <p className="text-xl font-bold text-slate-100 mt-1">
                {result.moves}
              </p>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl">
              <div className="text-slate-400 text-xs font-semibold">Mistakes</div>
              <p className="text-xl font-bold text-slate-100 mt-1">
                {result.mistakes}
              </p>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl">
              <div className="flex items-center justify-center gap-1 text-slate-400 text-xs font-semibold">
                <Award className="w-4 h-4 text-amber-400" />
                Pairs
              </div>
              <p className="text-xl font-bold text-slate-100 mt-1">
                {result.pairsCompleted}/{result.totalPairs}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button
            variant="primary"
            size="lg"
            leftIcon={<RotateCcw className="w-6 h-6" />}
            onClick={onPlayAgain}
            className="w-full sm:w-auto"
          >
            Play Again
          </Button>

          <Button
            variant="secondary"
            size="lg"
            leftIcon={<ArrowLeft className="w-6 h-6" />}
            onClick={onBackToActivities}
            className="w-full sm:w-auto"
          >
            Back to Activities
          </Button>
        </div>
      </Card>
    </div>
  );
};
