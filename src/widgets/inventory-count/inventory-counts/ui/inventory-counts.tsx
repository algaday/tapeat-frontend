'use client';
import { CircularProgress, Typography, Box } from '@mui/material';

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

  return (
    <StyledBox>
      <List>
        {isLoading && <CircularProgress />}
        {!isLoading && !data && (
          <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            <Typography variant="h6" color="textSecondary" align="center">
              🙅‍♀️ Нет доступных отчетов
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center" mt={1}>
              Создайте новый отчет или дождитесь новых задач.
            </Typography>
          </Box>
        )}
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
