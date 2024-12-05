'use client';

import { Box, styled } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(5),
  fontSize: '28px',
  fontWeight: '700',
  alignItems: 'center',
}));
