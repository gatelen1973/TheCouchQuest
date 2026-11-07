import type { ReactNode } from 'react';
import type { SvgIconComponent } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface EmptyStateProps {
  title: string;
  description?: string;
  Icon?: SvgIconComponent;
  iconColor?: 'primary' | 'action' | 'warning' | 'error' | 'disabled';
  action?: ReactNode;
}

export function EmptyState({
  title,
  description,
  Icon,
  iconColor = 'primary',
  action,
}: EmptyStateProps) {
  return (
    <Stack spacing={1.5} alignItems="center" sx={{ textAlign: 'center' }}>
      {Icon ? <Icon sx={{ fontSize: 46, color: `${iconColor}.main` }} /> : null}
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      {description ? (
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 520 }}>
          {description}
        </Typography>
      ) : null}
      {action ?? null}
    </Stack>
  );
}
