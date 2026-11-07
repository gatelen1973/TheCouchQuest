import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import SwapVertIcon from '@mui/icons-material/SwapVertOutlined';
import { useTheme } from '@mui/material/styles';
import { AppTableSortLabel } from './AppTableSortLabel';
import { getTableVerticalScrollbarSx } from '../../../app/theme';
import { getGridViewListAppearance, GRID_VIEW_LIST_TOKENS } from './GridViewList.styles';

export interface ContinuousListGridColumn<TRow, TColumnId extends string, TSortBy extends string> {
  id: TColumnId | 'actions';
  label: string;
  sortBy?: TSortBy;
  sortable?: boolean;
  valueType?: 'currency';
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  flex?: number;
  cellClassName?: string;
  headerClassName?: string;
  renderHeader?: () => React.ReactNode;
  suppressInactiveSortIcon?: boolean;
  renderCell: (row: TRow) => React.ReactNode;
}

export interface ContinuousListGridProps<TRow, TColumnId extends string, TSortBy extends string> {
  rowsByIndex: Array<TRow | undefined>;
  totalCount: number;
  columns: Array<ContinuousListGridColumn<TRow, TColumnId, TSortBy>>;
  getRowKey: (row: TRow) => React.Key;
  sortField: TColumnId;
  sortDirection: 'asc' | 'desc';
  density: 'standard' | 'comfortable';
  loading: boolean;
  scrollResetKey: string;
  toolbar: React.ReactNode;
  emptyState: React.ReactNode;
  headerBackground?: string;
  headerTextColor?: string;
  bodyTextColor?: string;
  onSortColumn: (column: ContinuousListGridColumn<TRow, TColumnId, TSortBy>) => void;
  onColumnWidthChange?: (columnId: TColumnId, width: number) => void;
  onVisibleRangeChange: (range: { startIndex: number; endIndex: number }) => void;
  onRowClick?: (row: TRow) => void;
  multilineColumnIds?: readonly TColumnId[];
  actionsCellClassName?: string;
}

interface ColumnResizeState<TColumnId extends string> {
  columnId: TColumnId;
  startX: number;
  startWidth: number;
  width: number;
  minWidth: number;
  maxWidth: number;
}

interface ColumnResizePreview<TColumnId extends string> {
  columnId: TColumnId;
  width: number;
}

const ACTION_COLUMN_GRID_PLACEMENT = '-2 / -1';
const SELECTION_COLUMN_GRID_PLACEMENT = '1 / 2';
const CASH_VALUE_COLUMN_CLASS_NAME = 'grid-view-cash-value-column';

function mergeClassNames(...classNames: Array<string | false | null | undefined>) {
  const merged = classNames.filter(Boolean).join(' ');
  return merged || undefined;
}

function isCashValueColumn<TRow, TColumnId extends string, TSortBy extends string>(
  column: ContinuousListGridColumn<TRow, TColumnId, TSortBy>,
) {
  return column.valueType === 'currency';
}

function getColumnContentJustification<TRow, TColumnId extends string, TSortBy extends string>(
  column: ContinuousListGridColumn<TRow, TColumnId, TSortBy>,
) {
  if (column.id === 'actions' || column.id === 'selection') {
    return 'center';
  }

  return isCashValueColumn(column) ? 'flex-end' : 'flex-start';
}

function getDensityRowHeight(density: ContinuousListGridProps<unknown, string, string>['density']) {
  return density === 'comfortable'
    ? GRID_VIEW_LIST_TOKENS.density.comfortableRowHeight
    : GRID_VIEW_LIST_TOKENS.density.standardRowHeight;
}

function getDensityHeaderHeight(density: ContinuousListGridProps<unknown, string, string>['density']) {
  return density === 'comfortable'
    ? GRID_VIEW_LIST_TOKENS.density.comfortableHeaderHeight
    : GRID_VIEW_LIST_TOKENS.density.standardHeaderHeight;
}

function isResizableColumnId<TColumnId extends string>(columnId: TColumnId | 'actions'): columnId is TColumnId {
  return columnId !== 'actions' && columnId !== 'selection';
}

