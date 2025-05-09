import { AlertProps } from '@mui/material';

import { InventoryCountStatus } from '@shared/constants';

export const findAlertSeverity = (status: InventoryCountStatus): AlertProps['severity'] => {
  if (status === InventoryCountStatus.APPROVED) {
    return 'success';
  } else if (status === InventoryCountStatus.PENDING) {
    return 'warning';
  } else if (status === InventoryCountStatus.REJECTED) {
    return 'error';
  }
  return 'info';
};
