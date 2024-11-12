'use client';

import { usePathname, useRouter } from 'next/navigation';

import { InventoryButton } from '@shared/ui/inventory-button';

interface Props {
  disabled: boolean;
}

export function SubmitInventoryCount({ disabled }: Props) {
  const router = useRouter();
  const pathName = usePathname();

  const handleNavigation = () => {
    router.push(`${pathName}/create`);
  };

  //todo: improve the style of the button, while pressing becomes blue colored
  return (
    <InventoryButton variant="contained" onClick={handleNavigation} disabled={disabled}>
      Завершить Отчет
    </InventoryButton>
  );
}
