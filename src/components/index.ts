@import "tailwindcss";

:root {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  color: #172018;
  background: #f5f7f1;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;

  --smriti-bg: #f5f7f1;
  --smriti-surface: rgba(255, 255, 255, 0.72);
  --smriti-surface-solid: #ffffff;

  --smriti-text: #172018;
  --smriti-text-soft: #647064;
  --smriti-text-muted: #8b9589;

  --smriti-primary: #718866;
  --smriti-primary-dark: #52674a;
  --smriti-primary-light: #dce8d5;

  --smriti-accent: #c6a76b;
  --smriti-danger: #c96c6c;
  --smriti-warning: #d39c55;

  --smriti-border: rgba(23, 32, 24, 0.09);

  --smriti-shadow-sm:
    0 4px 20px rgba(35, 50, 36, 0.06);

  --smriti-shadow-md:
    0 15px 45px rgba(35, 50, 36, 0.1);

  --smriti-shadow-lg:
    0 30px 90px rgba(35, 50, 36, 0.14);

  --radius-sm: 12px;
  --radius-md: 18px;
  --radius-lg: 26px;
  --radius-xl: 36px;
}

* {
  box-sizing: border-box;
}

html {
  min-height: 100%;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;

  background:
    radial-gradient(
      circle at 10% 10%,
      rgba(198, 215, 188, 0.25),
      transparent 30%
    ),
    radial-gradient(
      circle at 90% 80%,
      rgba(220, 207, 177, 0.18),
      transparent 30%
    ),
    var(--smriti-bg);
}

button,
input,
textarea,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

#root {
  min-height: 100vh;
}

/* Scrollbar */

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(113, 136, 102, 0.35);
  border-radius: 999px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(113, 136, 102, 0.55);
}

/* Selection */

::selection {
  color: #ffffff;
  background: var(--smriti-primary);
}

/* Glass */

.smriti-glass {
  background: var(--smriti-surface);
  border: 1px solid var(--smriti-border);

  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);

  box-shadow: var(--smriti-shadow-md);
}

/* Hover */

.smriti-hover {
  transition:
    transform 450ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 450ms ease,
    border-color 350ms ease,
    background 350ms ease;
}

.smriti-hover:hover {
  transform: translateY(-5px);

  box-shadow:
    0 24px 60px rgba(35, 50, 36, 0.13);
}

/* Floating */

.smriti-float {
  animation:
    smriti-float 5s ease-in-out infinite;
}

@keyframes smriti-float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-9px);
  }
}

/* Breathing */

.smriti-breathe {
  animation:
    smriti-breathe 4s ease-in-out infinite;
}

@keyframes smriti-breathe {
  0%,
  100% {
    transform: scale(0.98);
  }

  50% {
    transform: scale(1.03);
  }
}

/* Glow */

.smriti-glow {
  animation:
    smriti-glow 3s ease-in-out infinite;
}

@keyframes smriti-glow {
  0%,
  100% {
    box-shadow:
      0 0 0 rgba(113, 136, 102, 0);
  }

  50% {
    box-shadow:
      0 0 45px rgba(113, 136, 102, 0.18);
  }
}

/* Pulse */

.smriti-pulse {
  animation:
    smriti-pulse 2.2s ease-in-out infinite;
}

@keyframes smriti-pulse {
  0%,
  100% {
    opacity: 0.55;
    transform: scale(0.95);
  }

  50% {
    opacity: 1;
    transform: scale(1.08);
  }
}

/* Page transition */

.smriti-page-enter {
  animation:
    smriti-page-enter 650ms
    cubic-bezier(0.22, 1, 0.36, 1)
    both;
}

@keyframes smriti-page-enter {
  from {
    opacity: 0;
    transform:
      translateY(20px)
      scale(0.985);
    filter: blur(4px);
  }

  to {
    opacity: 1;
    transform:
      translateY(0)
      scale(1);
    filter: blur(0);
  }
}

/* Stagger */

.smriti-stagger > * {
  opacity: 0;

  animation:
    smriti-stagger-item 650ms
    cubic-bezier(0.22, 1, 0.36, 1)
    forwards;
}

.smriti-stagger > *:nth-child(1) {
  animation-delay: 80ms;
}

.smriti-stagger > *:nth-child(2) {
  animation-delay: 160ms;
}

.smriti-stagger > *:nth-child(3) {
  animation-delay: 240ms;
}

.smriti-stagger > *:nth-child(4) {
  animation-delay: 320ms;
}

.smriti-stagger > *:nth-child(5) {
  animation-delay: 400ms;
}

.smriti-stagger > *:nth-child(6) {
  animation-delay: 480ms;
}

@keyframes smriti-stagger-item {
  from {
    opacity: 0;
    transform:
      translateY(22px)
      scale(0.98);
  }

  to {
    opacity: 1;
    transform:
      translateY(0)
      scale(1);
  }
}

/* Shimmer */

.smriti-shimmer {
  background:
    linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.04) 25%,
      rgba(255, 255, 255, 0.65) 50%,
      rgba(0, 0, 0, 0.04) 75%
    );

  background-size: 200% 100%;

  animation:
    smriti-shimmer 1.6s linear infinite;
}

@keyframes smriti-shimmer {
  from {
    background-position: 200% 0;
  }

  to {
    background-position: -200% 0;
  }
}

/* Ripple */

.smriti-ripple {
  position: relative;
  overflow: hidden;
}

.smriti-ripple::after {
  content: "";

  position: absolute;

  width: 10px;
  height: 10px;

  left: 50%;
  top: 50%;

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.3);

  transform:
    translate(-50%, -50%)
    scale(0);

  opacity: 0;

  pointer-events: none;
}

.smriti-ripple:active::after {
  animation:
    smriti-ripple-effect 550ms ease-out;
}

@keyframes smriti-ripple-effect {
  0% {
    transform:
      translate(-50%, -50%)
      scale(0);
    opacity: 0.5;
  }

  100% {
    transform:
      translate(-50%, -50%)
      scale(35);
    opacity: 0;
  }
}

/* Focus */

:focus-visible {
  outline: 3px solid
    rgba(113, 136, 102, 0.45);

  outline-offset: 3px;
}

/* Reduced motion */

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Mobile */

@media (max-width: 640px) {
  :root {
    --radius-lg: 22px;
    --radius-xl: 28px;
  }
}
export { default as AnimatedBackground } from "./AnimatedBackground";