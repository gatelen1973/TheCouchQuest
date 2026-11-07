import StraightOutlinedIcon from '@mui/icons-material/StraightOutlined';
import TableSortLabel, { type TableSortLabelProps } from '@mui/material/TableSortLabel';
import { styled } from '@mui/material/styles';

const DirectionalTableSortLabel = styled(TableSortLabel)({
  '&.MuiTableSortLabel-directionAsc .MuiTableSortLabel-icon': {
    transform: 'rotate(0deg)',
  },
  '&.MuiTableSortLabel-directionDesc .MuiTableSortLabel-icon': {
    transform: 'rotate(180deg)',
  },
});

export interface AppTableSortLabelProps extends Omit<TableSortLabelProps, 'IconComponent'> {
  inactiveIconComponent?: TableSortLabelProps['IconComponent'];
}

export function AppTableSortLabel({
  active = false,
  inactiveIconComponent,
  ...props
}: AppTableSortLabelProps) {
  return (
    <DirectionalTableSortLabel
      {...props}
      active={active}
      IconComponent={active || !inactiveIconComponent ? StraightOutlinedIcon : inactiveIconComponent}
    />
  );
}
