import React, { useEffect, useState } from 'react';
import {
  Activity,
  Bell,
  Brain,
  ChevronRight,
  Heart,
  Home,
  LogOut,
  MapPin,
  Menu,
  Mic,
  Music2,
  Pill,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { ActivitiesPage } from '../pages/ActivitiesPage';
import { MemoriesPage } from '../pages/MemoriesPage';
import { RemindersPage } from '../pages/RemindersPage';
import { getDemoAiResponse, type AiMessage } from '../services/aiService';
import { getDemoLocation, setLocationSharing, type DemoLocation } from '../services/locationService';
import { Button } from './Button';
import { Card } from './Card';

type PatientRoute = 'dashboard' | 'memories' | 'ai' | 'wellness' | 'ayurveda' | 'reminders' | 'location' | 'family' | 'games' | 'notes' | 'notifications' | 'safety' | 'settings';

export interface PatientWorkspaceProps {
  userName: string;
  onSignOut: () => void;
}

const navigation: Array<{ id: PatientRoute; label: string; icon: React.ElementType }> = [
  { id: 'dashboard', label: 'Today', icon: Home },
  { id: 'memories', label: 'Memories', icon: Heart },
  { id: 'ai', label: 'AI companion', icon: Sparkles },
  { id: 'wellness', label: 'Wellness', icon: Activity },
  { id: 'reminders', label: 'Reminders', icon: Bell },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'games', label: 'Games', icon: Brain },
];

const activityCards = [
  { id: 'wellness' as PatientRoute, label: 'Wellness', icon: Heart, color: 'text-rose-300' },
  { id: 'ayurveda' as PatientRoute, label: 'Ayurveda', icon: Sparkles, color: 'text-amber-300' },
  { id: 'reminders' as PatientRoute, label: 'Medication reminders', icon: Pill, color: 'text-teal-300' },
  { id: 'notes' as PatientRoute, label: 'Notes', icon: Activity, color: 'text-sky-300' },
  { id: 'family' as PatientRoute, label: 'Family', icon: Users, color: 'text-violet-300' },
  { id: 'location' as PatientRoute, label: 'Location', icon: MapPin, color: 'text-emerald-300' },
  { id: 'safety' as PatientRoute, label: 'Safety', icon: ShieldCheck, color: 'text-orange-300' },
  { id: 'ai' as PatientRoute, label: 'Voice', icon: Mic, color: 'text-cyan-300' },
  { id: 'ai' as PatientRoute, label: 'Music', icon: Music2, color: 'text-fuchsia-300' },
  { id: 'memories' as PatientRoute, label: 'Stories', icon: Brain, color: 'text-indigo-300' },
];

const routeTitle: Record<PatientRoute, string> = {
  dashboard: 'Today', memories: 'Your memories', ai: 'AI companion', wellness: 'Wellness', ayurveda: 'Ayurveda', reminders: 'Reminders', location: 'Location', family: 'Family', games: 'Games', notes: 'Notes', notifications: 'Notifications', safety: 'Safety center', settings: 'Settings',
};

