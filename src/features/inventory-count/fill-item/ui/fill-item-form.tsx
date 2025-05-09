'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button } from '@mui/material';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import {
  InventoryCountItem,
  useUpdateInventoryCountItemQuantityMutation,
} from '@entities/inventory-count';
import { InventoryButton } from '@shared/ui/inventory-button';
import { FormProvider } from '@shared/ui/rhf/form-provider';
import { RHFInputField } from '@shared/ui/rhf/rhf-input-field';

import { FormBox, FormWrapper } from './style';

import { fillItemSchema, FillItemSchema as FormValueProps } from '../model/fill-iitem-schema';

interface Props {
  item: InventoryCountItem;
  onClose: () => void;
}

export const FillItemForm = ({ item, onClose }: Props) => {
  const { quantity } = item;
  const [updateQuantity] = useUpdateInventoryCountItemQuantityMutation();
  const params = useParams<{ inventoryCountId: string }>();

  const methods = useForm<FormValueProps>({
    resolver: zodResolver(fillItemSchema),
    defaultValues: { quantity: quantity?.toString() || '' },
  });
  const { handleSubmit } = methods;
  const onSubmit = async (data: FormValueProps) => {
    updateQuantity({
      inventoryCountId: params?.inventoryCountId || '',
      quantity: Number(data.quantity),
      itemId: item.id,
    });
    onClose();
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <FormWrapper>
        <FormBox>
          <RHFInputField
            name="quantity"
            type="text"
            inputProps={{
              inputMode: 'decimal',
              pattern: '[0-9]*[.,]?[0-9]*', // Allows optional decimal point (or comma) for fractions
            }}
          />
        </FormBox>

        <Box display="flex" justifyContent="space-between" gap={3}>
          <Button variant="outlined" onClick={onCancel}>
            Отмена
          </Button>
          <InventoryButton type="submit" variant="contained">
            Сохранить
          </InventoryButton>
        </Box>
      </FormWrapper>
    </FormProvider>
  );
};
