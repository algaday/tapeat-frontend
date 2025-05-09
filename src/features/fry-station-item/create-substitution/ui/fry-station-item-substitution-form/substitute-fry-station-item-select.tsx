import { MenuItem } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

import { FryStationItem } from '@entities/fry-station-item';
import { RHFSelect } from '@shared/ui/rhf/RHFSelect';

interface Props {
  fryStationItems: FryStationItem[];
  isLoading: boolean;
}

export const SubstituteFryStationItemSelect = ({ fryStationItems, isLoading }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="substituteItemId"
      render={({ field }) => (
        <RHFSelect {...field} label="Позиция для замены">
          {isLoading ? (
            <MenuItem disabled>Загрузка...</MenuItem>
          ) : (
            fryStationItems.map((fryStationItem) => (
              <MenuItem key={fryStationItem.id} value={fryStationItem.id}>
                {fryStationItem.name}
              </MenuItem>
            ))
          )}
        </RHFSelect>
      )}
    />
  );
};