export const PatientWorkspace: React.FC<PatientWorkspaceProps> = ({ userName, onSignOut }) => {
  const [route, setRoute] = useState<PatientRoute>('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = (nextRoute: PatientRoute) => { setRoute(nextRoute); setMenuOpen(false); };

  return (
    <main className="min-h-screen bg-[#0b1020] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className={`${menuOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 w-72 border-r border-white/10 bg-[#111827] p-6 transition-transform lg:static lg:translate-x-0`}>
          <div className="flex items-center justify-between"><button type="button" onClick={() => navigate('dashboard')} className="flex items-center gap-3" aria-label="Go to SMRITI home"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-xl font-black text-white shadow-lg shadow-violet-500/20">S</span><span className="font-black tracking-[0.2em]">SMRITI</span></button><button type="button" className="rounded-lg p-2 hover:bg-white/10 lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X className="h-5 w-5" /></button></div>
          <p className="mt-10 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">My space</p>
          <nav className="mt-3 space-y-1" aria-label="Patient navigation">{navigation.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => navigate(id)} className={`flex min-h-[48px] w-full items-center gap-3 rounded-xl px-4 text-left text-sm font-bold transition-colors ${route === id ? 'bg-gradient-to-r from-violet-600/80 to-blue-600/70 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} aria-current={route === id ? 'page' : undefined}><Icon className="h-5 w-5" aria-hidden="true" />{label}</button>)}</nav>
          <div className="mt-8 border-t border-white/10 pt-5"><button type="button" onClick={() => navigate('settings')} className="flex min-h-[48px] w-full items-center gap-3 rounded-xl px-4 text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white"><Settings className="h-5 w-5" aria-hidden="true" />Settings</button><button type="button" onClick={onSignOut} className="mt-1 flex min-h-[48px] w-full items-center gap-3 rounded-xl px-4 text-sm font-bold text-rose-200 hover:bg-rose-500/10"><LogOut className="h-5 w-5" aria-hidden="true" />Sign out</button></div>
        </aside>
        {menuOpen && <button type="button" className="fixed inset-0 z-20 bg-black/60 lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Close navigation overlay" />}

        <section className="min-w-0 flex-1 px-5 py-5 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-4 border-b border-white/10 pb-5"><button type="button" className="rounded-xl p-3 hover:bg-white/10 lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu className="h-6 w-6" /></button><div className="min-w-0 flex-1"><p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Wednesday, August 26</p><h1 className="mt-1 truncate text-2xl font-black text-white sm:text-3xl">{route === 'dashboard' ? `Good morning, ${userName}.` : routeTitle[route]}</h1></div><div className="flex items-center gap-2"><button type="button" onClick={() => navigate('notifications')} className="rounded-xl border border-white/10 bg-white/5 p-3 text-slate-300 hover:border-cyan-300/50 hover:text-white" aria-label="Open notifications"><Bell className="h-5 w-5" /></button><button type="button" onClick={() => navigate('settings')} className="rounded-xl border border-white/10 bg-white/5 p-3 text-slate-300 hover:border-cyan-300/50 hover:text-white" aria-label="Open settings"><Settings className="h-5 w-5" /></button></div></header>
          <div className="py-7">{route === 'dashboard' ? <DashboardHome userName={userName} navigate={navigate} /> : <PatientRouteView route={route} navigate={navigate} />}</div>
        </section>
      </div>
    </main>
  );
};

const DashboardHome: React.FC<{ userName: string; navigate: (route: PatientRoute) => void }> = ({ userName, navigate }) => <>
  <section className="relative overflow-hidden rounded-[28px] border border-violet-300/20 bg-gradient-to-br from-violet-700 via-blue-700 to-cyan-600 p-7 shadow-2xl shadow-blue-950/40 sm:p-10"><div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" /><div className="relative max-w-3xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-100">A gentle plan for you</p><h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-5xl">You&apos;re doing beautifully, {userName}.</h2><p className="mt-4 max-w-xl text-base leading-relaxed text-blue-50 sm:text-lg">One small moment at a time. Your memories, reminders, and favourite activities are ready when you are.</p><div className="mt-7 flex flex-wrap gap-3"><Button onClick={() => navigate('ai')} className="bg-white text-violet-700 hover:bg-blue-50" leftIcon={<Sparkles className="h-5 w-5" />}>Talk to SMRITI</Button><Button variant="secondary" onClick={() => navigate('games')} leftIcon={<Brain className="h-5 w-5" />}>Try an activity</Button></div></div></section>
  <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Today overview"><Card className="border-cyan-400/30 bg-cyan-950/40 p-5"><Bell className="h-6 w-6 text-amber-300" /><p className="mt-6 text-sm font-bold text-slate-300">Next reminder</p><p className="mt-1 text-2xl font-black text-white">Drink water</p><p className="mt-1 text-sm text-slate-400">10:30 AM</p></Card><Card className="border-emerald-400/20 bg-emerald-950/30 p-5"><Activity className="h-6 w-6 text-emerald-300" /><p className="mt-6 text-sm font-bold text-slate-300">Today&apos;s progress</p><p className="mt-1 text-2xl font-black text-white">1 of 3</p><p className="mt-1 text-sm text-slate-400">A calm start</p></Card><Card className="border-rose-400/20 bg-rose-950/30 p-5"><Heart className="h-6 w-6 text-rose-300" /><p className="mt-6 text-sm font-bold text-slate-300">Mood check</p><p className="mt-1 text-2xl font-black text-white">Feeling good</p><p className="mt-1 text-sm text-slate-400">Tap to update</p></Card><Card className="border-amber-400/20 bg-amber-950/30 p-5"><Search className="h-6 w-6 text-amber-300" /><p className="mt-6 text-sm font-bold text-slate-300">Memories</p><p className="mt-1 text-2xl font-black text-white">3 saved</p><button type="button" onClick={() => navigate('memories')} className="mt-1 text-sm font-bold text-amber-200 hover:text-white">View memories</button></Card></section>
  <section className="mt-9"><div className="mb-4 flex items-end justify-between gap-4"><div><h2 className="text-2xl font-black text-white">Choose something for today</h2><p className="mt-1 text-slate-400">Small moments that help you feel well and connected.</p></div><span className="hidden text-sm font-bold text-cyan-300 sm:block">10 ways to explore</span></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{activityCards.map(({ id, label, icon: Icon, color }) => <button key={label} type="button" onClick={() => navigate(id)} className="group flex min-h-[122px] flex-col justify-between rounded-2xl border border-white/10 bg-[#111827] p-4 text-left transition-all hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-slate-800"><Icon className={`h-7 w-7 ${color}`} aria-hidden="true" /><span className="flex items-center justify-between gap-2 text-sm font-bold text-slate-200">{label}<ChevronRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span></button>)}</div></section>
</>;

const PatientRouteView: React.FC<{ route: Exclude<PatientRoute, 'dashboard'>; navigate: (route: PatientRoute) => void }> = ({ route, navigate }) => {
  if (route === 'memories') return <MemoriesPage />;
  if (route === 'reminders') return <RemindersPage />;
  if (route === 'games') return <ActivitiesPage onStartActivity={() => navigate('games')} />;
  if (route === 'ai') return <AiCompanion />;
  if (route === 'location') return <LocationPanel />;
  if (route === 'settings') return <SettingsPanel />;
  if (route === 'notes') return <NotesPanel />;
  if (route === 'family') return <FamilyPanel />;
  if (route === 'notifications') return <NotificationsPanel />;
  if (route === 'safety') return <SafetyPanel />;
  const content: Record<'wellness' | 'ayurveda', { icon: React.ElementType; title: string; description: string; action: string }> = {
    wellness: { icon: Heart, title: 'A kinder rhythm for today', description: 'Try a short breathing pause, gentle movement, or a hydration check. These are supportive ideas, not medical treatment.', action: 'Begin a wellness moment' },
    ayurveda: { icon: Sparkles, title: 'Traditional wellness, thoughtfully shared', description: 'Explore informational routines around rest, hydration, breathing, and mindful daily habits. Please consult a professional for medical advice.', action: 'Explore routines' },
  };
  const item = content[route]; const Icon = item.icon;
  return <Card className="border-violet-300/20 bg-gradient-to-br from-[#111827] to-violet-950/40 p-8 sm:p-14"><div className="mx-auto max-w-2xl text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400"><Icon className="h-8 w-8 text-white" /></div><h2 className="mt-6 text-3xl font-black text-white sm:text-4xl">{item.title}</h2><p className="mt-4 text-lg leading-relaxed text-slate-300">{item.description}</p><Button className="mt-8" onClick={() => navigate('dashboard')} leftIcon={<ChevronRight className="h-5 w-5" />}>{item.action}</Button></div></Card>;
};

const AiCompanion: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    setMessages((current) => [...current, { id: `user-${Date.now()}`, role: 'user', content: trimmedMessage, createdAt: new Date().toISOString() }, getDemoAiResponse(trimmedMessage)]);
    setMessage('');
  };
  return <Card className="border-cyan-300/20 bg-gradient-to-br from-[#111827] to-violet-950/40 p-6 sm:p-9"><div className="mx-auto max-w-3xl"><div className="flex items-center gap-4"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400"><Sparkles className="h-7 w-7 text-white" /></div><div><h2 className="text-3xl font-black text-white">Talk with SMRITI</h2><p className="text-slate-400">Demo companion. No medical advice or diagnosis.</p></div></div><div className="mt-7 min-h-48 space-y-3 rounded-2xl border border-white/10 bg-black/15 p-4" aria-live="polite">{messages.length === 0 && <p className="text-lg text-slate-300">Try asking, &quot;What is my next reminder?&quot;</p>}{messages.map((item) => <div key={item.id} className={`max-w-[85%] rounded-2xl px-4 py-3 text-base ${item.role === 'user' ? 'ml-auto bg-cyan-500 text-slate-950' : 'bg-white/10 text-slate-100'}`}>{item.content}</div>)}</div><form className="mt-4 flex gap-3" onSubmit={sendMessage}><label className="sr-only" htmlFor="companion-message">Message SMRITI</label><input id="companion-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask something friendly..." className="min-h-[48px] min-w-0 flex-1 rounded-xl border border-white/15 bg-slate-950 px-4 text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none" /><Button type="submit">Send</Button></form></div></Card>;
};

const LocationPanel: React.FC = () => {
  const [location, setLocation] = useState<DemoLocation>(() => getDemoLocation());
  const toggleSharing = () => setLocation(setLocationSharing(!location.sharingEnabled));
  return <Card className="border-emerald-300/20 bg-gradient-to-br from-[#111827] to-emerald-950/30 p-8 sm:p-12"><div className="mx-auto max-w-2xl"><div className="flex items-center gap-4"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500/20"><MapPin className="h-7 w-7 text-emerald-300" /></div><div><h2 className="text-3xl font-black text-white">Location sharing</h2><p className="text-slate-400">Your control comes first.</p></div></div><div className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-950/40 p-6"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">Simulated demo location</p><p className="mt-2 text-3xl font-black text-white">{location.label}</p><p className="mt-1 text-sm text-slate-400">Last updated {location.updatedAt}</p></div><span className="rounded-full bg-amber-400/15 px-3 py-2 text-xs font-bold text-amber-200">DEMO ONLY</span></div></div><div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4"><div><p className="font-bold text-white">Share with caretaker</p><p className="text-sm text-slate-400">No real location is sent in this demo.</p></div><button type="button" onClick={toggleSharing} className={`min-h-[44px] rounded-full px-4 text-sm font-bold ${location.sharingEnabled ? 'bg-emerald-400 text-slate-950' : 'bg-slate-700 text-slate-200'}`} aria-pressed={location.sharingEnabled}>{location.sharingEnabled ? 'Sharing on' : 'Sharing off'}</button></div></div></Card>;
};

const SettingsPanel: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(() => localStorage.getItem('smriti_ai_reduced_motion') === 'true');
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('smriti_ai_high_contrast') === 'true');

  useEffect(() => {
    localStorage.setItem('smriti_ai_reduced_motion', String(reducedMotion));
    document.documentElement.dataset.reducedMotion = String(reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    localStorage.setItem('smriti_ai_high_contrast', String(highContrast));
    document.documentElement.dataset.highContrast = String(highContrast);
  }, [highContrast]);

  return <Card className="border-violet-300/20 bg-gradient-to-br from-[#111827] to-violet-950/30 p-7 sm:p-10"><div className="max-w-2xl"><h2 className="text-3xl font-black text-white">Make SMRITI comfortable</h2><p className="mt-2 text-slate-400">These preferences are saved on this device in demo mode.</p><div className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5"><label className="flex min-h-[72px] items-center justify-between gap-5 px-5"><span><span className="block font-bold text-white">Reduce motion</span><span className="text-sm text-slate-400">Keep the experience calm and still.</span></span><input type="checkbox" checked={reducedMotion} onChange={(event) => setReducedMotion(event.target.checked)} className="h-6 w-6 accent-cyan-400" /></label><label className="flex min-h-[72px] items-center justify-between gap-5 px-5"><span><span className="block font-bold text-white">Higher contrast</span><span className="text-sm text-slate-400">Increase clarity for important controls.</span></span><input type="checkbox" checked={highContrast} onChange={(event) => setHighContrast(event.target.checked)} className="h-6 w-6 accent-cyan-400" /></label></div><p className="mt-6 text-sm text-slate-500">Privacy: memories, reminders, and these preferences stay in local browser storage for this demo.</p></div></Card>;
};

const NotesPanel: React.FC = () => {
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState('');
  return <Card className="border-sky-300/20 bg-gradient-to-br from-[#111827] to-sky-950/30 p-7 sm:p-10"><h2 className="text-3xl font-black text-white">A note for later</h2><p className="mt-2 text-slate-400">Keep a small thought, appointment, or family detail close.</p><textarea value={note} onChange={(event) => setNote(event.target.value)} rows={5} placeholder="Write something you want to remember..." className="mt-7 w-full rounded-2xl border border-white/15 bg-slate-950 p-4 text-base text-white placeholder:text-slate-500 focus:border-sky-300 focus:outline-none" aria-label="New note" /><Button className="mt-4" onClick={() => { setSavedNote(note.trim()); setNote(''); }} disabled={!note.trim()}>Save note</Button>{savedNote && <p role="status" className="mt-5 rounded-xl border border-emerald-300/20 bg-emerald-950/40 p-4 text-emerald-200">Saved locally: {savedNote}</p>}</Card>;
};

const FamilyPanel: React.FC = () => <Card className="border-rose-300/20 bg-gradient-to-br from-[#111827] to-rose-950/30 p-7 sm:p-10"><h2 className="text-3xl font-black text-white">Your trusted people</h2><p className="mt-2 text-slate-400">People you can reach when you want company.</p><div className="mt-7 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-full bg-rose-400/20 text-lg font-black text-rose-200">A</div><div><p className="font-bold text-white">Anitha</p><p className="text-sm text-slate-400">Daughter · Caretaker</p></div></div><Button variant="secondary" className="mt-5 w-full" onClick={() => window.alert('Demo call: no call was placed.')}>Start a demo call</Button></div><div className="rounded-2xl border border-dashed border-white/15 p-5"><Users className="h-7 w-7 text-violet-300" /><p className="mt-4 font-bold text-white">Add someone you trust</p><p className="mt-1 text-sm text-slate-400">Invite a family member in a future connected release.</p></div></div></Card>;

const NotificationsPanel: React.FC = () => { const [read, setRead] = useState(false); return <Card className="border-amber-300/20 bg-gradient-to-br from-[#111827] to-amber-950/30 p-7 sm:p-10"><div className="flex items-start justify-between gap-4"><div><h2 className="text-3xl font-black text-white">Notifications</h2><p className="mt-2 text-slate-400">Helpful updates from your SMRITI space.</p></div>{!read && <Button variant="secondary" onClick={() => setRead(true)}>Mark as read</Button>}</div>{read ? <p className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-950/40 p-5 text-emerald-200">You&apos;re all caught up.</p> : <div className="mt-8 rounded-2xl border border-amber-300/20 bg-amber-950/30 p-5"><Bell className="h-6 w-6 text-amber-300" /><p className="mt-4 font-bold text-white">Water reminder at 10:30 AM</p><p className="mt-1 text-sm text-slate-400">Reminder · Just now</p></div>}</Card>; };

const SafetyPanel: React.FC = () => { const [confirmed, setConfirmed] = useState(false); return <Card className="border-rose-300/20 bg-gradient-to-br from-[#111827] to-rose-950/30 p-7 sm:p-10"><div className="flex items-center gap-4"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-rose-400/15"><ShieldCheck className="h-7 w-7 text-rose-300" /></div><div><h2 className="text-3xl font-black text-white">Safety center</h2><p className="text-slate-400">A calm place to check in.</p></div></div><div className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-950/40 p-5"><p className="font-bold text-emerald-200">Safety status: all clear</p><p className="mt-1 text-sm text-slate-400">No alerts in this demo.</p></div>{confirmed ? <p role="status" className="mt-5 rounded-xl bg-amber-400/15 p-4 text-amber-100">Demo alert prepared. No emergency service or contact was notified.</p> : <Button className="mt-6 bg-rose-500 hover:bg-rose-400" onClick={() => setConfirmed(true)}>Test emergency confirmation</Button>}</Card>; };
