'use client';

import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'next/navigation';

import { useGetInventoryCountQuery } from '@entities/inventory-count';
import { GoBackSubheader } from '@shared/ui/go-back-subheader';
import { formatDate } from '@shared/utils/formatNumber';
import { InventoryCountStorages } from '@widgets/inventory-count';

export function InventoryCountStoragesPage() {
  const param = useParams<{ inventoryCountId: string }>();
  const inventoryCountId = param?.inventoryCountId as string;

  const { data, isLoading } = useGetInventoryCountQuery(inventoryCountId);

  return (
    <Box>
      <GoBackSubheader title={`Отчет ${data?.createdAt && formatDate(data.createdAt)}`} />
      {isLoading && <CircularProgress />}

      {data && data.storages.length > 0 ? <InventoryCountStorages /> : <div>No storages</div>}
    </Box>
  );
}
