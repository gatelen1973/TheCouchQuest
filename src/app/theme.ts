import { alpha, createTheme } from '@mui/material/styles';
import type { Shadows, Theme } from '@mui/material/styles';
import { getAccentColorDefinition, type AccentColorPreference } from './accentColor';
import type { ResolvedThemeMode } from './themeMode';

export interface AppShadowTokens {
  none: string;
  panel: string;
  surface: string;
  raised: string;
  floating: string;
  overlay: string;
  shell: string;
  sidebar: string;
  drawer: string;
  toggle: string;
  menu: string;
  popover: string;
  dialog: string;
  toast: string;
  dashboardTile: string;
  kanbanCard: string;
  kanbanColumn: string;
  insetHighlight: string;
}

declare module '@mui/material/styles' {
  interface Theme {
    appShadows: AppShadowTokens;
  }

  interface ThemeOptions {
    appShadows?: AppShadowTokens;
  }
}

/** Shared corner radius for controls, fields, panels, and containers. */
export const uiCornerRadius = 6;

/** When false, list pages omit the Actions column. */
export const showActionsColumns = false;

export const uiRadii = {
  /** Scrollbars, progress bars, and other thin tracks. */
  track: 2,
  control: uiCornerRadius,
  panel: uiCornerRadius,
  surface: uiCornerRadius,
  hero: uiCornerRadius,
  /** Capsule shape. Circular marks use `50%` at the call site. */
  pill: 999,
} as const;

export const uiFontWeights = {
  recordSectionHeader: 600,
  recordValue: 500,
  emphasized: 700,
  sectionTitle: 800,
} as const;

/**
 * Standard spacing (in MUI theme spacing units) between fields within a single
 * form subsection. Keep field-to-field gaps referencing this token so the whole
 * page stays visually consistent.
 */
export const CRM_FORM_FIELD_GAP = 1.25;

export const APP_TABLE_ROW_HEIGHT = 42;
export const APP_TABLE_HEADER_ROW_HEIGHT = 36;
export const APP_TABLE_CELL_VERTICAL_PADDING = 6;
export const APP_TABLE_CELL_HORIZONTAL_PADDING = 6;

export const APP_TABLE_TWO_LINE_STACK_SPACING = 0.15;
export const APP_TABLE_PRIMARY_LINE_HEIGHT = 1.4;
export const APP_TABLE_SECONDARY_LINE_HEIGHT = 1.15;

export const APP_TABLE_CHIP_SIZE = 'small' as const;
/** Square cell/row hover fills. Do not reuse `uiRadii.control`. */
export const APP_GRID_HOVER_RADIUS = 0;

export function radiusPx(radius: number) {
  return `${radius}px`;
}

export function getFocusRing(theme: Theme, alphaValue = 0.42) {
  return `2px solid ${alpha(theme.palette.primary.main, alphaValue)}`;
}

export function getAppGridRowHoverBackground(theme: Theme) {
  return theme.palette.action.hover;
}

export function getChromeSearchInputBackground(theme: Theme) {
  return theme.palette.mode === 'dark'
    ? alpha(theme.palette.common.white, 0.06)
    : alpha(theme.palette.common.white, 0.78);
}

