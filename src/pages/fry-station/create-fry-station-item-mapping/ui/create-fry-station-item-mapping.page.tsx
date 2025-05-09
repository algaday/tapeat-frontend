import { Box } from '@mui/material';

import { CreateFryStationItemMapping } from '@features/fry-station-item-mapping';
import { GoBackSubheader } from '@shared/ui/go-back-subheader';

export function CreateFryStationItemMappingPage() {
  return (
    <Box>
      <GoBackSubheader title="Привязка позиции" />
      <CreateFryStationItemMapping />
    </Box>
  );
}
