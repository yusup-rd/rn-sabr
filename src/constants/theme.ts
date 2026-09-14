export const colors = {
  background: "#F8F9FA",
  foreground: "#0F172A",

  card: "#FFFFFF",
  cardForeground: "#0F172A",

  primary: "#134E43",
  primaryForeground: "#FFFFFF",

  secondary: "#C5A059",
  secondaryForeground: "#1B150A",

  muted: "#F1F5F9",
  mutedForeground: "#64748B",

  border: "#E2E8F0",

  success: "#10B981",
  destructive: "#dc2626",
} as const;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  18: 72,
  20: 80,
  24: 96,
  30: 120,
} as const;

export const theme = {
  colors,
  spacing,
} as const;