interface ModeColorTokens {
  /**
   * Base app canvas color used by `palette.background.default`, page wrappers, and outer shell areas.
   */
  appBackgroundDefault: string;
  /**
   * Surface color used by `palette.background.paper`, cards, menus, dialogs, and table containers.
   */
  appBackgroundPaper: string;
  /**
   * Full-viewport shell backdrop used in `getChromeTokens().shellBackground`.
   * This remains grayscale and should never be derived from the selected accent.
   */
  shellBackground: string;
  /**
   * Primary top-bar strip used by app shell and auth heading sections.
   */
  topBarBackground: string;
  /**
   * Secondary top-bar strip used for stacked bars and compact chrome rows.
   */
  topBarSecondaryBackground: string;
  /**
   * Shared chrome outline color for shell edges, menus, and section dividers.
   */
  shellBorder: string;
  /**
   * Neutral control fill for soft actions and hover surfaces.
   */
  softActionBackground: string;
  /**
   * Neutral border for soft controls and segmented surfaces.
   */
  softActionBorder: string;
  /**
   * Default text/icon tint used on soft controls.
   */
  softActionColor: string;
  /**
   * Muted label tone used in subtitles, captions, and secondary metadata.
   */
  mutedLabel: string;
  /**
   * Sidebar container gradient used in both app and auth shells.
   */
  sidebarBackground: string;
  /**
   * Drawer background used by `MuiDrawer` to keep navigation and panel surfaces grayscale.
   */
  drawerBackground: string;
  /**
   * Paper border color used by `MuiPaper` globally.
   */
  paperBorder: string;
  /**
   * Table divider tone used for `MuiTableCell` row separators.
   */
  tableCellBorderBottom: string;
  /**
   * Explicit table cell fill color; avoids inherited panel gradients changing perceived cell color.
   */
  tableCellBackground: string;
  /**
   * Header row fill color for table header cells.
   */
  tableHeaderCellBackground: string;
  /**
   * Shared opaque fill for record tab rows, floating action bars, and compact table headers.
   */
  recordChromeBackground: string;
  /**
   * Background for the CRM table container shell (the Paper wrapping CRM list grids).
   */
  crmTableContainerBackground: string;
  /**
   * Dashboard grid canvas fill used for tile editing surface.
   */
  gridCanvasFill: string;
  /**
   * Scrollbar thumb fill in resting state.
   */
  scrollbarThumb: string;
  /**
   * Scrollbar thumb fill on hover.
   */
  scrollbarThumbHover: string;
  /**
   * Scrollbar track fill.
   */
  scrollbarTrack: string;
  /**
   * Solid PWA / browser status-bar color. Gradients cannot be used in `theme-color`.
   * Matches the start of `topBarBackground`.
   */
  browserChromeColor: string;
}

const modeColorTokens: Record<ResolvedThemeMode, ModeColorTokens> = {
  light: {
    appBackgroundDefault: '#f5f7fa',
    appBackgroundPaper: '#ffffff',
    shellBackground: '#f8fafc',
    topBarBackground: 'linear-gradient(90deg, #edf1f6 0%, #e5ebf2 55%, #dde5ee 100%)',
    topBarSecondaryBackground: 'linear-gradient(90deg, rgba(248,250,253,0.88) 0%, rgba(238,243,248,0.88) 100%)',
    shellBorder: '#d7dde6',
    softActionBackground: '#ffffff',
    softActionBorder: '#d5dbe4',
    softActionColor: '#1f2937',
    mutedLabel: '#4b5563',
    sidebarBackground: 'linear-gradient(180deg, #f7f8fa 0%, #eef1f5 48%, #e7ebf0 100%)',
    drawerBackground: '#ffffff',
    paperBorder: '#d7dde6',
    tableCellBorderBottom: '#dce2ea',
    tableCellBackground: '#ffffff',
    tableHeaderCellBackground: '#eef2f6',
    recordChromeBackground: '#f9f9fa',
    crmTableContainerBackground: '#ffffff',
    gridCanvasFill: '#eef2f6',
    scrollbarThumb: '#a8b5c5',
    scrollbarThumbHover: '#7f8da0',
    scrollbarTrack: '#e7ecf3',
    browserChromeColor: '#edf1f6',
  },
  dark: {
    appBackgroundDefault: '#0d0d0f',
    appBackgroundPaper: '#16171a',
    shellBackground:
      'rgba(255,255,255,0.03)',
    topBarBackground: 'linear-gradient(90deg, #050505 0%, #0b0b0c 55%, #121214 100%)',
    topBarSecondaryBackground: 'linear-gradient(90deg, rgba(8,8,9,0.62) 0%, rgba(18,18,20,0.68) 100%)',
    shellBorder: 'rgba(255,255,255,0.10)',
    softActionBackground: 'rgba(12,12,13,0.78)',
    softActionBorder: 'rgba(255,255,255,0.10)',
    softActionColor: 'rgba(229,231,235,0.90)',
    mutedLabel: 'rgba(198,201,207,0.78)',
    sidebarBackground: 'linear-gradient(180deg, #030303 0%, #080809 22%, #111113 100%)',
    drawerBackground: 'linear-gradient(180deg, #040506 0%, #0a0b0d 24%, #101216 56%, #15181e 100%)',
    paperBorder: 'rgba(255,255,255,0.06)',
    tableCellBorderBottom: 'rgba(255,255,255,0.12)',
    tableCellBackground: '#16171a',
    tableHeaderCellBackground: '#16171a',
    recordChromeBackground: '#1f2023',
    crmTableContainerBackground: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))',
    gridCanvasFill: 'rgba(255,255,255,0.06)',
    scrollbarThumb: 'rgba(144, 167, 193, 0.44)',
    scrollbarThumbHover: 'rgba(174, 196, 220, 0.56)',
    scrollbarTrack: 'rgba(8, 12, 18, 0.72)',
    browserChromeColor: '#050505',
  },
};

