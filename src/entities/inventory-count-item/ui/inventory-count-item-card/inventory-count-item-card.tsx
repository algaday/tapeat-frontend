import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

import { Ingredient } from '@entities/inventory-count-item';
import { translateUnit } from '@shared/utils/translateUnit';

import { CaptionTypography, CardLayout } from './style';

interface Props {
  status: React.ReactNode;
  item: Omit<Ingredient, 'type'>;
}

export const InventoryCountItemCard = ({ status, item: { name, quantity, unit } }: Props) => {
  return (
    <CardLayout>
      <Stack spacing={1} flex={1}>
        <Typography fontSize={14}>{name}</Typography>
        <CaptionTypography>
          {quantity?.toFixed(2)} {translateUnit(unit)}
        </CaptionTypography>
      </Stack>
      <Box sx={{ cursor: 'pointer' }}>{status}</Box>
    </CardLayout>
  );
};
