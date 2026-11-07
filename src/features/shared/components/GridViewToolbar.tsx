import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import type { SxProps, Theme } from '@mui/material/styles';
import { alpha, useTheme } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/CheckOutlined';
import ClearIcon from '@mui/icons-material/ClearOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TableRowsIcon from '@mui/icons-material/TableRowsOutlined';
import { getChromeTokens, radiusPx, uiRadii } from '../../../app/theme';
import { reportFilterPanelSx } from '../styles/pageStyles';

export const GRID_VIEW_TOOLBAR_CONTROL_HEIGHT = 36;
export const GRID_VIEW_TOOLBAR_GROUPED_CONTROL_HEIGHT = GRID_VIEW_TOOLBAR_CONTROL_HEIGHT + 2;
export const GRID_VIEW_TOOLBAR_ICON_SIZE = 20;
export const GRID_VIEW_TOOLBAR_BADGE_SIZE = 16;
export const GRID_VIEW_TOOLBAR_BADGE_FONT_SIZE = 10;

interface GridViewToolbarProps {
  children: React.ReactNode;
}

export interface GridViewToolbarSearchSuggestion {
  id: string | number;
  primaryText: string;
  secondaryText?: string;
}

interface GridViewToolbarSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  placeholder: string;
  ariaLabel: string;
  clearAriaLabel: string;
  sx?: SxProps<Theme>;
  /** Supplying suggestions turns the field into a picker; the caller filters them. */
  suggestions?: readonly GridViewToolbarSearchSuggestion[];
  onSuggestionSelect?: (suggestion: GridViewToolbarSearchSuggestion) => void;
  noSuggestionsText?: string;
}

interface GridViewToolbarToolGroupProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

interface GridViewDensityMenuOption<TValue extends string> {
  value: TValue;
  label: string;
}

interface GridViewDensityMenuProps<TValue extends string> {
  value: TValue;
  options: readonly GridViewDensityMenuOption<TValue>[];
  onChange: (value: TValue) => void;
  buttonSx?: SxProps<Theme>;
  showLabel?: boolean;
  buttonAriaLabel?: string;
}