export function getBrowserChromeThemeColor(mode: ResolvedThemeMode) {
  return modeColorTokens[mode].browserChromeColor;
}

export function getScrollbarTokens(theme: Theme) {
  const tokens = modeColorTokens[theme.palette.mode];
  return {
    thumb: tokens.scrollbarThumb,
    thumbHover: tokens.scrollbarThumbHover,
    track: tokens.scrollbarTrack,
  };
}

/** Vertical table scrollbar. The thumb matches the row highlight; the track matches the solid table surface. */
export function getTableVerticalScrollbarSx(thumb: string, track: string) {
  return {
    scrollbarColor: `${thumb} ${track}`,
    '&::-webkit-scrollbar:vertical': {
      width: '10px',
    },
    '&::-webkit-scrollbar-track:vertical': {
      backgroundColor: track,
    },
    '&::-webkit-scrollbar-thumb:vertical': {
      backgroundColor: thumb,
      borderRadius: radiusPx(uiRadii.track),
      border: `2px solid ${track}`,
    },
    '&::-webkit-scrollbar-thumb:vertical:hover': {
      backgroundColor: thumb,
    },
  };
}

const modeShadowTokens: Record<ResolvedThemeMode, AppShadowTokens> = {
  light: {
    none: 'none',
    panel: '0 3px 10px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.05)',
    surface: '0 8px 20px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.05)',
    raised: '0 12px 28px rgba(15, 23, 42, 0.11), 0 3px 8px rgba(15, 23, 42, 0.07)',
    floating: '0 18px 42px rgba(15, 23, 42, 0.14), 0 6px 16px rgba(15, 23, 42, 0.08)',
    overlay: '0 24px 56px rgba(15, 23, 42, 0.18), 0 10px 24px rgba(15, 23, 42, 0.10)',
    shell: 'inset 0 1px 0 rgba(255,255,255,0.82), 0 8px 20px rgba(33,38,45,0.10)',
    sidebar: 'inset -1px 0 0 rgba(255,255,255,0.72), 14px 0 34px rgba(33,38,45,0.10)',
    drawer: '-16px 0 44px rgba(15, 23, 42, 0.16), -4px 0 14px rgba(15, 23, 42, 0.08)',
    toggle: '0 8px 22px rgba(15, 23, 42, 0.14), 0 2px 6px rgba(15, 23, 42, 0.08)',
    menu: '0 16px 34px rgba(15, 23, 42, 0.14), 0 4px 12px rgba(15, 23, 42, 0.08)',
    popover: '0 18px 40px rgba(15, 23, 42, 0.15), 0 6px 16px rgba(15, 23, 42, 0.08)',
    dialog: '0 26px 72px rgba(15, 23, 42, 0.20), 0 10px 28px rgba(15, 23, 42, 0.12)',
    toast: '0 18px 38px rgba(15, 23, 42, 0.16), 0 6px 14px rgba(15, 23, 42, 0.10)',
    dashboardTile: '0 10px 24px rgba(15, 23, 42, 0.11), 0 2px 8px rgba(15, 23, 42, 0.07)',
    kanbanCard: '0 8px 18px rgba(15, 23, 42, 0.10), 0 2px 6px rgba(15, 23, 42, 0.06)',
    kanbanColumn: '0 10px 24px rgba(15, 23, 42, 0.08), 0 2px 8px rgba(15, 23, 42, 0.05)',
    insetHighlight: 'inset 0 1px 0 rgba(255,255,255,0.74)',
  },
  dark: {
    none: 'none',
    panel: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 20px rgba(0,0,0,0.24)',
    surface: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 14px 30px rgba(0,0,0,0.28)',
    raised: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 18px 42px rgba(0,0,0,0.34)',
    floating: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 22px 48px rgba(0,0,0,0.40)',
    overlay: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 28px 72px rgba(0,0,0,0.48)',
    shell: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 20px rgba(0,0,0,0.32)',
    sidebar: 'inset -1px 0 0 rgba(255,255,255,0.04), 14px 0 34px rgba(0,0,0,0.28)',
    drawer: 'inset 1px 0 0 rgba(255,255,255,0.05), -18px 0 48px rgba(0,0,0,0.42)',
    toggle: '0 8px 22px rgba(0,0,0,0.38)',
    menu: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 18px 34px rgba(0,0,0,0.42)',
    popover: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 44px rgba(0,0,0,0.44)',
    dialog: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 28px 72px rgba(0,0,0,0.48)',
    toast: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 34px rgba(0,0,0,0.42)',
    dashboardTile: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 14px 30px rgba(0,0,0,0.30)',
    kanbanCard: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 10px 24px rgba(0,0,0,0.30)',
    kanbanColumn: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 14px 30px rgba(0,0,0,0.26)',
    insetHighlight: 'inset 0 1px 0 rgba(255,255,255,0.05)',
  },
};

