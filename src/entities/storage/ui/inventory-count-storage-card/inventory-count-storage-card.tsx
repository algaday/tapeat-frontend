import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

import { CaptionTypography, CardLayout } from './style';

interface Props {
  storageName: string;
  itemQuantity: number;
  status: React.ReactNode;
}

export const InventoryCountStorageCard = ({ itemQuantity, status, storageName }: Props) => {
  return (
    <CardLayout>
      <Stack spacing={1} flex={1}>
        <Typography fontSize={14}>{storageName}</Typography>
        <CaptionTypography>{itemQuantity} продуктов</CaptionTypography>
      </Stack>
      <Box>{status}</Box>
    </CardLayout>
  );
};
