import { MenuItem } from '@mui/material';

import { InventoryCountTemplate } from '@entities/inventory-count';
import { RHFSelect } from '@shared/ui/rhf/RHFSelect';

interface Props {
  templates?: InventoryCountTemplate[];
  isLoading: boolean;
}

export const TemplateSelect = ({ templates, isLoading }: Props) => (
  <RHFSelect name="inventoryCountTemplateId" label="Шаблон">
    {isLoading ? (
      <MenuItem disabled>загрузка...</MenuItem>
    ) : (
      templates?.map((template) => (
        <MenuItem key={template.id} value={template.id}>
          {template.name}
        </MenuItem>
      ))
    )}
  </RHFSelect>
);