export function createMuiShadows(tokens: AppShadowTokens): Shadows {
  return [
    tokens.none,
    tokens.panel,
    tokens.surface,
    tokens.raised,
    tokens.floating,
    tokens.floating,
    tokens.overlay,
    tokens.overlay,
    tokens.overlay,
    tokens.overlay,
    tokens.overlay,
    tokens.overlay,
    tokens.dialog,
    tokens.dialog,
    tokens.dialog,
    tokens.dialog,
    tokens.dialog,
    tokens.dialog,
    tokens.dialog,
    tokens.dialog,
    tokens.dialog,
    tokens.dialog,
    tokens.dialog,
    tokens.dialog,
    tokens.dialog,
  ] as Shadows;
}

/**
 * Semantic status colors are intentionally fixed across accent choices.
 * They communicate workflow meaning (success/warning) rather than personalization.
 */
const semanticStatusColors = {
  successMain: '#2f8f6b',
  warningMain: '#c68a2f',
} as const;

/**
 * Shared shell and overlay tokens used outside the MUI component override layer.
 *
 * The app already has a strong visual identity, so this helper centralizes the subtle surface and
 * text treatments that should stay aligned across shell chrome, menus, and feature-level panels.
 */
export function getChromeTokens(theme: Theme) {
  const isDark = theme.palette.mode === 'dark';
  const modeTokens = modeColorTokens[isDark ? 'dark' : 'light'];
  const accent = theme.palette.primary.main;

  return {
    shellBackground: modeTokens.shellBackground,
    topBarBackground: modeTokens.topBarBackground,
    topBarSecondaryBackground: modeTokens.topBarSecondaryBackground,
    shellBorder: modeTokens.shellBorder,
    shellShadow: theme.appShadows.shell,
    softActionBackground: modeTokens.softActionBackground,
    softActionBorder: modeTokens.softActionBorder,
    softActionColor: modeTokens.softActionColor,
    menuBackground: alpha(theme.palette.background.paper, isDark ? 0.94 : 0.98),
    menuBorder: alpha(theme.palette.divider, 0.9),
    tilePayloadBackground: alpha(theme.palette.background.paper, isDark ? 0.12 : 0.76),
    tilePayloadText: alpha(theme.palette.text.primary, isDark ? 0.94 : 0.88),
    tilePayloadBorder: alpha(theme.palette.divider, isDark ? 0.2 : 0.5),
    crmTableContainerBackground: modeTokens.crmTableContainerBackground,
    userAvatarBackground: accent,
    userAvatarColor: theme.palette.primary.contrastText,
    mutedLabel: modeTokens.mutedLabel,
    gridCanvasFill: modeTokens.gridCanvasFill,
    accent,
    accentSoft: alpha(accent, isDark ? 0.16 : 0.08),
    accentBorder: alpha(accent, isDark ? 0.28 : 0.18),
    sidebarBackground: modeTokens.sidebarBackground,
    sidebarShadow: theme.appShadows.sidebar,
  };
}

