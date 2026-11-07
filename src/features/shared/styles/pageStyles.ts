import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import {
  APP_TABLE_CELL_HORIZONTAL_PADDING,
  APP_TABLE_CELL_VERTICAL_PADDING,
  APP_TABLE_ROW_HEIGHT,
  getChromeTokens,
  getFocusRing,
  getSurfaceTokens,
  radiusPx,
  uiRadii,
  uiFontWeights,
} from '../../../app/theme';

interface ReportShellOptions {
  maxWidth?: number | string;
}

export function reportShellSx(theme: Theme, options: ReportShellOptions = {}) {
  const { maxWidth = 1480 } = options;
  const chrome = getChromeTokens(theme);

  return {
    width: '100%',
    minWidth: { xs: '100%', md: '50%' },
    maxWidth,
    ml: 0,
    mr: 'auto',
    height: '100%',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    color: 'text.primary',
    borderRadius: radiusPx(uiRadii.surface),
    border: '1px solid',
    borderColor: 'divider',
    overflow: 'hidden',
    background: chrome.crmTableContainerBackground,
    backgroundImage: 'none',
    boxShadow: theme.appShadows.surface,
  };
}

export const reportHeaderSectionSx = {
  p: { xs: 2, md: 2.25 },
  borderBottom: '1px solid',
  borderBottomColor: 'divider',
};

export const pageHeaderTitleFontWeight = 600;

/** Shared title style for every page header in the top-left chrome. */
export const pageHeaderTitleSx = {
  fontWeight: pageHeaderTitleFontWeight,
  fontSize: '1.45rem',
  lineHeight: 1.1,
  overflowWrap: 'anywhere',
} as const;

export const recordSectionHeaderFontWeight = uiFontWeights.recordSectionHeader;

export const recordSectionHeaderTextSx = {
  fontWeight: recordSectionHeaderFontWeight,
  overflowWrap: 'anywhere',
} as const;

export const recordValueFontWeight = uiFontWeights.recordValue;

export const recordValueTextSx = {
  fontWeight: recordValueFontWeight,
  overflowWrap: 'anywhere',
} as const;

export const reportTitleSx = pageHeaderTitleSx;

export const reportSubtitleSx = {
  color: 'text.secondary',
  fontSize: 13.5,
};

export function workflowPanelSurfaceSx(theme: Theme) {
  const background = theme.palette.mode === 'light'
    ? theme.palette.background.paper
    : [
        `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.18)} 0%, ${alpha(theme.palette.background.paper, 0.96)} 100%)`,
        `linear-gradient(180deg, ${alpha(theme.palette.common.white, 0.04)} 0%, ${alpha(theme.palette.common.black, 0)} 100%)`,
      ].join(', ');

  return {
    border: '1px solid',
    borderColor: 'divider',
    background,
  };
}

export function reportFilterPanelSx(theme: Theme) {
  return {
    width: '100%',
    boxSizing: 'border-box',
    p: 1.5,
    borderRadius: radiusPx(uiRadii.panel),
    ...workflowPanelSurfaceSx(theme),
  };
}

export function operationalPanelSx(theme: Theme) {
  const surface = getSurfaceTokens(theme);

  return {
    borderRadius: radiusPx(uiRadii.panel),
    border: `1px solid ${surface.panelBorder}`,
    backgroundColor: surface.panelBackground,
    boxShadow: surface.panelShadow,
  };
}

/** Contrasting canvas behind opportunity detail report-view panels. */
export function opportunityReportViewCanvasSx(theme: Theme) {
  const chrome = getChromeTokens(theme);

  return {
    mx: { xs: -1.5, md: -2 },
    mt: { xs: -1.5, md: -2 },
    mb: { xs: -1.5, md: -2 },
    px: { xs: 1.5, md: 2 },
    pt: { xs: 1.5, md: 2 },
    pb: { xs: 2, md: 2.5 },
    backgroundColor: chrome.gridCanvasFill,
  };
}

