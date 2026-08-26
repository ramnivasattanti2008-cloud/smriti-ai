import React, { useState } from 'react';
import { ArrowLeft, HeartHandshake, LockKeyhole, Phone, UserRound } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { Input } from './Input';

export interface PatientLoginProps {
  onBack: () => void;
  onContinue: (name: string) => void;
}

export const PatientLogin: React.FC<PatientLoginProps> = ({ onBack, onContinue }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !phone.trim() || !pin.trim()) {
      setError('Please fill in your name, phone number, and PIN to continue.');
      return;
    }
    if (pin.length < 4) {
      setError('Your PIN should be at least 4 numbers.');
      return;
    }
    setError('');
    onContinue(name.trim());
  };

  return (
    <main className="auth-shell auth-shell-patient min-h-screen px-5 py-8 text-slate-100 sm:px-8">
      <div className="auth-orbit auth-orbit-one" aria-hidden="true" />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center py-6 sm:py-10">
        <button type="button" onClick={onBack} className="mb-8 inline-flex min-h-[44px] items-center gap-2 self-start rounded-xl px-3 text-base font-bold text-teal-100 transition-colors hover:bg-white/10 hover:text-white">
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          Back
        </button>
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="max-w-md space-y-5">
            <div className="auth-mark inline-flex rounded-2xl border border-teal-300/30 bg-teal-950/70 p-3 text-teal-200">
              <HeartHandshake className="h-9 w-9" aria-hidden="true" />
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-300">Your SMRITI space</p>
            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">Let&apos;s make today a good day.</h1>
            <p className="text-lg leading-relaxed text-slate-200">A simple sign-in helps us keep your activities, memories, and reminders together.</p>
          </section>

          <Card className="auth-form-card border-white/10 bg-slate-900/70 p-6 sm:p-9">
            <div className="mb-7 space-y-2">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-300">Patient access</p>
              <h2 className="text-3xl font-black text-white">Welcome back</h2>
              <p className="text-base text-slate-300">Enter a few details to continue.</p>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <Input label="Your name" placeholder="For example, Ravi" value={name} onChange={(event) => setName(event.target.value)} leftIcon={<UserRound className="h-5 w-5" />} autoComplete="name" />
              <Input label="Phone number" type="tel" placeholder="Your phone number" value={phone} onChange={(event) => setPhone(event.target.value)} leftIcon={<Phone className="h-5 w-5" />} autoComplete="tel" />
              <Input label="Simple PIN" type="password" inputMode="numeric" maxLength={6} placeholder="4 to 6 numbers" value={pin} onChange={(event) => setPin(event.target.value.replace(/\D/g, ''))} leftIcon={<LockKeyhole className="h-5 w-5" />} autoComplete="current-password" helperText="This keeps your SMRITI space personal." />
              {error && <p role="alert" className="rounded-xl border border-rose-400/30 bg-rose-950/40 px-4 py-3 text-sm font-semibold text-rose-200">{error}</p>}
              <Button type="submit" size="lg" fullWidth>Continue</Button>
            </form>
            <button type="button" onClick={() => onContinue('Guest')} className="mt-5 min-h-[44px] w-full rounded-xl px-4 text-base font-bold text-teal-200 transition-colors hover:bg-teal-950/60 hover:text-white">
              Continue as guest
            </button>
            <p className="mt-5 text-center text-xs leading-relaxed text-slate-400">Prototype access only. A secure account service can be connected later.</p>
          </Card>
        </div>
      </div>
    </main>
  );
};