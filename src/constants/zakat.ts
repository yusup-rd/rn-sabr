export const ZAKAT_RATE = 0.025;

export const NISAB_WEIGHTS = {
  gold: 87.48,
  silver: 612.36,
} as const;

// Temporary USD prices.
// TODO: Replace with live gold/silver prices.
export const DUMMY_ZAKAT_PRICES = {
  goldPerGram: 500,
  silverPerGram: 7,
} as const;
