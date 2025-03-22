import { Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  useCreateSubstitutionMutation,
  useGetByFryStationIdQuery,
  useGetByIdQuery,
} from '@entities/fry-station-item';

import {
  FryStationItemSubstitutionForm,
  FryStationItemSubstitutionFormSchema,
} from '../fry-station-item-substitution-form/fry-station-item-substitution-form';

export const CreateFryStationItemSubstitution = () => {
  const params = useParams<{ fryStationItemId: string }>();

  const fryStationItemId = params?.fryStationItemId as string;

  const { data: fryStationItem = null, isLoading: isFryStationItemLoading } = useGetByIdQuery({
    fryStationItemId,
  });
  const { data: fryStationItems = [], isLoading: isFryStationItemsLoading } =
    useGetByFryStationIdQuery(
      {
        fryStationId: fryStationItem?.fryStationId as string,
      },
      { skip: !fryStationItem },
    );

  const [resetForm, setResetForm] = useState<VoidFunction | null>(null);
  const [createSubstitution, { isLoading }] = useCreateSubstitutionMutation();

  const onSubmit = async (data: FryStationItemSubstitutionFormSchema) => {
    await createSubstitution({
      fryStationItemId,
      ...data,
      quantityMultiplier: Number(data.quantityMultiplier),
    }).unwrap();

    toast('Успешно создали замену на жарочную позицию', { type: 'success' });
    resetForm?.();
  };

  if (isFryStationItemLoading || isFryStationItemsLoading) {
    return <Typography>Загружается</Typography>;
  }

  if (!fryStationItem) {
    return <Typography>Жарочная позиция не найдена</Typography>;
  }

  return (
    <FryStationItemSubstitutionForm
      fryStationItems={fryStationItems}
      fryStationItem={fryStationItem}
      onSubmit={onSubmit}
      setResetForm={setResetForm}
      isLoading={isLoading}
    ></FryStationItemSubstitutionForm>
  );
};
