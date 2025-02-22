import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useCreateFryStationItemMappingMutation } from '@entities/fry-station-item-mapping';

import {
  FryStationItemMappingForm,
  FryStationItemMappingFormSchema,
} from '../fry-station-item-mapping-form/fry-station-item-mapping-form';

export const CreateFryStationItemMapping = () => {
  const params = useParams<{ fryStationItemId: string; restaurantBranchId: string }>();
  const restaurantBranchId = params?.restaurantBranchId as string;
  const fryStationItemId = params?.fryStationItemId as string;

  const [resetForm, setResetForm] = useState<VoidFunction | null>(null);
  const [createMapping, { isLoading }] = useCreateFryStationItemMappingMutation();

  const onSubmit = async (data: FryStationItemMappingFormSchema) => {
    await createMapping({
      fryStationItemId,
      ...data,
      quantityMultiplier: Number(data.quantityMultiplier)
    });

    toast('Успешно привязали позицию на жарочную позицию', { type: 'success' });
    resetForm?.();
  };

  return (
    <FryStationItemMappingForm
      fryStationItemId={fryStationItemId}
      onSubmit={onSubmit}
      restaurantBranchId={restaurantBranchId}
      setResetForm={setResetForm}
      isLoading={isLoading}
    ></FryStationItemMappingForm>
  );
};
