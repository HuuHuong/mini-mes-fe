/**
 * Shared Color Palette (brand colors — same across themes)
 */
const palette = {
  // Primary
  primary_50: "#F2F3FF",
  primary_100: "#E5E7FF",
  primary_200: "#C7CBFF",
  primary_300: "#A8AEFF",
  primary_400: "#8990FF",
  primary_500: "#6C72FF",
  primary_600: "#535BEB",
  primary_700: "#4349BF",
  primary_800: "#333793",
  primary_900: "#242667",

  // Purple Secondary
  purple_50: "#F5EEFF",
  purple_100: "#E8D8FF",
  purple_200: "#D0B1FF",
  purple_300: "#B98AFF",
  purple_400: "#9D62FF",
  purple_500: "#834BF4",
  purple_600: "#6A35D8",
  purple_700: "#5224B3",
  purple_800: "#3D178E",
  purple_900: "#2A0D69",

  // Cyan Secondary
  cyan_50: "#E8F9FF",
  cyan_100: "#C9F0FF",
  cyan_200: "#97E2FF",
  cyan_300: "#66D4FF",
  cyan_400: "#3AC6FF",
  cyan_500: "#57C3FF",
  cyan_600: "#1FADE8",
  cyan_700: "#1688B5",
  cyan_800: "#0F6382",
  cyan_900: "#083F52",

  // Blue Secondary
  blue_50: "#EDF3FF",
  blue_100: "#D7E4FF",
  blue_200: "#B3CAFF",
  blue_300: "#8BAEFF",
  blue_400: "#5B88FF",
  blue_500: "#2D5BFF",
  blue_600: "#2347E0",
  blue_700: "#1934B8",
  blue_800: "#10238F",
  blue_900: "#091668",

  // Success
  success_50: "#EAFBF1",
  success_100: "#D2F5E1",
  success_200: "#A7ECC3",
  success_300: "#75DFA0",
  success_400: "#47CE80",
  success_500: "#22C55E",
  success_600: "#16A34A",
  success_700: "#15803D",
  success_800: "#166534",
  success_900: "#14532D",

  // Warning
  warning_50: "#FFF8E7",
  warning_100: "#FFEEBF",
  warning_200: "#FFE08A",
  warning_300: "#FFD255",
  warning_400: "#FFC226",
  warning_500: "#FDB52A",
  warning_600: "#E69D00",
  warning_700: "#B87700",
  warning_800: "#875500",
  warning_900: "#5A3800",

  // Error
  error_50: "#FFF0F0",
  error_100: "#FFD9D9",
  error_200: "#FFB3B3",
  error_300: "#FF8A8A",
  error_400: "#FF6666",
  error_500: "#EF4444",
  error_600: "#DC2626",
  error_700: "#B91C1C",
  error_800: "#991B1B",
  error_900: "#7F1D1D",
};

/**
 * Dark Theme
 * Dark backgrounds, light text
 */
export const darkTheme = {
  ...palette,

  // Neutral — dark mode: dark backgrounds, light foregrounds
  neutral_50: "#0F172A",
  neutral_100: "#1E293B",
  neutral_200: "#334155",
  neutral_300: "#475569",
  neutral_400: "#64748B",
  neutral_500: "#94A3B8",
  neutral_600: "#CBD5E1",
  neutral_700: "#E2E8F0",
  neutral_800: "#F1F5F9",
  neutral_900: "#FFFFFF",

  // Semantic surface tokens
  background: "#0F172A",
  surface: "#1E293B",
  surfaceVariant: "#273549",
  border: "#334155",
  borderSubtle: "#1E293B",
  onBackground: "#F1F5F9",
  onSurface: "#E2E8F0",
  onSurfaceVariant: "#94A3B8",
  placeholder: "#475569",

  // Sidebar
  sidebarBg: "#0B1120",
  sidebarActive: "#6C72FF1A",
  sidebarActiveBorder: "#6C72FF",
  sidebarText: "#94A3B8",
  sidebarActiveText: "#6C72FF",
};

/**
 * Light Theme
 * Light backgrounds, dark text
 */
export const lightTheme = {
  ...palette,

  // Neutral — light mode: light backgrounds, dark foregrounds
  neutral_50: "#FFFFFF",
  neutral_100: "#F8FAFC",
  neutral_200: "#E2E8F0",
  neutral_300: "#CBD5E1",
  neutral_400: "#94A3B8",
  neutral_500: "#64748B",
  neutral_600: "#475569",
  neutral_700: "#334155",
  neutral_800: "#1E293B",
  neutral_900: "#0F172A",

  // Semantic surface tokens
  background: "#F1F5F9",
  surface: "#FFFFFF",
  surfaceVariant: "#F8FAFC",
  border: "#E2E8F0",
  borderSubtle: "#F1F5F9",
  onBackground: "#0F172A",
  onSurface: "#1E293B",
  onSurfaceVariant: "#475569",
  placeholder: "#94A3B8",

  // Sidebar
  sidebarBg: "#FFFFFF",
  sidebarActive: "#6C72FF14",
  sidebarActiveBorder: "#6C72FF",
  sidebarText: "#475569",
  sidebarActiveText: "#6C72FF",
};

export type ThemeType = typeof darkTheme;
