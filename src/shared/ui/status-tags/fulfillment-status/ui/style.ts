'use client';

import { Box, styled } from '@mui/material';

interface BoxStyleProps {
  isFulfilled: boolean;
}

export const BoxStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFulfilled',
})<BoxStyleProps>(({ theme, isFulfilled }) => ({
  fontSize: 12,
  borderRadius: 12,
  height: '100%',
  width: '100%',
  padding: theme.spacing(1, 2),
  backgroundColor: isFulfilled ? '#36B37E29' : '#FFAB0029',
}));