function useGridViewToolbarStyles() {
  const theme = useTheme();
  const inactiveControlHoverBackground = alpha(
    theme.palette.text.primary,
    theme.palette.mode === 'dark' ? 0.14 : 0.05,
  );
  const controlButtonSx: SxProps<Theme> = {
    color: 'text.secondary',
    borderRadius: radiusPx(uiRadii.control),
    minHeight: GRID_VIEW_TOOLBAR_CONTROL_HEIGHT,
    height: GRID_VIEW_TOOLBAR_CONTROL_HEIGHT,
    px: 1,
    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      color: 'text.secondary',
    },
    '& .MuiSvgIcon-root': {
      fontSize: GRID_VIEW_TOOLBAR_ICON_SIZE,
    },
    '&:hover': {
      borderColor: 'divider',
      backgroundColor: inactiveControlHoverBackground,
    },
  };
  const iconOnlyButtonSx: SxProps<Theme> = {
    ...controlButtonSx,
    width: GRID_VIEW_TOOLBAR_CONTROL_HEIGHT,
    minWidth: GRID_VIEW_TOOLBAR_CONTROL_HEIGHT,
    px: 0,
    py: 0,
    justifyContent: 'center',
    '& .MuiButton-startIcon': {
      margin: 0,
      color: 'text.secondary',
    },
    '& .MuiButton-endIcon': {
      margin: 0,
      color: 'text.secondary',
    },
  };
  const filterBadgeSx: SxProps<Theme> = {
    '& .MuiBadge-badge': {
      backgroundColor: 'primary.main',
      color: 'primary.contrastText',
      minWidth: GRID_VIEW_TOOLBAR_BADGE_SIZE,
      height: GRID_VIEW_TOOLBAR_BADGE_SIZE,
      padding: 0,
      borderRadius: radiusPx(uiRadii.control),
      fontSize: GRID_VIEW_TOOLBAR_BADGE_FONT_SIZE,
      lineHeight: `${GRID_VIEW_TOOLBAR_BADGE_SIZE}px`,
      fontWeight: 700,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'translate(8%, -22%)',
    },
  };
  const toolGroupSx: SxProps<Theme> = {
    display: 'inline-flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    maxWidth: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'divider',
    borderRadius: radiusPx(uiRadii.control),
    backgroundColor: 'background.paper',
    minHeight: GRID_VIEW_TOOLBAR_GROUPED_CONTROL_HEIGHT,
    height: GRID_VIEW_TOOLBAR_GROUPED_CONTROL_HEIGHT,
    p: 0,
    gap: 0,
    '& .MuiButton-root': {
      minHeight: GRID_VIEW_TOOLBAR_CONTROL_HEIGHT,
      height: GRID_VIEW_TOOLBAR_CONTROL_HEIGHT,
    },
  };
  const toggleGroupSx: SxProps<Theme> = {
    width: 'auto',
    minHeight: GRID_VIEW_TOOLBAR_GROUPED_CONTROL_HEIGHT,
    height: GRID_VIEW_TOOLBAR_GROUPED_CONTROL_HEIGHT,
    '& .MuiToggleButton-root': {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'divider',
      color: 'text.secondary',
      backgroundColor: 'background.paper',
      minHeight: GRID_VIEW_TOOLBAR_GROUPED_CONTROL_HEIGHT,
      height: GRID_VIEW_TOOLBAR_GROUPED_CONTROL_HEIGHT,
      minWidth: GRID_VIEW_TOOLBAR_GROUPED_CONTROL_HEIGHT,
      flex: '0 0 auto',
      p: 0,
      '& .MuiSvgIcon-root': {
        fontSize: GRID_VIEW_TOOLBAR_ICON_SIZE,
      },
      '&:not(.Mui-selected) .MuiSvgIcon-root': {
        color: 'text.secondary',
      },
      '&:hover': {
        borderColor: 'divider',
        backgroundColor: inactiveControlHoverBackground,
      },
    },
    '& .MuiToggleButton-root.Mui-selected': {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'divider',
      color: 'primary.main',
      backgroundColor: 'background.paper',
      '&:hover': {
        borderColor: 'divider',
        backgroundColor: inactiveControlHoverBackground,
      },
    },
    '& .MuiToggleButton-root.Mui-selected + .MuiToggleButton-root': {
      borderLeftColor: 'divider',
    },
    '& .MuiToggleButton-root + .MuiToggleButton-root.Mui-selected': {
      borderLeftColor: 'divider',
    },
  };
  const savedViewButtonSx: SxProps<Theme> = {
    ...controlButtonSx,
    borderColor: 'divider',
    color: 'text.secondary',
    backgroundColor: 'background.paper',
    maxWidth: { xs: '100%', sm: 260 },
    minWidth: 0,
    boxShadow: 'none',
    minHeight: GRID_VIEW_TOOLBAR_GROUPED_CONTROL_HEIGHT,
    height: GRID_VIEW_TOOLBAR_GROUPED_CONTROL_HEIGHT,
  };
  const fieldControlSx: SxProps<Theme> = {
    '& .MuiInputBase-root': {
      height: GRID_VIEW_TOOLBAR_GROUPED_CONTROL_HEIGHT,
      backgroundColor: 'background.paper',
      boxShadow: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'divider',
      borderWidth: 1,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'divider',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'divider',
        borderWidth: 1,
      },
    },
    '& .MuiInputBase-input': {
      py: 0,
    },
  };

  return {
    controlHeight: GRID_VIEW_TOOLBAR_CONTROL_HEIGHT,
    groupedControlHeight: GRID_VIEW_TOOLBAR_GROUPED_CONTROL_HEIGHT,
    iconSize: GRID_VIEW_TOOLBAR_ICON_SIZE,
    inactiveControlHoverBackground,
    controlButtonSx,
    iconOnlyButtonSx,
    filterBadgeSx,
    toolGroupSx,
    toggleGroupSx,
    savedViewButtonSx,
    fieldControlSx,
  };
}

export function GridViewToolbar({ children }: GridViewToolbarProps) {
  const theme = useTheme();
  const chrome = React.useMemo(() => getChromeTokens(theme), [theme]);

  return (
    <Paper
      variant="outlined"
      sx={{
        ...reportFilterPanelSx(theme),
        background: chrome.sidebarBackground,
        borderColor: 'divider',
        borderRadius: radiusPx(uiRadii.surface),
        boxShadow: theme.appShadows.panel,
        px: 1,
        py: 1,
      }}
    >
      {children}
    </Paper>
  );
}

