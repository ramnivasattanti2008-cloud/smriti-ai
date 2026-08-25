import type { GameDifficulty, GameCard } from '../../types';

export interface SymbolDefinition {
  pairId: string;
  name: string;
  iconName: string;
  colorClass: string;
}

export const SYMBOL_DEFS: SymbolDefinition[] = [
  { pairId: 'sym-sun', name: 'Sun', iconName: 'sun', colorClass: 'text-amber-400' },
  { pairId: 'sym-heart', name: 'Heart', iconName: 'heart', colorClass: 'text-rose-400' },
  { pairId: 'sym-star', name: 'Star', iconName: 'star', colorClass: 'text-yellow-300' },
  { pairId: 'sym-flower', name: 'Flower', iconName: 'flower', colorClass: 'text-emerald-400' },
  { pairId: 'sym-apple', name: 'Apple', iconName: 'apple', colorClass: 'text-red-400' },
  { pairId: 'sym-bell', name: 'Bell', iconName: 'bell', colorClass: 'text-sky-400' },
  { pairId: 'sym-smile', name: 'Smile', iconName: 'smile', colorClass: 'text-teal-300' },
  { pairId: 'sym-coffee', name: 'Coffee', iconName: 'coffee', colorClass: 'text-orange-400' },
];

export const DIFFICULTY_CONFIG: Record<
  GameDifficulty,
  { pairCount: number; label: string; gridCols: string; description: string }
> = {
  easy: {
    pairCount: 4,
    label: 'Easy',
    gridCols: 'grid-cols-2 sm:grid-cols-4',
    description: '4 Pairs (8 Cards) - Relaxed & Quick',
  },
  medium: {
    pairCount: 6,
    label: 'Medium',
    gridCols: 'grid-cols-3 sm:grid-cols-4',
    description: '6 Pairs (12 Cards) - Great Focus Practice',
  },
  hard: {
    pairCount: 8,
    label: 'Hard',
    gridCols: 'grid-cols-4 sm:grid-cols-4',
    description: '8 Pairs (16 Cards) - Full Cognitive Challenge',
  },
};

export const generateDeck = (difficulty: GameDifficulty): GameCard[] => {
  const { pairCount } = DIFFICULTY_CONFIG[difficulty];
  const selectedSymbols = SYMBOL_DEFS.slice(0, pairCount);

  const cards: GameCard[] = [];
  selectedSymbols.forEach((sym) => {
    // First card of pair
    cards.push({
      id: `${sym.pairId}-1`,
      pairId: sym.pairId,
      symbolName: sym.iconName,
      flipped: false,
      matched: false,
    });
    // Second card of pair
    cards.push({
      id: `${sym.pairId}-2`,
      pairId: sym.pairId,
      symbolName: sym.iconName,
      flipped: false,
      matched: false,
    });
  });

  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
};
