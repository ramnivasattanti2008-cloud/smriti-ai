import React from 'react';
import { Brain, Bell, User as UserIcon } from 'lucide-react';
import { IconButton } from './IconButton';

export interface DashboardHeaderProps {
  userName: string;
  greeting: string;
  supportiveMessage: string;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  greeting,
  supportiveMessage,
  onNotificationClick,
  onProfileClick,
}) => {
  return (
    <header className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/20 text-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-start gap-4 sm:gap-5">
        <div className="p-3.5 bg-teal-950/80 border border-teal-700/80 text-teal-400 rounded-2xl shrink-0 shadow-lg shadow-teal-950/30">
          <Brain className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-400 bg-teal-950/60 border border-teal-800/60 px-3 py-0.5 rounded-full">
              SMRITI AI
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-50 tracking-tight mt-1.5">
            {greeting}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-medium mt-1 leading-relaxed">
            {supportiveMessage}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
        <IconButton
          icon={<Bell className="w-6 h-6 text-slate-200" />}
          ariaLabel="Notifications"
          variant="secondary"
          size="lg"
          onClick={onNotificationClick}
        />
        <IconButton
          icon={<UserIcon className="w-6 h-6 text-slate-200" />}
          ariaLabel="User Profile"
          variant="secondary"
          size="lg"
          onClick={onProfileClick}
        />
      </div>
    </header>
  );
};
