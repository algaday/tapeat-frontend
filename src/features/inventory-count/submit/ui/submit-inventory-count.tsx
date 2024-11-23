'use client';

import { useParams, useRouter } from 'next/navigation';

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

  const [submit] = useSubmitInventoryCountMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    await submit({ inventoryCountId });
    dispatch(removeId({ id: inventoryCountId }));
    router.push(`/restaurants/${restaurantId}/inventory-counts`);
  };

  //todo: improve the style of the button, while pressing becomes blue colored
  return (
    <InventoryButton variant="contained" onClick={handleSubmit} disabled={disabled}>
      Завершить Отчет
    </InventoryButton>
  );
}
