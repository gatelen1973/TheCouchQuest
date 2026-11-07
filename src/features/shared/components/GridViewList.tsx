import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import {
  ContinuousListGrid,
  type ContinuousListGridColumn,
  type ContinuousListGridProps,
} from './ContinuousListGrid';
import { showActionsColumns } from '../../../app/theme';
import { getGridViewListAppearance, GRID_VIEW_LIST_TOKENS } from './GridViewList.styles';

export type GridViewContinuousListColumn<
  TRow,
  TColumnId extends string,
  TSortBy extends string,
> = ContinuousListGridColumn<TRow, TColumnId, TSortBy>;

export type GridViewContinuousListProps<
  TRow,
  TColumnId extends string,
  TSortBy extends string,
> = Omit<ContinuousListGridProps<TRow, TColumnId, TSortBy>, 'headerBackground' | 'headerTextColor' | 'bodyTextColor'>;

interface GridViewResultsBarProps {
  count: number;
  label?: string;
}

function useGridViewListStyles() {
  const theme = useTheme();
  const appearance = React.useMemo(() => getGridViewListAppearance(theme), [theme]);

  return React.useMemo(() => ({
    appearance,
    resultBarSx: {
      px: GRID_VIEW_LIST_TOKENS.resultBar.paddingX,
      py: GRID_VIEW_LIST_TOKENS.resultBar.paddingY,
      minHeight: GRID_VIEW_LIST_TOKENS.resultBar.minHeight,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid',
      borderBottomColor: 'divider',
    },
  }), [appearance]);
}

export function GridViewResultsBar({ count, label }: GridViewResultsBarProps) {
  const { resultBarSx } = useGridViewListStyles();

  return (
    <Box sx={resultBarSx}>
      <Typography variant="caption" color="text.secondary">
        {label ?? `Displaying ${count.toLocaleString()} results`}
      </Typography>
    </Box>
  );
}

export function GridViewContinuousList<
  TRow,
  TColumnId extends string,
  TSortBy extends string,
>(props: GridViewContinuousListProps<TRow, TColumnId, TSortBy>) {
  const { appearance } = useGridViewListStyles();
  const columns = showActionsColumns
    ? props.columns
    : props.columns.filter((column) => column.id !== 'actions');

  return (
    <ContinuousListGrid
      {...props}
      columns={columns}
      headerBackground={appearance.headerBackground}
      headerTextColor={appearance.headerTextColor}
      bodyTextColor={appearance.bodyTextColor}
    />
  );
}
