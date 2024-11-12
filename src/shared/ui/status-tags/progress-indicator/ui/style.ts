'use client';

import { Box, styled } from '@mui/material';

interface BoxStyleProps {
  bgColor: string;
}

export const BoxStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bgColor',
})<BoxStyleProps>(({ theme, bgColor }) => ({
  fontSize: 12,
  borderRadius: 12,
  height: '100%',
  width: '100%',
  padding: theme.spacing(1, 2),
  backgroundColor: bgColor,
}));
