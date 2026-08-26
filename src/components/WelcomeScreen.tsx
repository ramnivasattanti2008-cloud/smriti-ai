import React from 'react';

export interface WelcomeScreenProps {
  onSelectPatient: () => void;
  onSelectCaretaker: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onSelectPatient,
  onSelectCaretaker,
}) => (
  <main className="smriti-app auth-shell-welcome">
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />
      <div className="ambient-orb orb-3" />
      <div className="noise-layer" />
    </div>

    <nav className="smriti-nav">
      <button className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="SMRITI home">
        <span className="logo-circle">S</span>
        <span className="logo-text">SMRITI</span>
      </button>
      <div className="nav-status"><span className="status-dot" />Always here</div>
    </nav>

    <section className="welcome-section">
      <div className="welcome-content">
        <div className="eyebrow animate-fade-up">YOUR DIGITAL COMPANION</div>
        <h1 className="main-title">
          <span className="title-line line-one">Life is easier</span>
          <span className="title-line line-two">when you&apos;re<em> remembered.</em></span>
        </h1>
        <p className="welcome-description animate-fade-up delay-3">
          SMRITI helps you remember the little things, stay connected with the people you love, and feel supported every day.
        </p>

        <div className="role-section">
          <p className="role-question animate-fade-up delay-4">How would you like to continue?</p>
          <div className="role-grid">
            <button className="role-card patient-card animate-card delay-5" onClick={onSelectPatient}>
              <div className="card-glow" />
              <div className="role-icon patient-icon"><span aria-hidden="true">♡</span></div>
              <div className="role-info">
                <span className="role-label">FOR ME</span>
                <strong>I&apos;m using SMRITI</strong>
                <small>A simple, friendly space made for you.</small>
              </div>
              <span className="role-arrow" aria-hidden="true">→</span>
            </button>
            <button className="role-card caretaker-card animate-card delay-6" onClick={onSelectCaretaker}>
              <div className="card-glow" />
              <div className="role-icon caretaker-icon"><span aria-hidden="true">♧</span></div>
              <div className="role-info">
                <span className="role-label">FOR SOMEONE I CARE FOR</span>
                <strong>I&apos;m a caretaker</strong>
                <small>Stay connected and help from anywhere.</small>
              </div>
              <span className="role-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      <div className="companion-area" aria-hidden="true">
        <div className="companion-ring ring-1" /><div className="companion-ring ring-2" /><div className="companion-ring ring-3" />
        <div className="companion"><div className="companion-core"><span>S</span></div><div className="companion-particle particle-1" /><div className="companion-particle particle-2" /><div className="companion-particle particle-3" /><div className="companion-particle particle-4" /></div>
        <div className="companion-caption"><span className="caption-dot" />SMRITI is here</div>
      </div>
    </section>

    <footer className="smriti-footer"><span>SMRITI AI</span><span>Memory · Care · Connection</span><span>2026</span></footer>
  </main>
);