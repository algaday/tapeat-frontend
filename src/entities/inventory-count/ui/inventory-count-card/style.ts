'use client';

import { Box, styled, Typography } from '@mui/material';

export const CardLayout = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  width: '100%',
  border: `1px solid ${theme.palette.divider}`,
}));

export const InventoryCountHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  maxHeight: '24px',
});

export const BoldTypography = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.spacing(1.75),
}));

export const CaptionTypography = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.caption.fontWeight,
  fontSize: theme.typography.caption.fontSize,
  color: theme.palette.grey[500],
}));
