import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import { alpha, styled, type SxProps, type Theme } from '@mui/material/styles';

/** Yellow pencil for Edit. */
export function getEditActionColor(theme: Theme) {
  return theme.palette.warning.main;
}

/** Red block for Deactivate. */
export function getDeactivateActionColor(theme: Theme) {
  return theme.palette.error.main;
}

/**
 * Chromeless icon color for Edit/Deactivate in list-table Actions columns.
 * White on the dark list chrome; `text.primary` in light mode so the glyphs stay visible.
 */
export function getListGridActionIconColor(theme: Theme) {
  return theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary;
}

/**
 * Pencil icon for controls whose primary action is editing a record.
 * Disabled buttons retain MUI's standard disabled affordance.
 */
export const AppEditIcon = styled(EditOutlinedIcon)(({ theme }) => ({
  color: getEditActionColor(theme),
  // Follow the control's own disabled treatment so the icon never diverges from its label:
  // buttons grey their text, menu items keep the color and fade the whole row.
  '.MuiButtonBase-root.Mui-disabled &': {
    color: 'inherit',
  },
}));

/**
 * Block icon for soft-delete/deactivate controls. Hard deletes continue to use
 * the red Delete icon, and reactivation continues to use the green Check icon.
 */
export const AppDeactivateIcon = styled(BlockOutlinedIcon)(({ theme }) => ({
  color: getDeactivateActionColor(theme),
  '.MuiButtonBase-root.Mui-disabled &': {
    color: 'inherit',
  },
}));

function outlinedActionSx(theme: Theme, actionColor: string): Record<string, unknown> {
  return {
    color: actionColor,
    borderColor: alpha(actionColor, 0.4),
    '&:hover': {
      borderColor: actionColor,
      backgroundColor: alpha(actionColor, 0.08),
    },
    '&.Mui-disabled': {
      color: theme.palette.action.disabled,
      borderColor: theme.palette.action.disabledBackground,
    },
  };
}

/**
 * Styling for an Edit button that renders a label beside `AppEditIcon`.
 * Pair it with `variant="outlined"` and no `color` prop — Edit stays outlined
 * so it does not compete with a filled Save action.
 */
export const appEditActionSx: SxProps<Theme> = (theme) => outlinedActionSx(theme, getEditActionColor(theme));

/**
 * Styling for a Deactivate button that renders a label beside `AppDeactivateIcon`.
 * Pair it with `variant="outlined"` and no `color` prop. Do not use `color="warning"`
 * (yellow is Edit). Red here is the Deactivate semantic; hard Delete also uses red
 * `DeleteOutlined`, distinguished by glyph and the verb Delete vs Deactivate.
 */
export const appDeactivateActionSx: SxProps<Theme> = (theme) => outlinedActionSx(theme, getDeactivateActionColor(theme));

/** Contained confirm button for a Deactivate dialog. */
export const appDeactivateConfirmSx: SxProps<Theme> = (theme) => {
  const fill = theme.palette.error.main;
  return {
    color: theme.palette.error.contrastText,
    backgroundColor: fill,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  };
};
