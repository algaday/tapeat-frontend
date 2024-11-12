'use client';
import { Box } from '@mui/material';
import { useParams } from 'next/navigation';

import { useGetInventoryCountQuery } from '@entities/inventory-count';
import { GoBackSubheader } from '@shared/ui/go-back-subheader';
import { InventoryCountStorageItems } from '@widgets/inventory-count';

export function InventoryCountStorageItemsPage() {
  const params = useParams<{ storageSlug: string; inventoryCountId: string }>();

  const storageSlug = params?.storageSlug as string;
  const inventoryCountId = params?.inventoryCountId as string;

  const { data } = useGetInventoryCountQuery(inventoryCountId);
  const storage = data?.storages?.find((item) => item.slug === storageSlug);

  return (
    <Box>
      <GoBackSubheader title={storage?.name || ''} />
      {storage && <InventoryCountStorageItems storage={storage} />}
    </Box>
  );
}
