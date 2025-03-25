'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider as RHFormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FryStationItem, useGetFryStationItemsQuery } from '@entities/fry-station-item';
import { InventoryButton } from '@shared/ui/inventory-button';
import { RHFInputField } from '@shared/ui/rhf/rhf-input-field';

import { StackStyle } from './style';

import { SubstituteFryStationItemSelect } from './substitute-fry-station-item-select';

export const fryStationItemSubstitutionFormSchema = z.object({
  substituteItemId: z.string().min(1, 'Выберите позицию'),
  quantityMultiplier: z
    .string()
    .min(1, { message: 'Выберите сколько штук добавлять' })
    .regex(/^\d+$/, { message: 'Введите целое число' }) // Ensures only digits
    .refine((val) => Number(val) > 0 && Number(val) <= 1000, {
      message: 'Выберите число от 1 до 1000',
    }),
});

export type FryStationItemSubstitutionFormSchema = z.infer<
  typeof fryStationItemSubstitutionFormSchema
>;

export const DEFAULT_VALUES: Partial<FryStationItemSubstitutionFormSchema> = {
  quantityMultiplier: '1',
};

type Props = {
  defaultValues?: Partial<FryStationItemSubstitutionFormSchema>;
  onSubmit: (data: FryStationItemSubstitutionFormSchema) => void;
  setResetForm?: (reset: VoidFunction) => void;
  isLoading?: boolean;
  fryStationItem: FryStationItem;
  fryStationItems: FryStationItem[];
};

export const FryStationItemSubstitutionForm = ({
  defaultValues = DEFAULT_VALUES,
  onSubmit,
  fryStationItem,
  isLoading,
}: Props) => {
  const methods = useForm<FryStationItemSubstitutionFormSchema>({
    resolver: zodResolver(fryStationItemSubstitutionFormSchema),
    defaultValues,
  });

  const { data: fryStationItems = [], isLoading: isFryStationItemsLoading } =
    useGetFryStationItemsQuery();

  const substitutionAllowedItems = fryStationItems.filter((item) => item.id !== fryStationItem.id);

  return (
    <RHFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <StackStyle spacing={2}>
          <SubstituteFryStationItemSelect
            fryStationItems={substitutionAllowedItems}
            isLoading={isFryStationItemsLoading}
          />

          <RHFInputField
            name="quantityMultiplier"
            label="Количество"
            type="text"
            inputProps={{
              inputMode: 'decimal',
              pattern: '[0-9]*',
            }}
          />

          <InventoryButton type="submit" variant="contained" disabled={isLoading}>
            Создать
          </InventoryButton>
        </StackStyle>
      </form>
    </RHFormProvider>
  );
};
