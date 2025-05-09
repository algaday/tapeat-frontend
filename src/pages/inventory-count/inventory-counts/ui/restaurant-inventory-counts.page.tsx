import { GoBackSubheader } from '@shared/ui/go-back-subheader';
import { InventoryCounts } from '@widgets/inventory-count';

import { StyledBox } from './styles';

export function RestaurantInventoryCountsPage() {
  return (
    <StyledBox>
      <GoBackSubheader title="Отчеты остатков" />
      <InventoryCounts />
    </StyledBox>
  );
}
