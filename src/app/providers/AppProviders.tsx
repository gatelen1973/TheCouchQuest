import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { defaultAccentColor } from '../accentColor';
import { createDashboardTheme, getBrowserChromeThemeColor } from '../theme';
import {
  readStoredThemePreference,
  ThemePreferenceContext,
  useResolvedThemeMode,
  useThemePreference,
  writeStoredThemePreference,
  type ThemePreference,
} from '../themeMode';

function ThemedApp({ children }: { children: React.ReactNode }) {
  const { themePreference } = useThemePreference();
  const themeMode = useResolvedThemeMode(themePreference);
  const theme = React.useMemo(
    () => createDashboardTheme(themeMode, defaultAccentColor),
    [themeMode],
  );
  const previousThemeModeRef = React.useRef(themeMode);

  React.useEffect(() => {
    const color = getBrowserChromeThemeColor(themeMode);
    let synced = document.querySelector('meta[name="theme-color"][data-app-theme]');
    if (!synced) {
      synced = document.createElement('meta');
      synced.setAttribute('name', 'theme-color');
      synced.setAttribute('data-app-theme', '');
      document.head.appendChild(synced);
    }

    if (synced instanceof HTMLMetaElement) {
      synced.content = color;
    }
  }, [themeMode]);

  React.useEffect(() => {
    if (previousThemeModeRef.current === themeMode) {
      return;
    }

    previousThemeModeRef.current = themeMode;
    document.documentElement.classList.add('theme-mode-transition');

    const timeoutId = window.setTimeout(() => {
      document.documentElement.classList.remove('theme-mode-transition');
    }, 260);

    return () => {
      window.clearTimeout(timeoutId);
      document.documentElement.classList.remove('theme-mode-transition');
    };
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [themePreference, setThemePreferenceState] = React.useState<ThemePreference>(readStoredThemePreference);

  const setThemePreference = React.useCallback((preference: ThemePreference) => {
    setThemePreferenceState(preference);
    writeStoredThemePreference(preference);
  }, []);

  const value = React.useMemo(
    () => ({ themePreference, setThemePreference }),
    [setThemePreference, themePreference],
  );

  return (
    <ThemePreferenceContext.Provider value={value}>
      <ThemedApp>{children}</ThemedApp>
    </ThemePreferenceContext.Provider>
  );
}
