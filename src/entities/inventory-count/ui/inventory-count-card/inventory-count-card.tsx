import { Box } from '@mui/material';

import { InventoryCount } from '@entities/inventory-count/api/types';
import { formatDate } from '@shared/utils/formatNumber';

import { BoldTypography, CaptionTypography, CardLayout, InventoryCountHeader } from './style';

interface Props {
  completionStatus: React.ReactNode;
  inventoryCount: Pick<InventoryCount, 'branchName' | 'createdAt' | 'templateName'>;
}

export function InventoryCountCard({
  completionStatus,
  inventoryCount: { branchName, createdAt, templateName },
}: Props) {
  return (
    <CardLayout component={'article'}>
      <InventoryCountHeader>
        <BoldTypography>{formatDate(createdAt)}</BoldTypography>
        <Box>{completionStatus}</Box>
      </InventoryCountHeader>
      <BoldTypography>{templateName}</BoldTypography>
      <CaptionTypography>{branchName}</CaptionTypography>
    </CardLayout>
  );
}
