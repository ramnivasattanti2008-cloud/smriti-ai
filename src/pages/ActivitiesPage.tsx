import React, { useState } from 'react';
import { Brain, Target, Sparkles, Clock, Play, Lock } from 'lucide-react';
import { Button, Card, Badge } from '../components';
import {
  ACTIVITIES_HUB_DATA,
  type ActivityCategory,
  type ActivityDefinition,
} from '../data/mockData';

export interface ActivitiesPageProps {
  onStartActivity: (activityId: string) => void;
}

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({
  onStartActivity,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>('All');

  const categories: ActivityCategory[] = ['All', 'Memory', 'Focus', 'Patterns'];

  const filteredActivities =
    selectedCategory === 'All'
      ? ACTIVITIES_HUB_DATA
      : ACTIVITIES_HUB_DATA.filter((act) => act.category === selectedCategory);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'brain':
        return <Brain className="w-8 h-8 text-teal-400" />;
      case 'target':
        return <Target className="w-8 h-8 text-sky-400" />;
      case 'sparkles':
        return <Sparkles className="w-8 h-8 text-amber-400" />;
      default:
        return <Brain className="w-8 h-8 text-teal-400" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 text-slate-100 font-sans pb-24">
      {/* Header */}
      <header className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Activities
        </h1>
        <p className="text-lg text-slate-300 font-medium mt-1">
          Choose an activity you&apos;d like to try.
        </p>
      </header>

      {/* Featured Activity Card */}
      <section aria-label="Featured Activity of the Day">
        <div className="bg-gradient-to-r from-teal-900/90 via-slate-800 to-indigo-950/90 border border-teal-500/40 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-300 bg-teal-950/80 border border-teal-700/80 rounded-full">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Today&apos;s Featured Activity
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Memory Match
            </h2>
            <p className="text-base sm:text-lg text-slate-200 font-medium">
              Ready for a quick activity? Find matching pairs and test your memory.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Play className="w-6 h-6 fill-white" />}
              onClick={() => onStartActivity('memory-match')}
              className="shadow-xl text-lg px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold border-2 border-teal-300"
            >
              Start Activity
            </Button>
          </div>
        </div>
      </section>

      {/* Category Filter Controls */}
      <section className="space-y-4" aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="text-xl font-bold text-slate-200">
          Filter by Category
        </h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[44px] px-6 py-2.5 rounded-xl font-bold text-base transition-all select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-400 ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-950/40 border border-teal-500'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-750 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Activities Grid */}
      <section className="space-y-4" aria-label="Available Activities List">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act: ActivityDefinition) => {
            const isAvailable = act.status === 'available';
            return (
              <Card
                key={act.id}
                className={`flex flex-col justify-between p-6 h-full ${
                  !isAvailable ? 'opacity-85 border-slate-700/60 bg-slate-800/60' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-3 bg-slate-900/90 border border-slate-700 rounded-xl shrink-0">
                      {renderIcon(act.iconName)}
                    </div>
                    {isAvailable ? (
                      <Badge variant="success">Available</Badge>
                    ) : (
                      <Badge variant="neutral" icon={<Lock className="w-3.5 h-3.5" />}>
                        Coming Soon
                      </Badge>
                    )}
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                      {act.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-50 mt-0.5">
                      {act.title}
                    </h3>
                    <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/60 space-y-4">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-sky-400" />
                      {act.duration}
                    </span>
                    <span>{act.difficultyLabel}</span>
                  </div>

                  {isAvailable ? (
                    <Button
                      variant="primary"
                      fullWidth
                      leftIcon={<Play className="w-5 h-5 fill-white" />}
                      onClick={() => onStartActivity(act.id)}
                    >
                      Start Activity
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      fullWidth
                      disabled
                      leftIcon={<Lock className="w-4 h-4 text-slate-500" />}
                    >
                      Coming Soon
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};
