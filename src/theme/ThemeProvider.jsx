import React from "react";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";
import createTheme from "./appTheme";

export const ThemeProvider = ({ children, value = createTheme() }) => (
  <EmotionThemeProvider theme={value}>{children}</EmotionThemeProvider>
);

export { useTheme } from "emotion-theming";

export default ThemeProvider;
