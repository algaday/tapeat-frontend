import { Box } from '@mui/material';

import { CreateFryStationItemSubstitution } from '@features/fry-station-item';
import { GoBackSubheader } from '@shared/ui/go-back-subheader';

export function CreateFryStationItemSubstitutionPage() {
  return (
    <Box>
      <GoBackSubheader title="Привязка позиции" />
      <CreateFryStationItemSubstitution />
    </Box>
  );
}