export function GridViewToolbarSearch({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder,
  ariaLabel,
  clearAriaLabel,
  sx,
  suggestions,
  onSuggestionSelect,
  noSuggestionsText = 'No matching records.',
}: GridViewToolbarSearchProps) {
  const [isSuggestionListOpen, setIsSuggestionListOpen] = React.useState(false);
  const startAdornment = (
    <InputAdornment position="start">
      <SearchOutlinedIcon fontSize="small" />
    </InputAdornment>
  );
  const endAdornment = value ? (
    <InputAdornment position="end">
      <Tooltip title="Clear search">
        <IconButton
          size="small"
          aria-label={clearAriaLabel}
          edge="end"
          onClick={onClear}
        >
          <ClearIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </InputAdornment>
  ) : null;
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // An open suggestion list owns Enter so it can commit the highlighted option.
    if (event.key !== 'Enter' || isSuggestionListOpen) {
      return;
    }

    event.preventDefault();
    onSubmit();
  };

  return (
    <Box
      sx={[
        {
          flex: { xs: '1 1 auto', sm: '1 1 auto' },
          minWidth: { xs: '100%', sm: 150 },
          '& .MuiFormControl-root': {
            width: '100%',
          },
          '& .MuiInputBase-root': {
            height: GRID_VIEW_TOOLBAR_GROUPED_CONTROL_HEIGHT,
            paddingLeft: '12px !important',
            backgroundColor: 'background.paper',
            boxShadow: 'none',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'divider',
            borderWidth: 1,
          },
          '& .MuiOutlinedInput-root': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'divider',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'divider',
              borderWidth: 1,
            },
          },
          '& .MuiInputBase-input': {
            pl: '0 !important',
          },
          '& .MuiInputAdornment-root': {
            ml: 0,
            mr: 1.5,
            color: 'text.secondary',
          },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {suggestions ? (
        <Autocomplete<GridViewToolbarSearchSuggestion, false, false, true>
          freeSolo
          fullWidth
          size="small"
          options={suggestions as GridViewToolbarSearchSuggestion[]}
          open={isSuggestionListOpen && value.trim().length > 0}
          onOpen={() => setIsSuggestionListOpen(true)}
          onClose={() => setIsSuggestionListOpen(false)}
          forcePopupIcon={false}
          inputValue={value}
          onInputChange={(_event, nextValue, reason) => {
            if (reason === 'input' || reason === 'clear') {
              onChange(nextValue);
            }
          }}
          onChange={(_event, selected) => {
            if (!selected || typeof selected === 'string') {
              return;
            }

            onSuggestionSelect?.(selected);
          }}
          filterOptions={(options) => options}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.primaryText)}
          isOptionEqualToValue={(left, right) => left.id === right.id}
          noOptionsText={noSuggestionsText}
          renderOption={(optionProps, option) => (
            <li {...optionProps} key={option.id}>
              <ListItemText
                primary={option.primaryText}
                secondary={option.secondaryText}
                slotProps={{
                  primary: { noWrap: true },
                  secondary: { noWrap: true },
                }}
              />
            </li>
          )}
          renderInput={({
            InputProps: inputSlotProps,
            inputProps: htmlInputProps,
            ...restParams
          }) => (
            <TextField
              {...restParams}
              placeholder={placeholder}
              onKeyDown={handleKeyDown}
              slotProps={{
                input: { ...inputSlotProps, startAdornment, endAdornment },
                htmlInput: { ...htmlInputProps, 'aria-label': ariaLabel },
              }}
            />
          )}
        />
      ) : (
        <TextField
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          size="small"
          aria-label={ariaLabel}
          slotProps={{ input: { startAdornment, endAdornment } }}
        />
      )}
    </Box>
  );
}

export function GridViewToolbarToolGroup({ children, sx }: GridViewToolbarToolGroupProps) {
  const { toolGroupSx } = useGridViewToolbarStyles();

  return <Box sx={[toolGroupSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}>{children}</Box>;
}

export function GridViewDensityMenu<TValue extends string>({
  value,
  options,
  onChange,
  buttonSx,
  showLabel = true,
  buttonAriaLabel = 'Density',
}: GridViewDensityMenuProps<TValue>) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        variant="text"
        size="small"
        startIcon={<TableRowsIcon fontSize="small" />}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        aria-label={buttonAriaLabel}
        sx={buttonSx}
      >
        {showLabel ? 'Density' : null}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === value}
            onClick={() => {
              onChange(option.value);
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              {option.value === value ? <CheckIcon fontSize="small" /> : null}
            </ListItemIcon>
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