function getColumnMinWidth<TRow, TColumnId extends string, TSortBy extends string>(
  column: ContinuousListGridColumn<TRow, TColumnId, TSortBy>,
) {
  return column.minWidth ?? (
    column.id === 'actions'
      ? GRID_VIEW_LIST_TOKENS.column.actionWidth
      : GRID_VIEW_LIST_TOKENS.column.defaultMinWidth
  );
}

function getColumnMaxWidth<TRow, TColumnId extends string, TSortBy extends string>(
  column: ContinuousListGridColumn<TRow, TColumnId, TSortBy>,
) {
  return column.maxWidth ?? GRID_VIEW_LIST_TOKENS.column.defaultMaxWidth;
}

function clampColumnWidth(width: number, minWidth: number, maxWidth: number) {
  return Math.min(maxWidth, Math.max(minWidth, Math.round(width)));
}

function buildGridTemplate<TRow, TColumnId extends string, TSortBy extends string>(
  columns: Array<ContinuousListGridColumn<TRow, TColumnId, TSortBy>>,
) {
  const tracks = columns.map((column) => {
    if (column.id === 'actions') {
      return `${column.width ?? GRID_VIEW_LIST_TOKENS.column.actionWidth}px`;
    }

    if (typeof column.width === 'number') {
      return `${column.width}px`;
    }

    const minWidth = column.minWidth ?? (
      column.id === 'actions'
        ? GRID_VIEW_LIST_TOKENS.column.actionWidth
        : GRID_VIEW_LIST_TOKENS.column.defaultFlexibleMinWidth
    );
    const maxWidth = column.maxWidth;
    const flex = column.flex ?? 1;
    const flexibleTrack = `minmax(${minWidth}px, ${flex}fr)`;

    return typeof maxWidth === 'number'
      ? `minmax(${minWidth}px, ${maxWidth}px)`
      : flexibleTrack;
  });

  if (shouldAddActionSpacerTrack(columns)) {
    const actionColumnIndex = columns.findIndex((column) => column.id === 'actions');
    tracks.splice(actionColumnIndex, 0, 'minmax(0, 1fr)');
  }

  return tracks.join(' ');
}

function getGridMinimumWidth<TRow, TColumnId extends string, TSortBy extends string>(
  columns: Array<ContinuousListGridColumn<TRow, TColumnId, TSortBy>>,
) {
  return columns.reduce((total, column) => {
    if (typeof column.width === 'number') {
      return total + column.width;
    }

    return total + getColumnMinWidth(column);
  }, 0);
}

function shouldAddActionSpacerTrack<TRow, TColumnId extends string, TSortBy extends string>(
  columns: Array<ContinuousListGridColumn<TRow, TColumnId, TSortBy>>,
) {
  const hasActionColumn = columns.some((column) => column.id === 'actions');
  const hasOpenFlexibleDataColumn = columns.some((column) => (
    column.id !== 'actions'
      && typeof column.width !== 'number'
      && typeof column.maxWidth !== 'number'
  ));

  return hasActionColumn && !hasOpenFlexibleDataColumn;
}

function getColumnGridPlacement(columnId: string) {
  if (columnId === 'actions') {
    return ACTION_COLUMN_GRID_PLACEMENT;
  }

  if (columnId === 'selection') {
    return SELECTION_COLUMN_GRID_PLACEMENT;
  }

  return undefined;
}

function isStickyColumn(columnId: string) {
  return columnId === 'actions' || columnId === 'selection';
}

function isInteractiveRowTarget(target: EventTarget | null) {
  return target instanceof Element
    && Boolean(target.closest('a, button, input, textarea, select, [role="button"], [role="link"], [role="checkbox"], [role="switch"], [role="menuitem"]'));
}

function getVisibleWindow(
  scrollTop: number,
  viewportHeight: number,
  rowHeight: number,
  rowCount: number,
) {
  if (rowCount <= 0 || viewportHeight <= 0) {
    return { startIndex: 0, endIndex: -1 };
  }

  const visibleStart = Math.floor(scrollTop / rowHeight);
  const visibleEnd = Math.ceil((scrollTop + viewportHeight) / rowHeight) - 1;
  return {
    startIndex: Math.max(0, visibleStart - GRID_VIEW_LIST_TOKENS.overscanRows),
    endIndex: Math.min(rowCount - 1, visibleEnd + GRID_VIEW_LIST_TOKENS.overscanRows),
  };
}

