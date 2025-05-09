'use client';

import CircularProgress from '@mui/material/CircularProgress';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { removeId, useSubmitInventoryCountMutation } from '@entities/inventory-count';
import { useAppDispatch } from '@shared/lib/store';
import { InventoryButton } from '@shared/ui/inventory-button';

interface Props {
  disabled: boolean;
}

export function SubmitInventoryCount({ disabled }: Props) {
  const router = useRouter();
  const params = useParams<{ restaurantId: string; inventoryCountId: string }>();
  const restaurantId = params?.restaurantId as string;
  const inventoryCountId = params?.inventoryCountId as string;

  const [submit, { isLoading }] = useSubmitInventoryCountMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    try {
      await submit({ inventoryCountId }).unwrap();
      dispatch(removeId({ id: inventoryCountId }));
      toast.success('Отчет отправлен');
      router.push(`/restaurants/${restaurantId}/inventory-counts`);
    } catch (error) {
      toast.error('Ошибка! Заполните заново или сообщите ответственному человеку');
      console.error('Failed to submit inventory count:', error);
    }
  };

  return (
    <InventoryButton
      variant="contained"
      onClick={handleSubmit}
      disabled={disabled || isLoading}
      sx={{
        position: 'relative',
      }}
    >
      {isLoading ? (
        <CircularProgress
          size={24}
          sx={{
            color: 'white',
            position: 'absolute',
          }}
        />
      ) : (
        'Завершить Отчет'
      )}
    </InventoryButton>
  );
}
