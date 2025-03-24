import { Box } from '@mui/material';
import { useParams } from 'next/navigation';

import { GoBackSubheader } from '@shared/ui/go-back-subheader';
import { FryStationItemList } from '@widgets/fry-station';

export function FryStationItemListPage() {
  const restaurantBranchId = useParams()?.restaurantBranchId as string | string[];

  if (!restaurantBranchId || Array.isArray(restaurantBranchId)) {
    throw Error('Restaurant branch id should be valid');
  }

  return (
    <Box>
      <GoBackSubheader title="Жарочные позиции" />
      <FryStationItemList restaurantBranchId={restaurantBranchId} />
    </Box>
  );
}
