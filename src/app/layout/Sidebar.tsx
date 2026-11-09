import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import { useTheme } from '@mui/material/styles';
import { getChromeTokens } from '../theme';
import { navigationItems, type NavigationKey } from './navigation';
import { shellTopBarHeight } from './shellMetrics';

export const sidebarDrawerWidth = 242;

interface SidebarProps {
  selected: NavigationKey;
  mobileOpen: boolean;
  onMobileClose: () => void;
  onSelect: (key: NavigationKey) => void;
}

export function Sidebar({ selected, mobileOpen, onMobileClose, onSelect }: SidebarProps) {
  const theme = useTheme();
  const chrome = getChromeTokens(theme);

  const content = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: chrome.sidebarBackground,
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ minHeight: `${shellTopBarHeight}px !important`, px: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          The Couch Quest
        </Typography>
      </Toolbar>
      <List sx={{ px: 1 }}>
        {navigationItems.map((item) => (
          <ListItemButton
            key={item.key}
            selected={selected === item.key}
            onClick={() => {
              onSelect(item.key);
              onMobileClose();
            }}
            sx={{ borderRadius: 1 }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
              <TableRowsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: sidebarDrawerWidth }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: sidebarDrawerWidth, boxSizing: 'border-box' },
        }}
      >
        {content}
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: sidebarDrawerWidth,
            boxSizing: 'border-box',
            borderRight: `1px solid ${chrome.shellBorder}`,
            background: chrome.sidebarBackground,
            boxShadow: chrome.sidebarShadow,
          },
        }}
      >
        {content}
      </Drawer>
    </Box>
  );
}
