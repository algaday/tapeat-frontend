import { useResetItemsMutation } from '@entities/fry-station-item';
import { resetCompletedQuantities } from '@entities/fry-station-items-monitoring';
import { useAppDispatch } from '@shared/lib/store';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useResetItems = (fryStationId: string) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resetFryStationItems, { isLoading: isResetLoading }] = useResetItemsMutation();

  const dispatch = useAppDispatch()
  const handleOpenDialog = () => setIsDialogOpen(true);

  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleConfirmReset = async () => {
    handleCloseDialog();
    try {
      await resetFryStationItems({ fryStationId });
      console.log(resetCompletedQuantities)
      dispatch(resetCompletedQuantities())
      toast.success('Все заказы сброшены');
    } catch (error) {
      toast.error('Ошибка при сбросе заказов');
    }
  };

  return {
    handleConfirmReset,
    handleCloseDialog,
    handleOpenDialog,
    isDialogOpen,
    isResetLoading,
  };
};
