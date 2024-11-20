'use client';
import { CircularProgress } from '@mui/material';

import { InventoryCountCard, useGetInventoryCountsQuery } from '@entities/inventory-count';
import { NavigateToCreateInventoryCount } from '@features/inventory-count/create';
import { InventoryCountStatus } from '@shared/constants';
import { useAppSelector } from '@shared/lib/store';
import { Link } from '@shared/ui/link';
import { CompletionStatus } from '@shared/ui/status-tags/completion-status';

import { List, StyledBox } from './style';

export function InventoryCounts() {
  const inventoryCountIds = useAppSelector((store) => store.inventoryCount.inventoryCountIds);

  const { data, isLoading } = useGetInventoryCountsQuery(
    {
      ids: inventoryCountIds,
      status: InventoryCountStatus.PENDING,
    },
    { skip: !inventoryCountIds.length },
  );

  console.log(data);
  return (
    <StyledBox>
      <List>
        {isLoading && <CircularProgress />}
        {data?.map((item) => (
          <Link href={`inventory-counts/${item.id}/storages`} key={item.id}>
            <InventoryCountCard
              inventoryCount={item}
              key={item.id}
              completionStatus={<CompletionStatus status={item.status as InventoryCountStatus} />}
            />
          </Link>
        ))}
      </List>
      <NavigateToCreateInventoryCount />
    </StyledBox>
  );
}
