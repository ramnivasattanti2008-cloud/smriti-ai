import React, { useState } from 'react';
import {
  Activity,
  Bell,
  Brain,
  ChevronRight,
  Heart,
  LogOut,
  MapPin,
  Mic,
  Music2,
  Pill,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';

type DashboardTab = 'today' | 'memories' | 'ai';

export interface PatientDashboardProps {
  userName: string;
  onSignOut: () => void;
}

const activities = [
  { label: 'Wellness', icon: Heart, color: 'text-rose-300' },
  { label: 'Ayurveda', icon: Sparkles, color: 'text-amber-300' },
  { label: 'Medication reminders', icon: Pill, color: 'text-teal-300' },
  { label: 'Notes', icon: Activity, color: 'text-sky-300' },
  { label: 'Family', icon: Users, color: 'text-violet-300' },
  { label: 'Location', icon: MapPin, color: 'text-emerald-300' },
  { label: 'Safety', icon: ShieldCheck, color: 'text-orange-300' },
  { label: 'Voice', icon: Mic, color: 'text-cyan-300' },
  { label: 'Music', icon: Music2, color: 'text-fuchsia-300' },
  { label: 'Stories', icon: Brain, color: 'text-indigo-300' },
];

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ userName, onSignOut }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('today');

  return (
    <main className="app-shell min-h-screen bg-[#071c1f] px-5 py-6 pb-10 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-3 text-teal-200">
              <div className="rounded-xl border border-teal-300/20 bg-teal-950/70 p-2"><Heart className="h-6 w-6" aria-hidden="true" /></div>
              <span className="text-sm font-black tracking-[0.18em]">SMRITI AI / MY SPACE</span>
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-300">Wednesday, August 26</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">Good morning, {userName}.</h1>
            <p className="mt-2 text-lg text-slate-300">Let&apos;s make today a good day.</p>
          </div>
          <Button variant="secondary" onClick={onSignOut} leftIcon={<LogOut className="h-4 w-4" />}>Sign out</Button>
        </header>

        <nav className="flex gap-2 border-b border-white/10 pb-2" aria-label="Main dashboard">
          {([['today', 'Today'], ['memories', 'Memories'], ['ai', 'AI Companion']] as const).map(([tab, label]) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`min-h-[44px] rounded-xl px-5 text-sm font-bold transition-colors ${activeTab === tab ? 'bg-teal-500 text-slate-950' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
              aria-current={activeTab === tab ? 'page' : undefined}
            >
              {label}
            </button>
          ))}
        </nav>

        {activeTab === 'today' && (
          <>
            <section className="grid gap-5 md:grid-cols-3" aria-label="Today overview">
              <Card className="border-teal-400/20 bg-teal-950/50 p-5"><Bell className="h-6 w-6 text-amber-300" aria-hidden="true" /><p className="mt-7 text-sm font-bold text-slate-300">Next reminder</p><p className="mt-1 text-2xl font-black text-white">Drink water</p><p className="mt-1 text-sm text-slate-400">10:30 AM</p></Card>
              <Card className="p-5"><Activity className="h-6 w-6 text-teal-300" aria-hidden="true" /><p className="mt-7 text-sm font-bold text-slate-300">Today&apos;s progress</p><p className="mt-1 text-2xl font-black text-white">1 activity</p><p className="mt-1 text-sm text-slate-400">A gentle start</p></Card>
              <Card className="p-5"><Users className="h-6 w-6 text-rose-300" aria-hidden="true" /><p className="mt-7 text-sm font-bold text-slate-300">Family</p><p className="mt-1 text-2xl font-black text-white">All is well</p><p className="mt-1 text-sm text-slate-400">No new messages</p></Card>
            </section>
            <section>
              <div className="mb-4 flex items-end justify-between gap-4"><div><h2 className="text-2xl font-black text-white">Choose something for today</h2><p className="mt-1 text-slate-400">Small moments that help you feel well and connected.</p></div><span className="hidden text-sm font-bold text-teal-300 sm:block">10 activities</span></div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {activities.map(({ label, icon: Icon, color }) => <button key={label} type="button" className="group flex min-h-[116px] flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-left transition-all hover:-translate-y-1 hover:border-teal-400/50 hover:bg-slate-800"><Icon className={`h-7 w-7 ${color}`} aria-hidden="true" /><span className="flex items-center justify-between gap-2 text-sm font-bold text-slate-200">{label}<ChevronRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span></button>)}
              </div>
            </section>
          </>
        )}

        {activeTab === 'memories' && <Card className="p-8 sm:p-12"><div className="mx-auto max-w-xl text-center"><Heart className="mx-auto h-12 w-12 text-rose-300" aria-hidden="true" /><h2 className="mt-5 text-3xl font-black text-white">Your memories are close</h2><p className="mt-3 text-lg leading-relaxed text-slate-300">Open the Memories space to revisit family moments, photos, and stories.</p><Button className="mt-7" leftIcon={<ChevronRight className="h-5 w-5" />}>Open memories</Button></div></Card>}
        {activeTab === 'ai' && <Card className="border-indigo-300/20 bg-indigo-950/40 p-8 sm:p-12"><div className="mx-auto max-w-2xl text-center"><Sparkles className="mx-auto h-12 w-12 text-amber-300" aria-hidden="true" /><h2 className="mt-5 text-3xl font-black text-white">Your AI Companion</h2><p className="mt-3 text-lg leading-relaxed text-slate-300">I&apos;m here to help with reminders, activities, stories, and a friendly conversation whenever you need one.</p><Button className="mt-7" leftIcon={<Mic className="h-5 w-5" />}>Talk to SMRITI</Button></div></Card>}
      </div>
    </main>
  );
};
