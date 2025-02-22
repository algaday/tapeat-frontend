'use client';

import { useRouter } from 'next/navigation';

import { InventoryButton } from '@shared/ui/inventory-button';

type Props = {
  fryStationItemId: string;
  restaurantBranchId: string;
};

export function NavigateToFryStationItemMappingCreate({
  restaurantBranchId,
  fryStationItemId,
}: Props) {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(
      `/management/restaurant-branches/${restaurantBranchId}/fry-station/items/${fryStationItemId}/mappings/create`,
    );
  };

  return (
    <InventoryButton variant="contained" onClick={handleNavigation}>
      Добавить привязку
    </InventoryButton>
  );
}