function ContinuousListGridSkeletonRow<TRow, TColumnId extends string, TSortBy extends string>({
  columns,
  gridTemplateColumns,
  rowHeight,
}: {
  columns: Array<ContinuousListGridColumn<TRow, TColumnId, TSortBy>>;
  gridTemplateColumns: string;
  rowHeight: number;
}) {
  const theme = useTheme();
  const appearance = React.useMemo(() => getGridViewListAppearance(theme), [theme]);
  const isLightMode = theme.palette.mode === 'light';

  return (
    <Box
      role="row"
      sx={{
        display: 'grid',
        gridTemplateColumns,
        width: '100%',
        minWidth: getGridMinimumWidth(columns),
        height: rowHeight,
        minHeight: rowHeight,
        backgroundColor: appearance.surfaceBackground,
        borderBottom: '1px solid',
        borderBottomColor: 'divider',
      }}
    >
      {columns.map((column, columnIndex) => (
        <Box
          key={`opportunity-grid-skeleton-${column.id}`}
          role="gridcell"
          className={isCashValueColumn(column) ? CASH_VALUE_COLUMN_CLASS_NAME : undefined}
          sx={{
            gridColumn: getColumnGridPlacement(column.id),
            px: `${GRID_VIEW_LIST_TOKENS.cell.horizontalPadding}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: getColumnContentJustification(column),
            minWidth: 0,
            position: isStickyColumn(column.id) ? 'sticky' : undefined,
            left: column.id === 'selection' ? 0 : undefined,
            right: column.id === 'actions' ? 0 : undefined,
            zIndex: isStickyColumn(column.id) ? 2 : undefined,
            backgroundColor: isStickyColumn(column.id) ? appearance.surfaceBackground : undefined,
            borderLeft: column.id === 'actions' ? '1px solid' : undefined,
            borderLeftColor: column.id === 'actions' ? 'divider' : undefined,
            borderRight: column.id === 'selection' ? '1px solid' : undefined,
            borderRightColor: column.id === 'selection' ? 'divider' : undefined,
          }}
        >
          <Skeleton
            variant="rounded"
            animation={isLightMode ? 'pulse' : 'wave'}
            height={Math.min(
              GRID_VIEW_LIST_TOKENS.skeleton.heightMax,
              rowHeight - GRID_VIEW_LIST_TOKENS.skeleton.heightInset,
            )}
            width={columnIndex === 0
              ? GRID_VIEW_LIST_TOKENS.skeleton.firstColumnWidth
              : column.id === 'actions'
                ? GRID_VIEW_LIST_TOKENS.skeleton.actionColumnWidth
                : GRID_VIEW_LIST_TOKENS.skeleton.defaultColumnWidth}
            sx={{
              bgcolor: appearance.skeletonBackgroundColor,
              ...(isLightMode ? {} : {
                '&::after': {
                background: `linear-gradient(90deg, transparent, ${appearance.skeletonHighlightColor}, transparent)`,
                },
              }),
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

export function ContinuousListGrid<TRow, TColumnId extends string, TSortBy extends string>({
  rowsByIndex,
  totalCount,
  columns,
  getRowKey,
  sortField,
  sortDirection,
  density,
  loading,
  scrollResetKey,
  toolbar,
  emptyState,
  headerBackground,
  headerTextColor,
  bodyTextColor,
  onSortColumn,
  onColumnWidthChange,
  onVisibleRangeChange,
  onRowClick,
  multilineColumnIds = [],
}: ContinuousListGridProps<TRow, TColumnId, TSortBy>) {
  const theme = useTheme();
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const resizeStateRef = React.useRef<ColumnResizeState<TColumnId> | null>(null);
  const [scrollTop, setScrollTop] = React.useState(0);
  const [viewportHeight, setViewportHeight] = React.useState(0);
  const [resizePreview, setResizePreview] = React.useState<ColumnResizePreview<TColumnId> | null>(null);
  const appearance = React.useMemo(() => getGridViewListAppearance(theme), [theme]);
  const rowHeight = getDensityRowHeight(density);
  const headerHeight = getDensityHeaderHeight(density);
  const virtualRowCount = totalCount > 0 ? totalCount : (loading ? GRID_VIEW_LIST_TOKENS.skeletonRowCount : 0);
  const effectiveColumns = React.useMemo(() => {
    if (!resizePreview) {
      return columns;
    }

    return columns.map((column) => (
      column.id === resizePreview.columnId
        ? { ...column, width: resizePreview.width }
        : column
    ));
  }, [columns, resizePreview]);
  const gridTemplateColumns = React.useMemo(() => buildGridTemplate(effectiveColumns), [effectiveColumns]);
  const gridMinimumWidth = React.useMemo(() => getGridMinimumWidth(effectiveColumns), [effectiveColumns]);
  const visibleWindow = React.useMemo(
    () => getVisibleWindow(scrollTop, viewportHeight, rowHeight, virtualRowCount),
    [rowHeight, scrollTop, viewportHeight, virtualRowCount],
  );
  const renderedIndexes = React.useMemo(() => {
    if (visibleWindow.endIndex < visibleWindow.startIndex) {
      return [];
    }

    return Array.from(
      { length: visibleWindow.endIndex - visibleWindow.startIndex + 1 },
      (_, offset) => visibleWindow.startIndex + offset,
    );
  }, [visibleWindow.endIndex, visibleWindow.startIndex]);
  const topSpacerHeight = visibleWindow.startIndex * rowHeight;
  const bottomSpacerHeight = Math.max(0, (virtualRowCount - visibleWindow.endIndex - 1) * rowHeight);
  const headerBackgroundColor = headerBackground ?? appearance.headerBackground;
  const headerTextColorValue = headerTextColor ?? appearance.headerTextColor;
  const bodyTextColorValue = bodyTextColor ?? appearance.bodyTextColor;
  const resizingColumnId = resizePreview?.columnId ?? null;
  const virtualCanvasBackground = React.useMemo(() => {
    if (theme.palette.mode === 'light') {
      return appearance.surfaceBackground;
    }

    return `repeating-linear-gradient(to bottom, transparent 0, transparent ${rowHeight - 1}px, ${appearance.rowBorderColor} ${rowHeight - 1}px, ${appearance.rowBorderColor} ${rowHeight}px)`;
  }, [appearance.rowBorderColor, appearance.surfaceBackground, rowHeight, theme.palette.mode]);

  React.useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return undefined;
    }

    const updateViewportHeight = () => {
      setViewportHeight(scroller.clientHeight);
    };

    updateViewportHeight();
    const resizeObserver = new ResizeObserver(updateViewportHeight);
    resizeObserver.observe(scroller);
    return () => resizeObserver.disconnect();
  }, []);

  React.useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    scroller.scrollTop = 0;
    setScrollTop(0);
  }, [scrollResetKey]);

  const handleGridScroll = React.useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  React.useEffect(() => {
    if (visibleWindow.endIndex >= visibleWindow.startIndex && totalCount > 0) {
      onVisibleRangeChange(visibleWindow);
    }
  }, [onVisibleRangeChange, totalCount, visibleWindow]);

  React.useEffect(() => {
    if (!resizingColumnId) {
      return undefined;
    }

    const previousCursor = document.body.style.cursor;
    const previousUserSelect = document.body.style.userSelect;
    document.body.style.cursor = GRID_VIEW_LIST_TOKENS.resizeHandle.cursor;
    document.body.style.userSelect = 'none';

    const handlePointerMove = (event: PointerEvent) => {
      const resizeState = resizeStateRef.current;
      if (!resizeState) {
        return;
      }

      const nextWidth = clampColumnWidth(
        resizeState.startWidth + event.clientX - resizeState.startX,
        resizeState.minWidth,
        resizeState.maxWidth,
      );

      resizeState.width = nextWidth;
      setResizePreview({ columnId: resizeState.columnId, width: nextWidth });
    };

    const handlePointerUp = () => {
      const resizeState = resizeStateRef.current;
      resizeStateRef.current = null;
      setResizePreview(null);

      if (resizeState) {
        onColumnWidthChange?.(resizeState.columnId, resizeState.width);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp, { once: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousUserSelect;
    };
  }, [onColumnWidthChange, resizingColumnId]);

  const handleColumnResizePointerDown = React.useCallback((
    event: React.PointerEvent<HTMLSpanElement>,
    column: ContinuousListGridColumn<TRow, TColumnId, TSortBy>,
  ) => {
    if (!onColumnWidthChange || !isResizableColumnId(column.id) || event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const headerCell = event.currentTarget.parentElement;
    const measuredWidth = headerCell?.getBoundingClientRect().width;
    const minWidth = getColumnMinWidth(column);
    const maxWidth = getColumnMaxWidth(column);
    const startWidth = clampColumnWidth(
      typeof measuredWidth === 'number' && Number.isFinite(measuredWidth) && measuredWidth > 0
        ? measuredWidth
        : column.width ?? minWidth,
      minWidth,
      maxWidth,
    );

    resizeStateRef.current = {
      columnId: column.id,
      startX: event.clientX,
      startWidth,
      width: startWidth,
      minWidth,
      maxWidth,
    };
    setResizePreview({ columnId: column.id, width: startWidth });
  }, [onColumnWidthChange]);

  const handleColumnResizeKeyDown = React.useCallback((
    event: React.KeyboardEvent<HTMLSpanElement>,
    column: ContinuousListGridColumn<TRow, TColumnId, TSortBy>,
  ) => {
    if (!onColumnWidthChange || !isResizableColumnId(column.id)) {
      return;
    }

    const direction = event.key === 'ArrowRight'
      ? 1
      : event.key === 'ArrowLeft'
        ? -1
        : 0;

    if (direction === 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const headerCell = event.currentTarget.parentElement;
    const measuredWidth = headerCell?.getBoundingClientRect().width;
    const minWidth = getColumnMinWidth(column);
    const maxWidth = getColumnMaxWidth(column);
    const currentWidth = clampColumnWidth(
      column.width
        ?? (typeof measuredWidth === 'number' && Number.isFinite(measuredWidth) && measuredWidth > 0
          ? measuredWidth
          : minWidth),
      minWidth,
      maxWidth,
    );

    onColumnWidthChange(column.id, clampColumnWidth(
      currentWidth + (direction * GRID_VIEW_LIST_TOKENS.column.resizeStep),
      minWidth,
      maxWidth,
    ));
  }, [onColumnWidthChange]);

  const showEmptyState = !loading && totalCount === 0;

  return (
    <Box
      sx={{
        flex: '0 1 auto',
        height: 'auto',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
        overflow: 'hidden',
      }}
    >
      {toolbar ? <Box sx={{ flexShrink: 0 }}>{toolbar}</Box> : null}
      <Box
        ref={scrollerRef}
        role="grid"
        aria-rowcount={totalCount}
        aria-colcount={columns.length}
        onScroll={handleGridScroll}
        sx={{
          flex: '0 1 auto',
          height: 'auto',
          minHeight: 0,
          maxHeight: '100%',
          overflow: 'auto',
          overscrollBehavior: 'contain',
          position: 'relative',
          backgroundColor: appearance.surfaceBackground,
          scrollbarGutter: 'stable',
          ...getTableVerticalScrollbarSx(appearance.rowHoverOverlay, appearance.surfaceBackground),
        }}
      >
        <Box sx={{ minWidth: 'max-content' }}>
          <Box
            role="row"
            sx={{
              display: 'grid',
              gridTemplateColumns,
              width: '100%',
              minWidth: gridMinimumWidth,
              height: headerHeight,
              minHeight: headerHeight,
              position: 'sticky',
              top: 0,
              zIndex: 6,
              background: headerBackgroundColor,
              borderBottom: '1px solid',
              borderBottomColor: 'divider',
            }}
          >
              {effectiveColumns.map((column) => {
                const isActiveSort = column.id === sortField;
                const sortable = Boolean(column.sortable && column.sortBy);
                const resizable = Boolean(onColumnWidthChange && isResizableColumnId(column.id));
                const minWidth = getColumnMinWidth(column);
                const maxWidth = getColumnMaxWidth(column);
                return (
                  <Box
                    key={column.id}
                  role="columnheader"
                  className={mergeClassNames(
                    column.headerClassName,
                    isCashValueColumn(column) && CASH_VALUE_COLUMN_CLASS_NAME,
                  )}
                  sx={{
                    gridColumn: getColumnGridPlacement(column.id),
                    px: `${GRID_VIEW_LIST_TOKENS.cell.horizontalPadding}px`,
                    pr: resizable
                      ? `${GRID_VIEW_LIST_TOKENS.cell.horizontalPadding + GRID_VIEW_LIST_TOKENS.column.resizeHandleWidth}px`
                      : `${GRID_VIEW_LIST_TOKENS.cell.horizontalPadding}px`,
                    py: GRID_VIEW_LIST_TOKENS.header.paddingY,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: getColumnContentJustification(column),
                    textAlign: isCashValueColumn(column) ? 'right' : undefined,
                    boxSizing: 'border-box',
                    minWidth: 0,
                    fontWeight: GRID_VIEW_LIST_TOKENS.header.fontWeight,
                    fontSize: GRID_VIEW_LIST_TOKENS.header.fontSize,
                    color: headerTextColorValue,
                    lineHeight: GRID_VIEW_LIST_TOKENS.header.lineHeight,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    position: isStickyColumn(column.id) ? 'sticky' : 'relative',
                    left: column.id === 'selection' ? 0 : undefined,
                    right: column.id === 'actions' ? 0 : undefined,
                    zIndex: isStickyColumn(column.id) ? 7 : undefined,
                    background: headerBackgroundColor,
                    borderLeft: '1px solid',
                    borderLeftColor: 'divider',
                    borderRight: column.id === 'selection' ? '1px solid' : undefined,
                    borderRightColor: column.id === 'selection' ? 'divider' : undefined,
                    borderBottom: isStickyColumn(column.id) ? '1px solid' : undefined,
                    borderBottomColor: isStickyColumn(column.id) ? 'divider' : undefined,
                    '&:first-of-type': {
                      borderLeftColor: 'transparent',
                    },
                  }}
                >
                  {sortable ? (
                    <AppTableSortLabel
                      active={isActiveSort}
                      direction={isActiveSort ? sortDirection : 'asc'}
                      inactiveIconComponent={SwapVertIcon}
                      onClick={() => onSortColumn(column)}
                      sx={{
                        minWidth: 0,
                        height: '100%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: isCashValueColumn(column) ? 'flex-end' : undefined,
                        lineHeight: GRID_VIEW_LIST_TOKENS.header.lineHeight,
                        '&.Mui-active': {
                          color: headerTextColorValue,
                        },
                        '&.Mui-active .MuiTableSortLabel-icon': {
                          color: headerTextColorValue,
                        },
                        '& .MuiTableSortLabel-icon': {
                          opacity: 1,
                          fontSize: GRID_VIEW_LIST_TOKENS.icon.sortSize,
                          flexShrink: 0,
                          alignSelf: 'center',
                          marginTop: '0 !important',
                          marginBottom: '0 !important',
                        },
                        '&:not(.Mui-active) .MuiTableSortLabel-icon': {
                          color: appearance.inactiveSortIconColor,
                        },
                        '&:not(.Mui-active):hover .MuiTableSortLabel-icon, &:not(.Mui-active).Mui-focusVisible .MuiTableSortLabel-icon': {
                          color: appearance.inactiveSortIconHoverColor,
                        },
                      }}
                    >
                      <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {column.label}
                      </Box>
                    </AppTableSortLabel>
                  ) : (
                    <Box
                      component="span"
                      sx={{
                        minWidth: 0,
                        width: '100%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: getColumnContentJustification(column),
                        gap: 0.5,
                        '&:hover .continuous-grid-swapvert-icon': {
                          color: appearance.inactiveSortIconHoverColor,
                        },
                      }}
                    >
                      {column.renderHeader ? column.renderHeader() : (
                        <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {column.label}
                        </Box>
                      )}
                      {column.id !== 'actions' && !column.suppressInactiveSortIcon ? (
                        <SwapVertIcon
                          className="continuous-grid-swapvert-icon"
                          sx={{
                            fontSize: GRID_VIEW_LIST_TOKENS.icon.inactiveSortSize,
                            color: appearance.inactiveSortIconColor,
                            flexShrink: 0,
                            transition: theme.transitions.create('color', {
                              duration: theme.transitions.duration.shortest,
                            }),
                          }}
                        />
                      ) : null}
                    </Box>
                  )}
                  {resizable ? (
                    <Box
                      component="span"
                      role="separator"
                      aria-orientation="vertical"
                      aria-label={`Resize ${column.label} column`}
                      aria-valuemin={minWidth}
                      aria-valuemax={maxWidth}
                      aria-valuenow={typeof column.width === 'number' ? column.width : undefined}
                      tabIndex={0}
                      onPointerDown={(event) => handleColumnResizePointerDown(event, column)}
                      onKeyDown={(event) => handleColumnResizeKeyDown(event, column)}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: -GRID_VIEW_LIST_TOKENS.column.resizeHandleWidth / 2,
                        width: GRID_VIEW_LIST_TOKENS.column.resizeHandleWidth,
                        height: '100%',
                        cursor: GRID_VIEW_LIST_TOKENS.resizeHandle.cursor,
                        touchAction: 'none',
                        zIndex: 2,
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: GRID_VIEW_LIST_TOKENS.resizeHandle.lineInset,
                          bottom: GRID_VIEW_LIST_TOKENS.resizeHandle.lineInset,
                          left: '50%',
                          width: GRID_VIEW_LIST_TOKENS.resizeHandle.lineWidth,
                          borderRadius: GRID_VIEW_LIST_TOKENS.resizeHandle.lineRadius,
                          backgroundColor: appearance.accentColor,
                          opacity: resizePreview?.columnId === column.id
                            ? GRID_VIEW_LIST_TOKENS.resizeHandle.activeOpacity
                            : 0,
                          transform: 'translateX(-50%)',
                          transition: theme.transitions.create('opacity', { duration: theme.transitions.duration.shortest }),
                        },
                        '&:hover::after, &:focus-visible::after': {
                          opacity: GRID_VIEW_LIST_TOKENS.resizeHandle.activeOpacity,
                        },
                        '&:focus-visible': {
                          outline: `${GRID_VIEW_LIST_TOKENS.resizeHandle.focusOutlineWidth}px solid ${appearance.accentColor}`,
                          outlineOffset: GRID_VIEW_LIST_TOKENS.resizeHandle.focusOutlineOffset,
                        },
                      }}
                    />
                  ) : null}
                </Box>
              );
            })}
          </Box>

          {showEmptyState ? (
            <Box sx={{ minWidth: GRID_VIEW_LIST_TOKENS.emptyState.minWidth, py: GRID_VIEW_LIST_TOKENS.emptyState.paddingY }}>
              {emptyState}
            </Box>
          ) : (
            <Box
              role="rowgroup"
              sx={{
                position: 'relative',
                minHeight: virtualRowCount * rowHeight,
                backgroundColor: appearance.surfaceBackground,
              }}
            >
              {topSpacerHeight > 0 ? (
                <Box
                  sx={{
                    height: topSpacerHeight,
                    background: virtualCanvasBackground,
                  }}
                />
              ) : null}
              {renderedIndexes.map((rowIndex) => {
                const row = rowsByIndex[rowIndex];
                if (!row) {
                  return (
                    <ContinuousListGridSkeletonRow
                      key={`opportunity-grid-loading-${rowIndex}`}
                      columns={effectiveColumns}
                      gridTemplateColumns={gridTemplateColumns}
                      rowHeight={rowHeight}
                    />
                  );
                }

                return (
                  <Box
                    key={getRowKey(row)}
                    role="row"
                    aria-rowindex={rowIndex + 2}
                    onClick={onRowClick ? (event) => {
                      if (isInteractiveRowTarget(event.target)) {
                        return;
                      }
                      onRowClick(row);
                    } : undefined}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns,
                      width: '100%',
                      minWidth: gridMinimumWidth,
                      height: rowHeight,
                      minHeight: rowHeight,
                      borderBottom: '1px solid',
                      borderBottomColor: appearance.rowBorderColor,
                      borderRadius: appearance.highlightBorderRadius,
                      backgroundColor: appearance.surfaceBackground,
                      overflow: 'visible',
                      transition: theme.transitions.create('background-color', {
                        duration: theme.transitions.duration.shortest,
                      }),
                      '&:hover': {
                        backgroundColor: appearance.rowHoverOverlay,
                        backgroundImage: 'none',
                        borderBottomColor: 'transparent',
                      },
                      '&:hover > [role="gridcell"]': {
                        backgroundColor: 'transparent',
                        backgroundImage: 'none',
                      },
                      '&:hover > [role="gridcell"][data-grid-sticky="true"]': {
                        backgroundColor: appearance.surfaceBackground,
                        backgroundImage: `linear-gradient(${appearance.rowHoverOverlay}, ${appearance.rowHoverOverlay})`,
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                      },
                      ...(onRowClick ? {
                        cursor: 'pointer',
                      } : {}),
                    }}
                  >
                    {effectiveColumns.map((column) => (
                      <Box
                        key={`${getRowKey(row)}-${column.id}`}
                        role="gridcell"
                        data-grid-sticky={isStickyColumn(column.id) ? 'true' : undefined}
                        className={mergeClassNames(
                          column.cellClassName,
                          isCashValueColumn(column) && CASH_VALUE_COLUMN_CLASS_NAME,
                        )}
                        sx={{
                          gridColumn: getColumnGridPlacement(column.id),
                          px: `${GRID_VIEW_LIST_TOKENS.cell.horizontalPadding}px`,
                          py: multilineColumnIds.includes(column.id as TColumnId)
                            ? GRID_VIEW_LIST_TOKENS.cell.multilinePaddingY
                            : GRID_VIEW_LIST_TOKENS.cell.paddingY,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: getColumnContentJustification(column),
                          textAlign: isCashValueColumn(column) ? 'right' : undefined,
                          color: bodyTextColorValue,
                          minWidth: 0,
                          overflow: 'hidden',
                          borderRadius: 0,
                          transition: theme.transitions.create('background-color', {
                            duration: theme.transitions.duration.shortest,
                          }),
                          position: isStickyColumn(column.id) ? 'sticky' : undefined,
                          left: column.id === 'selection' ? 0 : undefined,
                          right: column.id === 'actions' ? 0 : undefined,
                          zIndex: isStickyColumn(column.id) ? 3 : undefined,
                          backgroundColor: isStickyColumn(column.id) ? appearance.surfaceBackground : undefined,
                          borderLeft: column.id === 'actions' ? '1px solid' : undefined,
                          borderLeftColor: column.id === 'actions' ? 'divider' : undefined,
                          borderRight: column.id === 'selection' ? '1px solid' : undefined,
                          borderRightColor: column.id === 'selection' ? 'divider' : undefined,
                          '& .MuiTypography-root': {
                            whiteSpace: multilineColumnIds.includes(column.id as TColumnId) ? 'normal' : 'nowrap',
                            overflow: 'hidden',
                            textOverflow: multilineColumnIds.includes(column.id as TColumnId) ? 'clip' : 'ellipsis',
                            width: '100%',
                            textAlign: isCashValueColumn(column) ? 'right' : undefined,
                            ...(multilineColumnIds.includes(column.id as TColumnId) ? {
                              display: '-webkit-box',
                              WebkitLineClamp: GRID_VIEW_LIST_TOKENS.cell.multilineClamp,
                              WebkitBoxOrient: 'vertical',
                              lineHeight: GRID_VIEW_LIST_TOKENS.cell.multilineLineHeight,
                              wordBreak: 'break-word',
                            } : {}),
                          },
                          '& .MuiStack-root': {
                            minWidth: 0,
                          },
                          '& .MuiButton-root': {
                            minWidth: 0,
                          },
                          '& .MuiButton-root:hover': {
                            backgroundColor: 'transparent',
                            textDecoration: 'none',
                          },
                          '& .MuiLink-root:hover': {
                            textDecoration: 'none',
                          },
                        }}
                      >
                        {column.renderCell(row)}
                      </Box>
                    ))}
                  </Box>
                );
              })}
              {bottomSpacerHeight > 0 ? (
                <Box
                  sx={{
                    height: bottomSpacerHeight,
                    background: virtualCanvasBackground,
                  }}
                />
              ) : null}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
