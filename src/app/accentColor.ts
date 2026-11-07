import type { PaletteMode } from '@mui/material/styles';

export const accentColorOptions = [
  'emerald',
  'blue',
  'violet',
  'rose',
  'orange',
  'slate',
] as const;

export type AccentColorPreference = (typeof accentColorOptions)[number];

export interface AccentColorPalette {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

export interface AccentColorDefinition {
  key: AccentColorPreference;
  label: string;
  swatch: string;
  palette: Record<PaletteMode, AccentColorPalette>;
}

export const defaultAccentColor: AccentColorPreference = 'blue';

export const accentColorDefinitions: Record<AccentColorPreference, AccentColorDefinition> = {
  emerald: {
    key: 'emerald',
    label: 'Emerald',
    swatch: '#10b981',
    palette: {
      light: {
        main: '#059669',
        light: '#34d399',
        dark: '#047857',
        contrastText: '#f7fffb',
      },
      dark: {
        main: '#10b981',
        light: '#6ee7b7',
        dark: '#059669',
        contrastText: '#04150e',
      },
    },
  },
  blue: {
    key: 'blue',
    label: 'Blue',
    swatch: '#2f5f90',
    palette: {
      light: {
        main: '#2f5f90',
        light: '#5f87b0',
        dark: '#23486c',
        contrastText: '#f7fbff',
      },
      dark: {
        main: '#5d8fca',
        light: '#8bb2df',
        dark: '#3f6ea6',
        contrastText: '#05111f',
      },
    },
  },
  violet: {
    key: 'violet',
    label: 'Violet',
    swatch: '#7c6cf2',
    palette: {
      light: {
        main: '#6d5ce7',
        light: '#8d7ef0',
        dark: '#5645cc',
        contrastText: '#fbfaff',
      },
      dark: {
        main: '#8b7cf6',
        light: '#afa6fb',
        dark: '#6d5ce7',
        contrastText: '#120d2a',
      },
    },
  },
  rose: {
    key: 'rose',
    label: 'Rose',
    swatch: '#e2558f',
    palette: {
      light: {
        main: '#d94680',
        light: '#ee6ba0',
        dark: '#b93267',
        contrastText: '#fff7fb',
      },
      dark: {
        main: '#f06292',
        light: '#f48fb1',
        dark: '#d94680',
        contrastText: '#2b0816',
      },
    },
  },
  orange: {
    key: 'orange',
    label: 'Orange',
    swatch: '#f97316',
    palette: {
      light: {
        main: '#ea580c',
        light: '#fb7c37',
        dark: '#c2410c',
        contrastText: '#fff9f5',
      },
      dark: {
        main: '#fb923c',
        light: '#fdba74',
        dark: '#f97316',
        contrastText: '#2a1405',
      },
    },
  },
  slate: {
    key: 'slate',
    label: 'Slate',
    swatch: '#64748b',
    palette: {
      light: {
        main: '#475569',
        light: '#64748b',
        dark: '#334155',
        contrastText: '#f8fafc',
      },
      dark: {
        main: '#94a3b8',
        light: '#cbd5e1',
        dark: '#64748b',
        contrastText: '#0f172a',
      },
    },
  },
};

export function getAccentColorDefinition(accentColor: AccentColorPreference) {
  return accentColorDefinitions[accentColor];
}
