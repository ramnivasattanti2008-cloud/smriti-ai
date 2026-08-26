import React from 'react';
import { Activity, Bell, CalendarDays, ChevronRight, HeartHandshake, MapPin, Users } from 'lucide-react';
import { Button, Card } from './';

export interface CaretakerDashboardProps {
  onSignOut: () => void;
}

export const CaretakerDashboard: React.FC<CaretakerDashboardProps> = ({ onSignOut }) => (
  <main className="app-shell min-h-screen bg-[#071c1f] px-5 py-6 pb-10 text-slate-100 sm:px-8 lg:px-10">
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="flex flex-col gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-3 text-teal-200">
            <div className="rounded-xl border border-teal-300/20 bg-teal-950/70 p-2"><HeartHandshake className="h-6 w-6" aria-hidden="true" /></div>
            <span className="text-sm font-black tracking-[0.18em]">SMRITI AI / CARETAKER</span>
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-300">Wednesday, August 26</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">Good morning, Anitha.</h1>
          <p className="mt-2 text-lg text-slate-300">Here&apos;s a calm view of Ravi&apos;s day.</p>
        </div>
        <Button variant="secondary" onClick={onSignOut}>Sign out</Button>
      </header>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4" aria-label="Ravi overview">
        <Card className="border-teal-400/20 bg-teal-950/50 p-5">
          <div className="flex items-center justify-between"><MapPin className="h-6 w-6 text-teal-300" aria-hidden="true" /><span className="text-xs font-bold uppercase tracking-wider text-teal-200">Mock status</span></div>
          <p className="mt-7 text-sm font-bold text-slate-300">Current location</p><p className="mt-1 text-2xl font-black text-white">At home</p><p className="mt-1 text-sm text-slate-400">Last updated 8:42 AM</p>
        </Card>
        <Card className="p-5"><Bell className="h-6 w-6 text-amber-300" aria-hidden="true" /><p className="mt-7 text-sm font-bold text-slate-300">Today&apos;s reminders</p><p className="mt-1 text-2xl font-black text-white">2 upcoming</p><p className="mt-1 text-sm text-slate-400">Next at 10:30 AM</p></Card>
        <Card className="p-5"><Activity className="h-6 w-6 text-indigo-300" aria-hidden="true" /><p className="mt-7 text-sm font-bold text-slate-300">Recent activity</p><p className="mt-1 text-2xl font-black text-white">Memory Match</p><p className="mt-1 text-sm text-slate-400">Completed this morning</p></Card>
        <Card className="p-5"><Users className="h-6 w-6 text-rose-300" aria-hidden="true" /><p className="mt-7 text-sm font-bold text-slate-300">Family connection</p><p className="mt-1 text-2xl font-black text-white">All is well</p><p className="mt-1 text-sm text-slate-400">No new messages</p></Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-6 sm:p-8" title="Today at a glance" description="A simple activity trail for Ravi.">
          <div className="mt-6 space-y-4">
            {[['8:30 AM', 'Morning activity practice', 'Completed'], ['10:30 AM', 'Drink a glass of water', 'Upcoming'], ['4:00 PM', 'Call family', 'Upcoming']].map(([time, title, status]) => (
              <div key={time} className="flex items-center gap-4 border-l-2 border-teal-500/50 pl-4">
                <span className="w-20 shrink-0 text-sm font-bold text-teal-300">{time}</span>
                <div className="flex-1"><p className="font-bold text-white">{title}</p><p className="text-sm text-slate-400">{status}</p></div>
                <ChevronRight className="h-5 w-5 text-slate-500" aria-hidden="true" />
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6 sm:p-8" title="SMRITI note" description="A gentle summary based on prototype data.">
          <div className="mt-6 rounded-2xl border border-indigo-300/20 bg-indigo-950/40 p-5"><CalendarDays className="h-6 w-6 text-indigo-300" aria-hidden="true" /><p className="mt-4 text-lg font-bold leading-relaxed text-slate-100">Ravi has a quiet morning plan with one completed activity and two upcoming reminders.</p><p className="mt-3 text-sm text-slate-400">This is mock caretaker data for the prototype.</p></div>
        </Card>
      </section>
    </div>
  </main>
);