/** Shared opaque theme fill for record tabs, action bars, and compact table headers. */
export function recordChromeBarBackground(theme: Theme) {
  return getSurfaceTokens(theme).recordChromeBackground;
}

export function recordDetailAccordionSurfaceSx(theme: Theme) {
  const surface = getSurfaceTokens(theme);
  const borderColor = recordDetailAccordionBorderColor(theme);

  return {
    background: `${surface.panelBackground} !important`,
    backgroundColor: `${surface.panelBackground} !important`,
    backgroundImage: 'none !important',
    color: `${theme.palette.text.primary} !important`,
    borderColor: `${borderColor} !important`,
  };
}

function recordDetailAccordionBorderColor(theme: Theme) {
  return getSurfaceTokens(theme).panelBorder;
}

export function recordDetailAccordionSx(theme: Theme) {
  const borderColor = recordDetailAccordionBorderColor(theme);
  const accordionSurface = recordDetailAccordionSurfaceSx(theme);

  return {
    borderRadius: radiusPx(uiRadii.panel),
    border: `1px solid ${borderColor} !important`,
    ...accordionSurface,
    boxShadow: `${getSurfaceTokens(theme).panelShadow} !important`,
    overflow: 'hidden',
    '&&': accordionSurface,
    '&& .MuiAccordionSummary-root, && .MuiAccordionDetails-root, && .MuiAccordion-region, && .MuiCollapse-root, && .MuiCollapse-wrapper, && .MuiCollapse-wrapperInner': {
      ...accordionSurface,
      color: 'inherit !important',
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
      color: 'inherit',
    },
    '&:before': { display: 'none' },
  };
}

export function recordDetailAccordionSummarySx(theme: Theme) {
  return {
    ...recordDetailAccordionSurfaceSx(theme),
    px: 2,
    minHeight: 64,
    '& .MuiAccordionSummary-content': { my: 0.5 },
  };
}

export function recordDetailAccordionDetailsSx(theme: Theme) {
  return {
    ...recordDetailAccordionSurfaceSx(theme),
    px: 2,
    pt: 0,
    pb: 2,
  };
}

export function compactActionButtonSx() {
  return {
    borderRadius: radiusPx(uiRadii.control),
    minHeight: 36,
    height: 36,
    px: 1.5,
    whiteSpace: 'nowrap',
  };
}

export function focusVisibleSx(theme: Theme) {
  return {
    outline: getFocusRing(theme),
    outlineOffset: -2,
  };
}

export const TABLE_ROW_CONTENT_MIN_HEIGHT = APP_TABLE_ROW_HEIGHT - (APP_TABLE_CELL_VERTICAL_PADDING * 2);

export const tableBodyCellSx = {
  borderBottomColor: 'divider',
  verticalAlign: 'middle',
  paddingTop: `${APP_TABLE_CELL_VERTICAL_PADDING}px`,
  paddingBottom: `${APP_TABLE_CELL_VERTICAL_PADDING}px`,
  paddingLeft: `${APP_TABLE_CELL_HORIZONTAL_PADDING}px`,
  paddingRight: `${APP_TABLE_CELL_HORIZONTAL_PADDING}px`,
  height: APP_TABLE_ROW_HEIGHT,
  maxHeight: APP_TABLE_ROW_HEIGHT,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export const tableClickableRowSx = {
  cursor: 'pointer',
  '& > *': tableBodyCellSx,
};

export const tableRowSx = {
  '& > *': tableBodyCellSx,
};

export const tableCenteredContentSx = {
  minHeight: TABLE_ROW_CONTENT_MIN_HEIGHT,
  display: 'flex',
  alignItems: 'center',
};

export const tableCenteredStackSx = {
  minHeight: TABLE_ROW_CONTENT_MIN_HEIGHT,
  justifyContent: 'center',
};

export const tableActionStackSx = {
  minHeight: TABLE_ROW_CONTENT_MIN_HEIGHT,
  py: 0.25,
  alignItems: 'center',
};
