import { Box } from '@mui/material';

import { CreateInventoryCountForm } from '@features/inventory-count/create';
import { GoBackSubheader } from '@shared/ui/go-back-subheader';

export function CreateInventoryCountPage() {
  return (
    <Box>
      <GoBackSubheader title="Создание отчета" />
      <CreateInventoryCountForm />
    </Box>
  );
}
