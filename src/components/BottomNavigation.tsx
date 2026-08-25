import React from 'react';
import { Home, Brain, Heart, Bell, User } from 'lucide-react';

export type NavTab = 'home' | 'activities' | 'memories' | 'reminders' | 'profile';

export interface BottomNavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-6 h-6" /> },
    { id: 'activities', label: 'Activities', icon: <Brain className="w-6 h-6" /> },
    { id: 'memories', label: 'Memories', icon: <Heart className="w-6 h-6" /> },
    { id: 'reminders', label: 'Reminders', icon: <Bell className="w-6 h-6" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-6 h-6" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 py-2 px-4 shadow-2xl">
      <div className="max-w-4xl mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[48px] px-3 py-1.5 rounded-xl transition-all select-none ${
                isActive
                  ? 'text-teal-400 bg-teal-950/60 font-bold'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              {tab.icon}
              <span className="text-xs sm:text-sm mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
