import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import { AppListPageShell } from '../../shared/components/AppListPageShell';
import { EmptyState } from '../../shared/components/EmptyState';
import {
  GridViewContinuousList,
  GridViewResultsBar,
  type GridViewContinuousListColumn,
} from '../../shared/components/GridViewList';
import {
  GridViewDensityMenu,
  GridViewToolbar,
  GridViewToolbarSearch,
  GridViewToolbarToolGroup,
} from '../../shared/components/GridViewToolbar';
import { fetchTestRecords } from '../recordsApi';
import type { TestRecord, TestRecordSortField } from '../types';

type GridDensity = 'standard' | 'comfortable';

const densityOptions: { value: GridDensity; label: string }[] = [
  { value: 'standard', label: 'Standard' },
  { value: 'comfortable', label: 'Comfortable' },
];

function formatTimestamp(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(parsed);
}

function compareRecords(left: TestRecord, right: TestRecord, field: TestRecordSortField) {
  if (field === 'column4') {
    return new Date(left.column4).getTime() - new Date(right.column4).getTime();
  }

  const leftValue = left[field];
  const rightValue = right[field];
  if (typeof leftValue === 'number' && typeof rightValue === 'number') {
    return leftValue - rightValue;
  }

  return String(leftValue).localeCompare(String(rightValue), undefined, { sensitivity: 'base', numeric: true });
}

function matchesSearch(record: TestRecord, search: string) {
  if (!search) {
    return true;
  }

  const haystack = [
    record.id,
    record.column1,
    record.column2,
    record.column3,
    formatTimestamp(record.column4),
    record.column4,
  ].join(' ').toLowerCase();

  return haystack.includes(search);
}

export function RecordsListPage() {
  const [records, setRecords] = React.useState<TestRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [searchDraft, setSearchDraft] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [sortField, setSortField] = React.useState<TestRecordSortField>('id');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');
  const [density, setDensity] = React.useState<GridDensity>('standard');
  const [reloadKey, setReloadKey] = React.useState(0);

  React.useEffect(() => {
    const controller = new AbortController();

    fetchTestRecords(controller.signal)
      .then((nextRecords) => {
        setRecords(nextRecords);
      })
      .catch((loadError: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        setRecords([]);
        setError(loadError instanceof Error ? loadError.message : 'Unable to load test records.');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [reloadKey]);

  const visibleRecords = React.useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const filtered = records.filter((record) => matchesSearch(record, normalizedSearch));
    const sorted = [...filtered].sort((left, right) => compareRecords(left, right, sortField));
    return sortDirection === 'desc' ? sorted.reverse() : sorted;
  }, [records, search, sortDirection, sortField]);

  const columns = React.useMemo<Array<GridViewContinuousListColumn<TestRecord, TestRecordSortField, TestRecordSortField>>>(() => [
    {
      id: 'id',
      label: 'Id',
      sortBy: 'id',
      sortable: true,
      width: 88,
      minWidth: 72,
      renderCell: (row) => <Typography variant="body2">{row.id}</Typography>,
    },
    {
      id: 'column1',
      label: 'Column 1',
      sortBy: 'column1',
      sortable: true,
      flex: 1,
      minWidth: 220,
      renderCell: (row) => <Typography variant="body2">{row.column1}</Typography>,
    },
    {
      id: 'column2',
      label: 'Column 2',
      sortBy: 'column2',
      sortable: true,
      width: 120,
      minWidth: 96,
      renderCell: (row) => <Typography variant="body2">{row.column2.toLocaleString()}</Typography>,
    },
    {
      id: 'column3',
      label: 'Column 3',
      sortBy: 'column3',
      sortable: true,
      width: 120,
      minWidth: 96,
      renderCell: (row) => <Typography variant="body2">{row.column3.toLocaleString()}</Typography>,
    },
    {
      id: 'column4',
      label: 'Column 4',
      sortBy: 'column4',
      sortable: true,
      width: 220,
      minWidth: 180,
      renderCell: (row) => <Typography variant="body2">{formatTimestamp(row.column4)}</Typography>,
    },
  ], []);

  const handleSortColumn = React.useCallback((
    column: GridViewContinuousListColumn<TestRecord, TestRecordSortField, TestRecordSortField>,
  ) => {
    const nextField = column.sortBy;
    if (!nextField) {
      return;
    }

    setSortDirection((currentDirection) => (
      sortField === nextField && currentDirection === 'asc' ? 'desc' : 'asc'
    ));
    setSortField(nextField);
  }, [sortField]);

  const toolbar = (
    <GridViewToolbar>
      <GridViewToolbarSearch
        value={searchDraft}
        onChange={setSearchDraft}
        onSubmit={() => setSearch(searchDraft.trim())}
        onClear={() => {
          setSearchDraft('');
          setSearch('');
        }}
        placeholder="Search records"
        ariaLabel="Search records"
        clearAriaLabel="Clear search"
      />
      <GridViewToolbarToolGroup>
        <GridViewDensityMenu
          value={density}
          options={densityOptions}
          onChange={setDensity}
          buttonAriaLabel="Row density"
        />
      </GridViewToolbarToolGroup>
    </GridViewToolbar>
  );

  return (
    <AppListPageShell
      icon={<TableRowsOutlinedIcon color="primary" />}
      title="Records"
      subtitle="Loaded from /api/test"
      headerActions={(
        <Button
          variant="outlined"
          startIcon={<RefreshOutlinedIcon />}
          onClick={() => {
            setError('');
            setLoading(true);
            setReloadKey((current) => current + 1);
          }}
          disabled={loading}
        >
          Refresh
        </Button>
      )}
      viewportBounded
      loading={loading}
      error={error}
    >
      <GridViewResultsBar count={visibleRecords.length} />
      <GridViewContinuousList
        rowsByIndex={visibleRecords}
        totalCount={visibleRecords.length}
        columns={columns}
        getRowKey={(row) => row.id}
        sortField={sortField}
        sortDirection={sortDirection}
        density={density}
        loading={loading}
        scrollResetKey={`${sortField}:${sortDirection}:${search}`}
        toolbar={toolbar}
        emptyState={(
          <EmptyState
            title={search ? 'No matching records' : 'No records'}
            description={search
              ? 'Try a different search.'
              : 'The test endpoint returned an empty list.'}
            Icon={TableRowsOutlinedIcon}
          />
        )}
        onSortColumn={handleSortColumn}
        onVisibleRangeChange={() => undefined}
      />
    </AppListPageShell>
  );
}
