'use client';

import { Box, Dialog, styled } from '@mui/material';

export const DialogStyled = styled(Dialog)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const FormWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexDirection: 'row',
  alignItems: 'start',
  justifyContent: 'space-between',
}));
