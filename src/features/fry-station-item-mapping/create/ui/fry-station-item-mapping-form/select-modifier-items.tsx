import { Checkbox, ListItemText, MenuItem } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

import { RHFSelect } from '@shared/ui/rhf/RHFSelect';
import { ModifierItemV2 } from '@entities/modifier-item-v2';

interface Props {
  modifierItems: ModifierItemV2[];
  isLoading: boolean;
  selectedModifierItemIds?: string[];
}

export const ModifierItemsSelect = ({
  modifierItems,
  isLoading,
  selectedModifierItemIds = [],
}: Props) => {
  const { control } = useFormContext();

  const renderValue = selectedModifierItemIds.map(selectedId=>modifierItems.find(item=>item.id === selectedId)?.name).join(', ')
  return (
    <Controller
      control={control}
      name="modifierItemIds"
      render={({ field }) => (
        <RHFSelect
          SelectProps={{ multiple: true, renderValue: ()=>renderValue }}
          {...field}
          label="Выберите модификаторы"
        >
          {isLoading ? (
            <MenuItem disabled>Загрузка...</MenuItem>
          ) : (
            modifierItems.map((modifierItem) => (
              <MenuItem key={modifierItem.id} value={modifierItem.id}>
                <Checkbox checked={selectedModifierItemIds.includes(modifierItem.id)} />
                <ListItemText primary={modifierItem.name} />
              </MenuItem>
            ))
          )}
        </RHFSelect>
      )}
    />
  );
};
