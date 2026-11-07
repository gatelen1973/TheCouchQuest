import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useThemePreference } from '../themeMode';
import { getChromeTokens } from '../theme';
import type { ThemePreference } from '../themeMode';
import { getNavigationKeyByPath, navigationItems, type NavigationKey } from './navigation';
import { shellPageFramePaddingX, shellTopBarHeight } from './shellMetrics';
import { Sidebar, sidebarDrawerWidth } from './Sidebar';

function getNextThemePreference(current: ThemePreference): ThemePreference {
  switch (current) {
    case 'light':
      return 'dark';
    case 'dark':
      return 'system';
    case 'system':
    default:
      return 'light';
  }
}

export function AppShell() {
  const theme = useTheme();
  const chrome = React.useMemo(() => getChromeTokens(theme), [theme]);
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { themePreference, setThemePreference } = useThemePreference();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const selected = getNavigationKeyByPath(location.pathname);
  const themeCycleTarget = getNextThemePreference(themePreference);

  let ThemeToggleIcon = ContrastOutlinedIcon;
  if (themePreference === 'light') ThemeToggleIcon = WbSunnyOutlinedIcon;
  if (themePreference === 'dark') ThemeToggleIcon = DarkModeOutlinedIcon;

  const handleSelect = (key: NavigationKey) => {
    const item = navigationItems.find((candidate) => candidate.key === key);
    if (item) {
      navigate(item.path);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        selected={selected}
        mobileOpen={mobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
        onSelect={handleSelect}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          width: { md: `calc(100% - ${sidebarDrawerWidth}px)` },
          minHeight: '100vh',
          background: chrome.shellBackground,
        }}
      >
        <Stack spacing={0} sx={{ minHeight: '100%' }}>
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: theme.zIndex.appBar,
              height: shellTopBarHeight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: shellPageFramePaddingX,
              borderBottom: `1px solid ${chrome.shellBorder}`,
              background: chrome.topBarBackground,
              boxShadow: chrome.shellShadow,
            }}
          >
            {isDesktop ? <Box /> : (
              <IconButton aria-label="Open navigation menu" onClick={() => setMobileNavOpen(true)}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Tooltip title={`Theme: ${themePreference}. Switch to ${themeCycleTarget}.`}>
              <IconButton
                aria-label={`Switch theme to ${themeCycleTarget}`}
                onClick={() => setThemePreference(themeCycleTarget)}
                sx={{ color: chrome.mutedLabel }}
              >
                <ThemeToggleIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            sx={{
              px: shellPageFramePaddingX,
              pb: { xs: 1.5, md: 2 },
              minWidth: 0,
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Outlet />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
