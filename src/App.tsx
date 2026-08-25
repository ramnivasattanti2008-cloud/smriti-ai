import { useState } from 'react';
import { Play, Mic, Sparkles } from 'lucide-react';
import {
  Button,
  Card,
  DashboardHeader,
  ActivityCard,
  MemoryCard,
  ReminderItem,
  ProgressCard,
  BottomNavigation,
  Modal,
  type NavTab,
} from './components';
import { ActivitiesPage } from './pages';
import { MemoryMatch } from './games';
import {
  MOCK_USER,
  MOCK_ACTIVITIES,
  MOCK_MEMORIES,
  MOCK_REMINDERS,
  MOCK_PROGRESS,
  type ReminderData,
} from './data/mockData';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [reminders, setReminders] = useState<ReminderData[]>(MOCK_REMINDERS);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const handleToggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const handleStartActivity = (activityId: string) => {
    if (activityId === 'memory-match') {
      setIsPlayingGame(true);
    } else {
      alert('This activity is coming soon!');
    }
  };

  // Render Memory Match Game if active
  if (isPlayingGame) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans select-none pb-24">
        <MemoryMatch
          onBackToDashboard={() => setIsPlayingGame(false)}
        />
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={(tab) => {
            setIsPlayingGame(false);
            setActiveTab(tab);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-24 select-none">
      {/* Tab View 1: HOME DASHBOARD */}
      {activeTab === 'home' && (
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-150">
          {/* Header */}
          <DashboardHeader
            userName={MOCK_USER.name}
            greeting={MOCK_USER.greeting}
            supportiveMessage={MOCK_USER.supportiveMessage}
            onNotificationClick={() => alert('Notifications clicked')}
            onProfileClick={() => setActiveTab('profile')}
          />

          {/* Hero Action Card */}
          <section aria-label="Main Cognitive Activity Call to Action">
            <div className="bg-gradient-to-r from-teal-900/90 via-slate-800 to-indigo-950/90 border border-teal-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-300 bg-teal-950/80 border border-teal-700/80 rounded-full">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Recommended Morning Activity
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                    Ready for a quick brain activity?
                  </h2>
                  <p className="text-base sm:text-lg text-slate-200 font-medium">
                    A gentle 5-minute memory game designed for your enjoyment.
                  </p>
                </div>

                <div className="shrink-0">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<Play className="w-7 h-7 fill-white" />}
                    onClick={() => handleStartActivity('memory-match')}
                    className="shadow-xl text-lg px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold border-2 border-teal-300"
                  >
                    Start Activity
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Today's Activities Overview */}
          <section className="space-y-4" aria-labelledby="today-activities-heading">
            <div className="flex items-center justify-between">
              <h2
                id="today-activities-heading"
                className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight"
              >
                Today&apos;s Activities
              </h2>
              <button
                onClick={() => setActiveTab('activities')}
                className="text-sm font-bold text-teal-400 hover:underline min-h-[44px] px-2 flex items-center"
              >
                View All &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {MOCK_ACTIVITIES.map((act) => (
                <ActivityCard
                  key={act.id}
                  title={act.title}
                  duration={act.duration}
                  category={act.category}
                  iconName={act.iconName}
                  completed={act.completed}
                  onClick={() => handleStartActivity(act.id === 'act-1' ? 'memory-match' : act.id)}
                />
              ))}
            </div>
          </section>

          {/* Memories Section */}
          <section className="space-y-4" aria-labelledby="memories-heading">
            <div className="flex items-center justify-between">
              <h2
                id="memories-heading"
                className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight"
              >
                Your Memories
              </h2>
              <button
                onClick={() => setActiveTab('memories')}
                className="text-sm font-bold text-teal-400 hover:underline min-h-[44px] px-2 flex items-center"
              >
                View All &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_MEMORIES.map((mem) => (
                <MemoryCard
                  key={mem.id}
                  title={mem.title}
                  description={mem.description}
                  date={mem.date}
                  bgGradient={mem.bgGradient}
                  iconName={mem.iconName}
                  onClick={() => alert(`Opening memory: ${mem.title}`)}
                />
              ))}
            </div>
          </section>

          {/* Reminders & Progress Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Reminders Column */}
            <section className="space-y-4" aria-labelledby="reminders-heading">
              <div className="flex items-center justify-between">
                <h2
                  id="reminders-heading"
                  className="text-2xl font-bold text-slate-50 tracking-tight"
                >
                  Today&apos;s Reminders
                </h2>
                <span className="text-xs font-semibold text-slate-400">
                  Tap to complete
                </span>
              </div>

              <div className="space-y-3">
                {reminders.map((rem) => (
                  <ReminderItem
                    key={rem.id}
                    title={rem.title}
                    time={rem.time}
                    category={rem.category}
                    completed={rem.completed}
                    onToggle={() => handleToggleReminder(rem.id)}
                  />
                ))}
              </div>
            </section>

            {/* Progress Column */}
            <section className="space-y-4" aria-labelledby="progress-heading">
              <div className="flex items-center justify-between">
                <h2
                  id="progress-heading"
                  className="text-2xl font-bold text-slate-50 tracking-tight"
                >
                  Activity Summary
                </h2>
              </div>
              <ProgressCard progress={MOCK_PROGRESS} />
            </section>
          </div>

          {/* Voice Assistant Focal Section */}
          <section aria-label="Voice Assistant Help">
            <Card className="bg-slate-800/80 border-slate-700 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="p-4 bg-teal-950 border border-teal-700 text-teal-400 rounded-2xl shrink-0 mx-auto sm:mx-0">
                  <Mic className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-50">
                    Need Help or Have a Question?
                  </h3>
                  <p className="text-base text-slate-300 mt-1">
                    Tap to speak with your SMRITI AI Companion anytime.
                  </p>
                </div>
              </div>
              <Button
                variant="secondary"
                size="lg"
                leftIcon={<Mic className="w-6 h-6 text-teal-400" />}
                onClick={() => setIsHelpModalOpen(true)}
                className="shrink-0 w-full sm:w-auto"
              >
                Need Help?
              </Button>
            </Card>
          </section>
        </div>
      )}

      {/* Tab View 2: ACTIVITIES HUB */}
      {activeTab === 'activities' && (
        <div className="animate-in fade-in duration-150">
          <ActivitiesPage
            onStartActivity={(activityId) => handleStartActivity(activityId)}
          />
        </div>
      )}

      {/* Tab View 3: MEMORIES */}
      {activeTab === 'memories' && (
        <div className="max-w-5xl mx-auto p-6 lg:p-8 space-y-6 animate-in fade-in duration-150">
          <h1 className="text-3xl font-extrabold text-white">Your Memories</h1>
          <p className="text-slate-300">
            A collection of cherished photos and moments shared with your family.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_MEMORIES.map((mem) => (
              <MemoryCard
                key={mem.id}
                title={mem.title}
                description={mem.description}
                date={mem.date}
                bgGradient={mem.bgGradient}
                iconName={mem.iconName}
                onClick={() => alert(`Opening memory: ${mem.title}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tab View 4: REMINDERS */}
      {activeTab === 'reminders' && (
        <div className="max-w-4xl mx-auto p-6 lg:p-8 space-y-6 animate-in fade-in duration-150">
          <h1 className="text-3xl font-extrabold text-white">Today&apos;s Reminders</h1>
          <p className="text-slate-300">
            Check your schedule for water, family calls, and daily activities.
          </p>
          <div className="space-y-3">
            {reminders.map((rem) => (
              <ReminderItem
                key={rem.id}
                title={rem.title}
                time={rem.time}
                category={rem.category}
                completed={rem.completed}
                onToggle={() => handleToggleReminder(rem.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tab View 5: PROFILE */}
      {activeTab === 'profile' && (
        <div className="max-w-3xl mx-auto p-6 lg:p-8 space-y-6 text-center animate-in fade-in duration-150">
          <div className="w-24 h-24 bg-teal-950 border-2 border-teal-500 rounded-full flex items-center justify-center mx-auto text-teal-300 text-3xl font-bold">
            R
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white">Ravi Kumar</h1>
            <p className="text-slate-300 mt-1">Elder Account &bull; SMRITI AI</p>
          </div>
          <Card className="text-left p-6 space-y-4">
            <h3 className="text-xl font-bold text-slate-100">Preferences</h3>
            <p className="text-base text-slate-300">
              High contrast: Enabled &bull; Text size: Large &bull; Language: English
            </p>
          </Card>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* Voice Assistant Companion Modal */}
      <Modal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        title="Voice Assistant Companion"
        description="SMRITI AI Voice Assistance"
        footer={
          <Button variant="primary" onClick={() => setIsHelpModalOpen(false)}>
            Close
          </Button>
        }
      >
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-teal-950 border border-teal-700 rounded-full flex items-center justify-center mx-auto text-teal-400 animate-pulse">
            <Mic className="w-8 h-8" />
          </div>
          <p className="text-lg font-bold text-slate-100">
            &ldquo;Hello Ravi! How can I help you today?&rdquo;
          </p>
          <p className="text-sm text-slate-400">
            Voice Assistant feature will be connected in Milestone 10.
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default App;
