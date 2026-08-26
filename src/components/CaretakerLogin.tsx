import React, { useState } from 'react';
import { ArrowLeft, BriefcaseBusiness, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { Input } from './Input';

export interface CaretakerLoginProps {
  onBack: () => void;
  onContinue: () => void;
}

export const CaretakerLogin: React.FC<CaretakerLoginProps> = ({ onBack, onContinue }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    onContinue();
  };

  return (
    <main className="auth-shell auth-shell-caretaker min-h-screen px-5 py-8 text-slate-100 sm:px-8">
      <div className="auth-orbit auth-orbit-two" aria-hidden="true" />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center py-6 sm:py-10">
        <button type="button" onClick={onBack} className="mb-8 inline-flex min-h-[44px] items-center gap-2 self-start rounded-xl px-3 text-base font-bold text-slate-200 transition-colors hover:bg-white/10 hover:text-white">
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          Back
        </button>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-indigo-300/20 bg-indigo-950/70 p-3 text-indigo-200">
              <BriefcaseBusiness className="h-8 w-8" aria-hidden="true" />
              <span className="text-sm font-bold uppercase tracking-[0.16em]">Caretaker workspace</span>
            </div>
            <h1 className="text-4xl font-black leading-tight text-white sm:text-6xl">Care, made clearer.</h1>
            <p className="max-w-lg text-lg leading-relaxed text-slate-300 sm:text-xl">See the details that help you support someone you love, gathered in one calm place.</p>
            <div className="grid max-w-lg grid-cols-2 gap-3 text-sm font-semibold text-slate-200">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Activity overview</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Daily reminders</div>
            </div>
          </section>

          <Card className="auth-form-card border-white/10 bg-slate-950/75 p-6 sm:p-9">
            <div className="mb-7 space-y-2">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-300">Caretaker access</p>
              <h2 className="text-3xl font-black text-white">Sign in to continue</h2>
              <p className="text-base text-slate-300">Your connected patient information stays in your workspace.</p>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <Input label="Email address" type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} leftIcon={<Mail className="h-5 w-5" />} autoComplete="email" />
              <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} leftIcon={<LockKeyhole className="h-5 w-5" />} rightIcon={<button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((visible) => !visible)} className="pointer-events-auto rounded-lg p-1 text-slate-400 hover:text-white">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>} autoComplete="current-password" />
              <div className="flex items-center justify-between gap-4">
                <label className="flex min-h-[44px] items-center gap-2 text-sm font-semibold text-slate-300">
                  <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="h-5 w-5 accent-indigo-400" />
                  Remember me
                </label>
                <button type="button" onClick={() => setMessage('Password recovery will be connected in a future release.')} className="min-h-[44px] rounded-lg px-2 text-sm font-bold text-indigo-300 hover:text-indigo-200">Forgot password?</button>
              </div>
              {error && <p role="alert" className="rounded-xl border border-rose-400/30 bg-rose-950/40 px-4 py-3 text-sm font-semibold text-rose-200">{error}</p>}
              {message && <p role="status" className="rounded-xl border border-indigo-300/20 bg-indigo-950/50 px-4 py-3 text-sm font-semibold text-indigo-200">{message}</p>}
              <Button type="submit" size="lg" fullWidth className="bg-indigo-500 hover:bg-indigo-400 focus-visible:ring-indigo-300">Sign in</Button>
            </form>
            <p className="mt-5 text-center text-xs leading-relaxed text-slate-400">Prototype access only. Secure authentication can be connected later.</p>
          </Card>
        </div>
      </div>
    </main>
  );
};