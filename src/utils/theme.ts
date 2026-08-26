/**
 * SMRITI AI - Design Tokens & Theme Constants
 * Primary direction: Calm, trustworthy, warm, highly accessible, elder-friendly.
 */

export const THEME = {
  colors: {
    brand: {
      primary: '#0D9488', // Teal 600 - calm, trustworthy, clear
      primaryHover: '#0F766E', // Teal 700
      primaryLight: '#CCFBF1', // Teal 100
      accent: '#6366F1', // Indigo 500
      accentWarm: '#F59E0B', // Amber 500
    },
    background: {
      page: '#0F172A', // Slate 900
      surface: '#1E293B', // Slate 800
      surfaceBorder: '#334155', // Slate 700
      surfaceHover: '#334155',
    },
    text: {
      heading: '#F8FAFC', // Slate 50
      body: '#E2E8F0', // Slate 200
      muted: '#94A3B8', // Slate 400
      inverse: '#0F172A',
    },
  },
  touchTarget: {
    minHeight: 'min-h-[44px]',
    minWidth: 'min-w-[44px]',
  },
  spacing: {
    page: 'p-4 sm:p-6 lg:p-8',
    section: 'space-y-8',
    card: 'p-6 sm:p-8',
  },
  radius: {
    surface: 'rounded-2xl',
    control: 'rounded-xl',
    pill: 'rounded-full',
  },
  elevation: {
    surface: 'shadow-lg shadow-slate-950/20',
    raised: 'shadow-xl shadow-slate-950/25',
  },
  motion: {
    micro: 'duration-200 ease-out',
    component: 'duration-300 ease-out',
    page: 'duration-[320ms] ease-out',
  },
  zIndex: {
    navigation: 'z-40',
    modal: 'z-50',
  },
  breakpoints: {
    mobile: 'sm',
    tablet: 'md',
    desktop: 'lg',
  },
} as const;
