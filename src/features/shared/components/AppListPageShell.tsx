import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import {
  pageHeaderTitleSx,
  reportShellSx,
  reportSubtitleSx,
} from '../styles/pageStyles';

export interface AppListPageShellProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
  titleMeta?: React.ReactNode;
  headerActions: React.ReactNode;
  filters?: React.ReactNode;
  headerActionsInlineOnMobile?: boolean;
  contentSurface?: boolean;
  contentSurfaceFill?: boolean;
  /** `content` sizes the table to its rows and caps it at the viewport. `fill` stretches the surface. */
  contentSurfaceSizing?: 'fill' | 'content';
  viewportBounded?: boolean;
  loading?: boolean;
  error?: string;
  children: React.ReactNode;
}

export function AppListPageShell({
  icon,
  title,
  subtitle = null,
  titleMeta = null,
  headerActions,
  filters = null,
  headerActionsInlineOnMobile = false,
  contentSurface = true,
  contentSurfaceFill = true,
  contentSurfaceSizing = 'fill',
  viewportBounded = false,
  loading = false,
  error = '',
  children,
}: AppListPageShellProps) {
  const theme = useTheme();
  const hugContent = contentSurfaceSizing === 'content';

  return (
    <Stack
      spacing={1.5}
      sx={{
        mt: viewportBounded ? 0 : 2,
        flex: 1,
        minHeight: 0,
        ...(viewportBounded ? {
          pt: 2,
          boxSizing: 'border-box',
          height: {
            xs: 'calc(100dvh - 76px)',
            md: 'calc(100dvh - 80px)',
          },
          maxHeight: {
            xs: 'calc(100dvh - 76px)',
            md: 'calc(100dvh - 80px)',
          },
          overflow: 'hidden',
        } : {}),
      }}
    >
      <Box sx={{ px: { xs: 0.5, md: 0.75 }, flexShrink: 0 }}>
        <Stack
          direction={{ xs: headerActionsInlineOnMobile ? 'row' : 'column', md: 'row' }}
          spacing={1.5}
          justifyContent="space-between"
          alignItems={{ xs: headerActionsInlineOnMobile ? 'center' : 'stretch', md: 'center' }}
          useFlexGap
          flexWrap={headerActionsInlineOnMobile ? 'wrap' : 'nowrap'}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
            {icon}
            <Box sx={{ minWidth: 0 }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                useFlexGap
                flexWrap="wrap"
                sx={{ minWidth: 0 }}
              >
                <Typography sx={pageHeaderTitleSx}>{title}</Typography>
                {titleMeta}
              </Stack>
              {subtitle ? <Typography sx={reportSubtitleSx}>{subtitle}</Typography> : null}
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ flexShrink: 0 }}>
            {headerActions}
          </Stack>
        </Stack>
      </Box>
      {filters ? <Box sx={{ flexShrink: 0, minWidth: 0 }}>{filters}</Box> : null}
      {error ? <Alert severity="error" sx={{ flexShrink: 0 }}>{error}</Alert> : null}
      {contentSurface ? (
        <Paper
          sx={{
            ...reportShellSx(theme, { maxWidth: '100%' }),
            background: theme.palette.background.paper,
            backgroundColor: theme.palette.background.paper,
            backgroundImage: 'none',
            flex: hugContent ? '0 1 auto' : contentSurfaceFill ? 1 : '0 0 auto',
            minHeight: 0,
            ...(hugContent ? {
              height: 'fit-content',
              maxHeight: '100%',
            } : {}),
            ...(contentSurfaceFill || hugContent ? {
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            } : {}),
            ...(hugContent ? {
              // Direct page wrappers use flex-grow to fill this surface. Keep their
              // content height, and only let the table shrink once it hits the viewport.
              '&& > *': {
                flexGrow: 0,
                flexBasis: 'auto',
                height: 'auto',
                maxHeight: '100%',
              },
            } : {}),
            '& .MuiTableContainer-root': {
              borderRadius: 0,
              borderTopLeftRadius: '0 !important',
              borderTopRightRadius: '0 !important',
            },
            '& .MuiTable-root': {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            },
            '& .MuiTableCell-head, & .MuiTableCell-stickyHeader': {
              borderRadius: '0 !important',
              borderTopLeftRadius: '0 !important',
              borderTopRightRadius: '0 !important',
            },
            '& .MuiTableHead-root .MuiTableCell-head:first-of-type': {
              borderTopLeftRadius: '0 !important',
            },
            '& .MuiTableHead-root .MuiTableCell-head:last-of-type': {
              borderTopRightRadius: '0 !important',
            },
            '& .MuiDataGrid-root': {
              borderRadius: 0,
              border: 0,
              backgroundColor: 'transparent',
            },
            '& .MuiDataGrid-columnHeaders': {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            },
          }}
        >
          {loading ? <LinearProgress /> : null}
          {children}
        </Paper>
      ) : (
        <>
          {loading ? <LinearProgress /> : null}
          {children}
        </>
      )}
    </Stack>
  );
}
