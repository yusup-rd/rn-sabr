export const lightColors = {
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
  destructive: "#DC2626",
} as const;

export const darkColors = {
  background: "#0B1412",
  foreground: "#F8FAFC",

  card: "#12201D",
  cardForeground: "#F8FAFC",

  primary: "#4FAF99",
  primaryForeground: "#07100E",

  secondary: "#D6B66A",
  secondaryForeground: "#181207",

  muted: "#17221F",
  mutedForeground: "#94A3B8",

  border: "#263631",

  success: "#34D399",
  destructive: "#F87171",
} as const;

export type ThemeColors = {
  [K in keyof typeof lightColors]: string;
};

export type ThemeMode = "light" | "dark" | "system";

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
  light: lightColors,
  dark: darkColors,
  spacing,
} as const;
