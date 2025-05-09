'use client';

import { Box, styled } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
}));
