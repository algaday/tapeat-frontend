'use client';

import { Box, Button, styled } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const List = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: `repeat(auto-fit, minmax(${theme.spacing(36)}, 1fr))`,
  justifyItems: 'center',
  [theme.breakpoints.up('md')]: {
    justifyItems: 'start',
  },
}));
