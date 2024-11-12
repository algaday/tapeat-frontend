import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

import { Ingredient } from '@entities/inventory-count-item';

import { CaptionTypography, CardLayout } from './style';

interface Props {
  openModal: () => void;
  status: React.ReactNode;
  item: Omit<Ingredient, 'type'>;
}

export const InventoryCountItemCard = ({
  status,
  item: { name, quantity, unit },
  openModal,
}: Props) => {
  return (
    <CardLayout onClick={openModal}>
      <Stack spacing={1} flex={1}>
        <Typography fontSize={14}>{name}</Typography>
        <CaptionTypography>
          {quantity} {unit}
        </CaptionTypography>
      </Stack>
      <Box sx={{ cursor: 'pointer' }}>{status}</Box>
    </CardLayout>
  );
};
