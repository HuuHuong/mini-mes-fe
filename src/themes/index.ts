import { darkTheme, lightTheme } from "./colors";

export type ThemeMode = "light" | "dark";

export type Colors = typeof darkTheme;

export const AppThemes: Record<ThemeMode, Colors> = {
  dark: darkTheme,
  light: lightTheme,
};

export { darkTheme, lightTheme };
export type { ThemeType } from "./colors";
export { ThemeProvider } from "./ThemeProvider";
