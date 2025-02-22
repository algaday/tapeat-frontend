import { CheckCircle } from '@mui/icons-material';
import { MenuItem } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

import { MenuItemV2 } from '@entities/menu-item-v2';
import { RHFSelect } from '@shared/ui/rhf/RHFSelect';

interface Props {
  menuItems: MenuItemV2[];
  isLoading: boolean;
  mappedMenuItemIds: string[];
}

export const MenuItemSelect = ({ menuItems, isLoading, mappedMenuItemIds }: Props) => {
  const { control } = useFormContext();

  const getIcon = (menuItemId: string) => {
    if (mappedMenuItemIds.includes(menuItemId)) {
      return <CheckCircle />;
    }
  };
  return (
    <Controller
      control={control}
      name="menuItemId"
      render={({ field }) => (
        <RHFSelect {...field} label="Позиция из меню">
          {isLoading ? (
            <MenuItem disabled>Загрузка...</MenuItem>
          ) : (
            menuItems.map((menuItem) => (
              <MenuItem key={menuItem.id} value={menuItem.id}>
                {menuItem.name} {getIcon(menuItem.id)}
              </MenuItem>
            ))
          )}
        </RHFSelect>
      )}
    />
  );
};
