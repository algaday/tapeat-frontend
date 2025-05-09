'use client';
import { DialogContent, styled } from '@mui/material';

export const DialogContentStyle = styled(DialogContent)(({ theme }) => ({
  width: '500px',
  padding: theme.spacing(2, 3),
}));
