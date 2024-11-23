'use client';

import { Stack, Typography } from '@mui/material';
import { useParams } from 'next/navigation';

import { InventoryCountStorage, useGetInventoryCountQuery } from '@entities/inventory-count';
import { InventoryCountItemCard } from '@entities/inventory-count-item';
import { IngredientUnit } from '@shared/constants';
import { FulfillmentStatus } from '@shared/ui/status-tags';

import { List } from './style';

export function InventoryCountItems() {
  const params = useParams<{ inventoryCountId: string }>();

  const inventoryCountId = params?.inventoryCountId as string;

  const { data } = useGetInventoryCountQuery(inventoryCountId);
  return (
    <List>
      {data?.storages?.map((storage) => <StorageItems storage={storage} key={storage.slug} />)}
    </List>
  );
}

interface StorageProps {
  storage: InventoryCountStorage;
}
const StorageItems = ({ storage }: StorageProps) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Typography variant="h5">{storage.name}</Typography>
      {storage.items.map((item) => (
        <InventoryCountItemCard
          key={item.id}
          item={{ name: item.name, quantity: item.quantity, unit: item.unit as IngredientUnit }}
          status={
            <FulfillmentStatus isFulfilled={typeof item.quantity === 'number' ? true : false} />
          }
        />
      ))}
    </Stack>
  );
};