export function getSurfaceTokens(theme: Theme) {
  const isDark = theme.palette.mode === 'dark';
  const modeTokens = modeColorTokens[isDark ? 'dark' : 'light'];

  return {
    panelBackground: alpha(theme.palette.background.paper, isDark ? 0.88 : 0.98),
    panelBorder: modeTokens.paperBorder,
    recordChromeBackground: modeTokens.recordChromeBackground,
    softControlBackground: alpha(
      isDark ? theme.palette.common.white : theme.palette.grey[700],
      isDark ? 0.08 : 0.06,
    ),
    softControlBackgroundSelected: alpha(
      isDark ? theme.palette.common.white : theme.palette.grey[700],
      isDark ? 0.12 : 0.16,
    ),
    softControlBackgroundHover: alpha(
      isDark ? theme.palette.common.white : theme.palette.grey[700],
      isDark ? 0.12 : 0.1,
    ),
    softControlBackgroundSelectedHover: alpha(
      isDark ? theme.palette.common.white : theme.palette.grey[700],
      isDark ? 0.16 : 0.22,
    ),
    selectedBorder: alpha(theme.palette.primary.main, isDark ? 0.42 : 0.32),
    hoverBorder: alpha(theme.palette.primary.main, isDark ? 0.5 : 0.36),
    insetHighlight: theme.appShadows.insetHighlight,
    panelShadow: theme.appShadows.panel,
    surfaceShadow: theme.appShadows.surface,
    floatingShadow: theme.appShadows.floating,
  };
}

