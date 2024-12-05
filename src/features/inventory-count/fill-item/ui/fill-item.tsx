import { InventoryCountItem } from '@entities/inventory-count';
import { ResponsiveModal } from '@shared/ui/responsive-modal';

import { FillItemForm } from './fill-item-form';

interface Props {
  open: boolean;
  handleClose: () => void;
  item: InventoryCountItem;
}

export const FillItem = ({ handleClose, open, item }: Props) => {
  const title = `${item.name} (${item.unit})`;

  return (
    <ResponsiveModal open={open} onClose={handleClose} title={title}>
      <FillItemForm item={item} onClose={handleClose} />
    </ResponsiveModal>
  );
};
