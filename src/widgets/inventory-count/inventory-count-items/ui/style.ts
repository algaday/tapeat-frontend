'use client';

import { Box, styled } from '@mui/material';

export const List = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(4),
  gridTemplateColumns: `repeat(auto-fit, minmax(${theme.spacing(36)}, 1fr))`,
  justifyItems: 'center',
  [theme.breakpoints.up('md')]: {
    justifyItems: 'start',
  },
}));
