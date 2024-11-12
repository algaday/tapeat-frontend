'use client';
import { CircularProgress } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';

import {
  InventoryCountStorage,
  removeId,
  useGetInventoryCountQuery,
  useUpdateInventoryCountMutation,
} from '@entities/inventory-count';
import { InventoryCountStorageCard } from '@entities/storage';
import { InventoryCountStatus } from '@shared/constants';
import { useAppDispatch } from '@shared/lib/store';
import { InventoryButton } from '@shared/ui/inventory-button';
import { Link } from '@shared/ui/link';
import { ProgressIndicator } from '@shared/ui/status-tags/progress-indicator';

import { List, StyledBox } from './style';

const findProgressIndicator = (storage: InventoryCountStorage): number => {
  const itemsCount = storage.items.length;
  const filledItems = storage.items.reduce((acc, cur) => {
    if (cur.quantity) {
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
  const [updateStatus] = useUpdateInventoryCountMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isDisabled = data?.storages.some((storage) =>
    storage.items.some((item) => item.quantity === null),
  );

  const handleSubmit = async () => {
    await updateStatus({ inventoryCountId, status: InventoryCountStatus.AWAITING_APPROVAL });
    dispatch(removeId({ id: inventoryCountId }));
    router.back();
  };

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
      <InventoryButton disabled={isDisabled} onClick={handleSubmit}>
        Отправить отчет
      </InventoryButton>
    </StyledBox>
  );
}
