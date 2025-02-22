import { MenuItem } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

import { MenuItemCategoryV2 } from '@entities/menu-item-category-v2';
import { RHFSelect } from '@shared/ui/rhf/RHFSelect';

interface Props {
  menuItemCategories: MenuItemCategoryV2[];
  isLoading: boolean;
}

export const MenuItemCategorySelect = ({ menuItemCategories, isLoading }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="categoryId"
      render={({ field }) => (
        <RHFSelect {...field} label="Категория позиции меню">
          {isLoading ? (
            <MenuItem disabled>Загрузка...</MenuItem>
          ) : (
            menuItemCategories.map((menuItemCategory) => (
              <MenuItem key={menuItemCategory.id} value={menuItemCategory.id}>
                {menuItemCategory.name}
              </MenuItem>
            ))
          )}
        </RHFSelect>
      )}
    />
  );
};
