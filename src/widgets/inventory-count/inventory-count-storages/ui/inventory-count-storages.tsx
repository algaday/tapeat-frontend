'use client';
import { CircularProgress } from '@mui/material';
import { useParams } from 'next/navigation';

import { InventoryCountStorage, useGetInventoryCountQuery } from '@entities/inventory-count';
import { InventoryCountStorageCard } from '@entities/storage';
import { SubmitInventoryCount } from '@features/inventory-count/submit';
import { Link } from '@shared/ui/link';
import { ProgressIndicator } from '@shared/ui/status-tags/progress-indicator';

import { List, StyledBox } from './style';

const findProgressIndicator = (storage: InventoryCountStorage): number => {
  const itemsCount = storage.items.length;
  const filledItems = storage.items.reduce((acc, cur) => {
    if (cur.quantity !== null && cur.quantity >= 0) {
      // eslint-disable-next-line no-param-reassign
      acc = acc + 1;
    }
    return acc;
  }, 0);
  const percentage = (filledItems / itemsCount) * 100;

  return parseFloat(percentage.toFixed(2));
};

export function InventoryCountStorages() {
  const params = useParams<{ inventoryCountId: string }>();

  const inventoryCountId = params?.inventoryCountId as string;
  const { data } = useGetInventoryCountQuery(inventoryCountId);

  const isDisabled = !data?.storages.every((storage) =>
    storage.items.every((item) => item.quantity !== null),
  );

  if (!data?.storages) return <CircularProgress />;

  return (
    <StyledBox>
      <List>
        {data.storages.map((storage) => (
          <Link href={`storages/${storage.slug}/ingredients`} key={storage.slug}>
            <InventoryCountStorageCard
              itemQuantity={storage.items.length}
              storageName={storage.name}
              status={<ProgressIndicator percentage={findProgressIndicator(storage)} />}
            />
          </Link>
        ))}
      </List>
      <SubmitInventoryCount disabled={!!isDisabled} />
    </StyledBox>
  );
}