export function createDashboardTheme(mode: ResolvedThemeMode, accentColor: AccentColorPreference) {
  const isDark = mode === 'dark';
  const modeTokens = modeColorTokens[mode];
  const appShadows = modeShadowTokens[mode];
  const accentPalette = getAccentColorDefinition(accentColor).palette[mode];
  const actionHoverColor = isDark ? '#262626b8' : '#edf2f7';
  const actionSelectedColor = isDark ? '#262626b8'  : '#e4ebf3';

  return createTheme({
    appShadows,
    palette: {
      mode,
      contrastThreshold: 4.5,
      divider: modeTokens.paperBorder,
      primary: {
        main: accentPalette.main,
        light: accentPalette.light,
        dark: accentPalette.dark,
        contrastText: accentPalette.contrastText,
      },
      secondary: {
        main: isDark ? accentPalette.light : accentPalette.dark,
      },
      background: {
        // App/page surface baseline for all non-accented backgrounds.
        default: modeTokens.appBackgroundDefault,
        // Elevated panels, cards, dialogs, menus, and table wrappers.
        paper: modeTokens.appBackgroundPaper,
      },
      text: {
        primary: isDark ? '#f4f5f7' : '#111827',
        secondary: isDark ? 'rgba(226,229,234,0.76)' : '#4b5563',
        disabled: isDark ? 'rgba(226,229,234,0.44)' : '#7a8494',
      },
      action: {
        hover: actionHoverColor,
        selected: actionSelectedColor,
        disabled: isDark ? 'rgba(226,229,234,0.28)' : '#8b95a5',
        disabledBackground: isDark ? 'rgba(255,255,255,0.08)' : '#edf1f5',
      },
      success: {
        main: semanticStatusColors.successMain,
      },
      warning: {
        main: semanticStatusColors.warningMain,
      },
    },
    shape: {
      borderRadius: uiRadii.control,
    },
    shadows: createMuiShadows(appShadows),
    typography: {
      fontFamily: '"Geist Sans", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 700,
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: radiusPx(uiRadii.surface),
            border: `1px solid ${modeTokens.paperBorder}`,
            boxShadow: appShadows.surface,
            backgroundImage: isDark ? undefined : 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: radiusPx(uiRadii.panel),
            boxShadow: appShadows.panel,
            backgroundImage: isDark ? undefined : 'none',
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            boxShadow: appShadows.panel,
            backgroundImage: isDark ? undefined : 'none',
            '&:before': {
              display: 'none',
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: modeTokens.drawerBackground,
            backgroundImage: isDark ? undefined : 'none',
            boxShadow: appShadows.drawer,
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            colorScheme: mode,
            scrollbarColor: `${modeTokens.scrollbarThumb} ${modeTokens.scrollbarTrack}`,
          },
          '*, *::before, *::after': {
            scrollbarWidth: 'thin',
            scrollbarColor: `${modeTokens.scrollbarThumb} ${modeTokens.scrollbarTrack}`,
          },
          '.theme-mode-transition *, .theme-mode-transition *::before, .theme-mode-transition *::after': {
            transition: [
              'background-color 220ms ease',
              'border-color 220ms ease',
              'color 220ms ease',
              'fill 220ms ease',
              'stroke 220ms ease',
              'box-shadow 220ms ease',
            ].join(', '),
          },
          '*::-webkit-scrollbar': {
            width: '10px',
            height: '10px',
          },
          '*::-webkit-scrollbar-track': {
            backgroundColor: modeTokens.scrollbarTrack,
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: modeTokens.scrollbarThumb,
            borderRadius: radiusPx(uiRadii.track),
            border: `2px solid ${modeTokens.scrollbarTrack}`,
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: modeTokens.scrollbarThumbHover,
          },
          '*::-webkit-scrollbar-corner': {
            backgroundColor: modeTokens.scrollbarTrack,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: radiusPx(uiRadii.control),
            textTransform: 'none',
            fontWeight: 700,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: radiusPx(uiRadii.control),
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: radiusPx(uiRadii.control),
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            borderRadius: radiusPx(uiRadii.control),
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: radiusPx(uiRadii.control),
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            borderRadius: radiusPx(uiRadii.control),
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: radiusPx(uiRadii.track),
            overflow: 'hidden',
          },
          bar: {
            borderRadius: radiusPx(uiRadii.track),
          },
          bar1: {
            borderRadius: radiusPx(uiRadii.track),
          },
          bar2: {
            borderRadius: radiusPx(uiRadii.track),
          },
        },
      },
      MuiSkeleton: {
        styleOverrides: {
          text: {
            borderRadius: radiusPx(uiRadii.track),
          },
          rectangular: {
            borderRadius: radiusPx(uiRadii.track),
          },
          rounded: {
            borderRadius: radiusPx(uiRadii.control),
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: radiusPx(uiRadii.panel),
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: radiusPx(uiRadii.surface),
            boxShadow: appShadows.dialog,
            backgroundImage: isDark ? undefined : 'none',
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: radiusPx(uiRadii.panel),
            boxShadow: appShadows.menu,
            backgroundImage: isDark ? undefined : 'none',
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            borderRadius: radiusPx(uiRadii.panel),
            boxShadow: appShadows.popover,
            backgroundImage: isDark ? undefined : 'none',
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            borderRadius: radiusPx(uiRadii.surface),
            ...getTableVerticalScrollbarSx(actionHoverColor, modeTokens.appBackgroundPaper),
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            transition: 'background-color 120ms ease',
            '&.MuiTableRow-head': {
              height: APP_TABLE_HEADER_ROW_HEIGHT,
              maxHeight: APP_TABLE_HEADER_ROW_HEIGHT,
            },
            '&:not(.MuiTableRow-head):not(.MuiTableRow-footer)': {
              height: APP_TABLE_ROW_HEIGHT,
              maxHeight: APP_TABLE_ROW_HEIGHT,
            },
            '&.MuiTableRow-hover:hover': {
              backgroundColor: actionHoverColor,
            },
            '&.MuiTableRow-hover:hover > .MuiTableCell-body': {
              backgroundColor: 'transparent',
              backgroundImage: 'none',
              borderRadius: 0,
            },
            '&.Mui-selected, &.Mui-selected:hover': {
              backgroundColor: actionSelectedColor,
            },
            '&.Mui-selected > .MuiTableCell-body, &.Mui-selected:hover > .MuiTableCell-body': {
              backgroundColor: 'transparent',
              backgroundImage: 'none',
              borderRadius: 0,
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottomColor: modeTokens.tableCellBorderBottom,
            backgroundColor: modeTokens.tableCellBackground,
          },
          head: {
            height: APP_TABLE_HEADER_ROW_HEIGHT,
            maxHeight: APP_TABLE_HEADER_ROW_HEIGHT,
            backgroundColor: modeTokens.tableHeaderCellBackground,
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: APP_TABLE_CELL_HORIZONTAL_PADDING,
            paddingRight: APP_TABLE_CELL_HORIZONTAL_PADDING,
            lineHeight: 1.2,
            fontWeight: 700,
            whiteSpace: 'nowrap',
          },
          body: {
            height: APP_TABLE_ROW_HEIGHT,
            maxHeight: APP_TABLE_ROW_HEIGHT,
            backgroundColor: modeTokens.tableCellBackground,
            transition: 'background-color 120ms ease',
            paddingTop: APP_TABLE_CELL_VERTICAL_PADDING,
            paddingBottom: APP_TABLE_CELL_VERTICAL_PADDING,
            paddingLeft: APP_TABLE_CELL_HORIZONTAL_PADDING,
            paddingRight: APP_TABLE_CELL_HORIZONTAL_PADDING,
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '& .MuiStack-root': {
              minWidth: 0,
            },
            '& .MuiTypography-root': {
              minWidth: 0,
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
            '& .MuiTypography-body2': {
              lineHeight: APP_TABLE_PRIMARY_LINE_HEIGHT,
            },
            '& .MuiTypography-caption': {
              lineHeight: APP_TABLE_SECONDARY_LINE_HEIGHT,
            },
            '& .MuiButton-root:hover': {
              backgroundColor: 'transparent',
            },
          },
          footer: {
            backgroundColor: modeTokens.tableCellBackground,
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: APP_TABLE_CELL_HORIZONTAL_PADDING,
            paddingRight: APP_TABLE_CELL_HORIZONTAL_PADDING,
            whiteSpace: 'normal',
            overflow: 'visible',
            textOverflow: 'clip',
          },
        },
      },
    },
  });
}
