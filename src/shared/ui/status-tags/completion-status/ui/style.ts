'use client';

import { Alert, styled } from '@mui/material';

export const AlertStyle = styled(Alert)(({ theme }) => ({
  fontSize: 12,
  borderRadius: 4,
  height: '100%',
  width: '100%',
  padding: theme.spacing(1, 2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiAlert-icon': {
    fontSize: 16,
  },
}));
