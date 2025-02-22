'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider as RHFormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useGetByFryStationItemIdQuery } from '@entities/fry-station-item-mapping';
import { useGetMenuItemsByRestaurantBranchIdQuery } from '@entities/menu-item-v2';
import { InventoryButton } from '@shared/ui/inventory-button';

import { useGetMenuItemCategoriesByRestaurantBranchIdQuery } from '@entities/menu-item-category-v2';
import { StackStyle } from './style';

import { MenuItemSelect } from './select-menu-item';
import { MenuItemCategorySelect } from './select-menu-item-category';
import { RHFInputField } from '@shared/ui/rhf/rhf-input-field';
import { useGetModifierItemsByMenuItemIdQuery } from '@entities/modifier-item-v2';
import { ModifierItemsSelect } from './select-modifier-items';

export const fryStationItemMappingFormSchema = z.object({
  categoryId: z.string().min(1, 'Выберите категорию'),
  menuItemId: z.string().min(1, 'Выберите позицию'),
  modifierItemIds: z.array(z.string()),
  quantityMultiplier: z
    .string()
    .min(1, { message: 'Выберите сколько штук добавлять' })
    .regex(/^\d+$/, { message: 'Введите целое число' }) // Ensures only digits
    .refine((val) => Number(val) > 0 && Number(val) <= 1000, {
      message: 'Выберите число от 1 до 1000',
    }),
});

export type FryStationItemMappingFormSchema = z.infer<typeof fryStationItemMappingFormSchema>;

export const DEFAULT_VALUES: Partial<FryStationItemMappingFormSchema> = {
  quantityMultiplier: '1',
  modifierItemIds: []
};

type Props = {
  defaultValues?: Partial<FryStationItemMappingFormSchema>;
  onSubmit: (data: FryStationItemMappingFormSchema) => void;
  setResetForm?: (reset: VoidFunction) => void;
  isLoading?: boolean;
  restaurantBranchId: string;
  fryStationItemId: string;
};

export const FryStationItemMappingForm = ({
  defaultValues = DEFAULT_VALUES,
  onSubmit,
  setResetForm,
  restaurantBranchId,
  isLoading,
  fryStationItemId,
}: Props) => {
  const methods = useForm<FryStationItemMappingFormSchema>({
    resolver: zodResolver(fryStationItemMappingFormSchema),
    defaultValues,
  });

  const { categoryId, menuItemId, modifierItemIds } = methods.watch();

  // useEffect(() => {
  //   setResetForm?.(() => methods.reset({ categoryId: categoryId, menuItemId: undefined }));
  // }, [setResetForm, methods.reset, categoryId]);

  console.log(methods.watch());
  const { data: menuItemCategories = [], isLoading: isMenuItemCategoriesLoading } =
    useGetMenuItemCategoriesByRestaurantBranchIdQuery({ restaurantBranchId });

  const { data: menuItems = [], isLoading: isMenuItemsLoading } =
    useGetMenuItemsByRestaurantBranchIdQuery(
      { restaurantBranchId, categoryId },
      { skip: !categoryId },
    );

  const { data: existingMappings = [] } = useGetByFryStationItemIdQuery({
    fryStationItemId,
  });

  const { data: modifierItems = [], isLoading: isModifierItemsLoading } = useGetModifierItemsByMenuItemIdQuery(
    {
      menuItemId,
    },
    { skip: !menuItemId },
  );

  const mappedMenuItemIds = existingMappings.map((mapping) => mapping.menuItem.id);

  return (
    <RHFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <StackStyle spacing={2}>
          <MenuItemCategorySelect
            menuItemCategories={menuItemCategories}
            isLoading={isMenuItemCategoriesLoading}
          />
          {categoryId && (
            <MenuItemSelect
              mappedMenuItemIds={mappedMenuItemIds}
              menuItems={menuItems}
              isLoading={isMenuItemsLoading}
            />
          )}
          {menuItemId && (
            <RHFInputField
              name="quantityMultiplier"
              label="Количество"
              type="text"
              inputProps={{
                inputMode: 'decimal',
                pattern: '[0-9]*',
              }}
            />
          )}

          {menuItemId && (
            <ModifierItemsSelect modifierItems={modifierItems} isLoading={isModifierItemsLoading} selectedModifierItemIds={modifierItemIds}/>
          )}

          <InventoryButton type="submit" variant="contained" disabled={isLoading}>
            Создать
          </InventoryButton>
        </StackStyle>
      </form>
    </RHFormProvider>
  );
};
