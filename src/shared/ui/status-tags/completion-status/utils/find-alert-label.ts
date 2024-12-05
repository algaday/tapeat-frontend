import { InventoryCountStatus } from '@shared/constants';

export const findAlertLabel = (status: InventoryCountStatus): string => {
  if (status === InventoryCountStatus.APPROVED) {
    return 'Завершено';
  } else if (status === InventoryCountStatus.PENDING) {
    return 'Не завершено';
  } else if (status === InventoryCountStatus.REJECTED) {
    return 'Отклонен';
  }
  return 'В проверке';
};
