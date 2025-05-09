import { Box } from '@mui/material';
import { useParams } from 'next/navigation';

import { GoBackSubheader } from '@shared/ui/go-back-subheader';
import { FryStationItemMappingList } from '@widgets/fry-station';

export function FryStationItemMappingListPage() {
  const fryStationItemId = useParams()?.fryStationItemId as string | string[];
  const restaurantBranchId = useParams()?.restaurantBranchId as string | string[];

  if (!fryStationItemId || Array.isArray(fryStationItemId)) {
    throw Error('Fry Station id should be valid');
  }

  if (!restaurantBranchId || Array.isArray(restaurantBranchId)) {
    throw Error('Restaurant branch id should be valid');
  }

  return (
    <Box>
      <GoBackSubheader title="Жарочные привязки" />
      <FryStationItemMappingList
        fryStationItemId={fryStationItemId}
        restaurantBranchId={restaurantBranchId}
      />
    </Box>
  );
}
