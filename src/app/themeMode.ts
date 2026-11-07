import React, { useSyncExternalStore } from 'react';

export type ResolvedThemeMode = 'light' | 'dark';
export type ThemePreference = 'light' | 'dark' | 'system';

interface ThemePreferenceContextValue {
  themePreference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => void;
}

export const ThemePreferenceContext = React.createContext<ThemePreferenceContextValue | null>(null);

export function useThemePreference() {
  const context = React.useContext(ThemePreferenceContext);
  if (!context) {
    throw new Error('useThemePreference must be used within AppProviders.');
  }

  return context;
}

const THEME_PREFERENCE_STORAGE_KEY = 'dashboard.theme';

function getSystemThemeMode(): ResolvedThemeMode {
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return 'light';
}

function subscribeToSystemThemeMode(onStoreChange: () => void) {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => undefined;
  }

  const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

  if (typeof mediaQueryList.addEventListener === 'function') {
    mediaQueryList.addEventListener('change', onStoreChange);
    return () => mediaQueryList.removeEventListener('change', onStoreChange);
  }

  mediaQueryList.addListener(onStoreChange);
  return () => mediaQueryList.removeListener(onStoreChange);
}

export function resolveThemeMode(preference: ThemePreference, systemThemeMode: ResolvedThemeMode): ResolvedThemeMode {
  return preference === 'system' ? systemThemeMode : preference;
}

export function useResolvedThemeMode(preference: ThemePreference): ResolvedThemeMode {
  const systemThemeMode = useSyncExternalStore(
    subscribeToSystemThemeMode,
    getSystemThemeMode,
    (): ResolvedThemeMode => 'light',
  );
  return resolveThemeMode(preference, systemThemeMode);
}

export function readStoredThemePreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(THEME_PREFERENCE_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    // Ignore storage failures and fall back to the system theme.
  }

  return 'system';
}

export function writeStoredThemePreference(preference: ThemePreference) {
  try {
    window.localStorage.setItem(THEME_PREFERENCE_STORAGE_KEY, preference);
  } catch {
    // Ignore storage failures and keep the in-memory preference.
  }
}
