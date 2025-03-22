'use client';

import { useRouter } from 'next/navigation';

import { InventoryButton } from '@shared/ui/inventory-button';

type Props = {
  fryStationItemId: string;
  restaurantBranchId: string;
};

export function NavigateToFryStationItemSubstitutionCreate({
  restaurantBranchId,
  fryStationItemId,
}: Props) {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(
      `/management/restaurant-branches/${restaurantBranchId}/fry-station/items/${fryStationItemId}/substitutions/create`,
    );
  };

  return (
    <InventoryButton variant="contained" onClick={handleNavigation}>
      Добавить замену
    </InventoryButton>
  );
}
