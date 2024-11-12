'use client';

import { useState } from 'react';

import { InventoryCountItem, InventoryCountStorage } from '@entities/inventory-count';
import { InventoryCountItemCard } from '@entities/inventory-count-item';
import { FillItem } from '@features/inventory-count/fill-item';
import { IngredientUnit } from '@shared/constants';
import { FulfillmentStatus } from '@shared/ui/status-tags/fulfillment-status';

import { List, StyledBox } from './style';

interface Props {
  storage: InventoryCountStorage;
}

export function InventoryCountStorageItems({ storage }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryCountItem | null>(null);

  const handleOpenModal = (ingredient: InventoryCountItem) => {
    setSelectedItem(ingredient);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  return (
    <StyledBox>
      <List>
        {storage?.items?.map((item) => (
          <InventoryCountItemCard
            key={item.id}
            item={{ name: item.name, quantity: item.quantity, unit: item.unit as IngredientUnit }}
            status={<FulfillmentStatus isFulfilled={!!item.quantity} />}
            openModal={() => handleOpenModal(item)}
          />
        ))}
      </List>
      {selectedItem && <FillItem open={open} handleClose={handleCloseModal} item={selectedItem} />}
    </StyledBox>
  );
}
