import { alpha, type Theme } from '@mui/material/styles';
import {
  APP_GRID_HOVER_RADIUS,
  APP_TABLE_CELL_HORIZONTAL_PADDING,
  APP_TABLE_HEADER_ROW_HEIGHT,
  APP_TABLE_ROW_HEIGHT,
  getAppGridRowHoverBackground,
  radiusPx,
} from '../../../app/theme';
import { getListGridActionIconColor } from './AppSemanticActionIcons';

export const GRID_VIEW_LIST_TOKENS = {
  skeletonRowCount: 25,
  overscanRows: 24,
  density: {
    standardRowHeight: APP_TABLE_ROW_HEIGHT,
    comfortableRowHeight: 52,
    standardHeaderHeight: APP_TABLE_HEADER_ROW_HEIGHT,
    comfortableHeaderHeight: 42,
  },
  column: {
    actionWidth: 72,
    defaultMinWidth: 80,
    defaultFlexibleMinWidth: 140,
    defaultMaxWidth: 720,
    resizeStep: 16,
    resizeHandleWidth: 10,
  },
  header: {
    paddingY: 0.75,
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 1.25,
  },
  cell: {
    horizontalPadding: APP_TABLE_CELL_HORIZONTAL_PADDING,
    paddingY: 0.5,
    multilinePaddingY: 0.25,
    multilineLineHeight: 1.2,
    multilineClamp: 2,
  },
  icon: {
    sortSize: 18,
    inactiveSortSize: 16,
  },
  actionIcon: {
    mutedOpacity: {
      light: 0.68,
      dark: 0.75,
    },
    hoverOpacity: {
      light: 0.88,
      dark: 0.82,
    },
    hoverBackgroundOpacity: 0.08,
  },
  resizeHandle: {
    lineWidth: 2,
    lineInset: 6,
    lineRadius: 999,
    activeOpacity: 0.88,
    focusOutlineWidth: 2,
    focusOutlineOffset: -2,
    /** Double-ended arrow. Use for every column-resize handle and drag-session body cursor. */
    cursor: 'ew-resize',
  },
  resultBar: {
    paddingX: { xs: 1, md: 1.25 },
    paddingY: 0.5,
    minHeight: 30,
  },
  emptyState: {
    minWidth: 520,
    paddingY: 6,
  },
  skeleton: {
    heightMax: 28,
    heightInset: 12,
    firstColumnWidth: '72%',
    defaultColumnWidth: '58%',
    actionColumnWidth: 62,
  },
} as const;

/** `neutral` is the chromeless list-table Actions tint (white on dark chrome). */
export type GridViewActionIconColor = 'primary' | 'warning' | 'error' | 'success' | 'info' | 'neutral';

export function getMutedGridViewActionIconButtonSx(
  theme: Theme,
  paletteColor: GridViewActionIconColor,
) {
  const main = paletteColor === 'neutral'
    ? getListGridActionIconColor(theme)
    : theme.palette[paletteColor].main;
  const isDark = theme.palette.mode === 'dark';
  const mutedOpacity = isDark
    ? GRID_VIEW_LIST_TOKENS.actionIcon.mutedOpacity.dark
    : GRID_VIEW_LIST_TOKENS.actionIcon.mutedOpacity.light;
  const hoverOpacity = isDark
    ? GRID_VIEW_LIST_TOKENS.actionIcon.hoverOpacity.dark
    : GRID_VIEW_LIST_TOKENS.actionIcon.hoverOpacity.light;

  return {
    color: alpha(main, mutedOpacity),
    '& .MuiSvgIcon-root': {
      color: 'inherit',
    },
    '&:hover:not(.Mui-disabled)': {
      color: alpha(main, hoverOpacity),
      backgroundColor: alpha(main, GRID_VIEW_LIST_TOKENS.actionIcon.hoverBackgroundOpacity),
    },
  };
}

export function getGridViewListAppearance(theme: Theme) {
  const isDark = theme.palette.mode === 'dark';
  const headerTextColor = isDark
    ? alpha(theme.palette.common.white, 0.84)
    : theme.palette.text.secondary;
  const bodyTextColor = isDark
    ? alpha(theme.palette.common.white, 0.84)
    : theme.palette.text.primary;

  return {
    surfaceBackground: theme.palette.background.paper,
    headerBackground: isDark ? theme.palette.background.paper : '#eef2f6',
    headerTextColor,
    bodyTextColor,
    rowHoverOverlay: getAppGridRowHoverBackground(theme),
    highlightBorderRadius: radiusPx(APP_GRID_HOVER_RADIUS),
    rowBorderColor: theme.palette.divider,
    inactiveSortIconColor: isDark
      ? alpha(theme.palette.common.white, 0.44)
      : theme.palette.text.secondary,
    inactiveSortIconHoverColor: isDark
      ? alpha(theme.palette.common.white, 0.76)
      : theme.palette.text.primary,
    skeletonBackgroundColor: alpha(theme.palette.text.primary, isDark ? 0.16 : 0.1),
    skeletonHighlightColor: alpha(theme.palette.text.primary, isDark ? 0.28 : 0.18),
    accentColor: theme.palette.primary.main,
  };
}
