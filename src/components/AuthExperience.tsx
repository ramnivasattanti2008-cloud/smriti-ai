import React, { useState } from 'react';
import { PageTransition } from './PageTransition';
import { WelcomeScreen } from './WelcomeScreen';
import { PatientLogin } from './PatientLogin';
import { CaretakerLogin } from './CaretakerLogin';
import type { UserRole } from '../types';

type AuthStep = 'welcome' | 'patient-login' | 'caretaker-login';

export interface AuthExperienceProps {
  onAuthenticated: (role: UserRole, name?: string) => void;
}

export const AuthExperience: React.FC<AuthExperienceProps> = ({ onAuthenticated }) => {
  const [step, setStep] = useState<AuthStep>('welcome');

  return (
    <PageTransition>
      {step === 'welcome' && <WelcomeScreen onSelectPatient={() => setStep('patient-login')} onSelectCaretaker={() => setStep('caretaker-login')} />}
      {step === 'patient-login' && <PatientLogin onBack={() => setStep('welcome')} onContinue={(name) => onAuthenticated('elder', name)} />}
      {step === 'caretaker-login' && <CaretakerLogin onBack={() => setStep('welcome')} onContinue={() => onAuthenticated('caregiver')} />}
    </PageTransition>
  );
};