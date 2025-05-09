'use client';

import { useRouter } from 'next/navigation';

import { DeliveryOption, updateDeliveryOption } from '@entities/user';
import { useAppDispatch, useAppSelector } from '@shared/lib/store';

import { StyledToggleButton, StyledToggleButtonGroup } from './delivery-options.styles';

export function DeliveryOptions() {
  const deliveryType = useAppSelector((state) => state.user.address?.type);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const value = (event.currentTarget as HTMLButtonElement).value;

    dispatch(updateDeliveryOption(value as DeliveryOption));

    router.push('/frito/map');
  };

  return (
    <StyledToggleButtonGroup value={deliveryType} exclusive fullWidth onChange={handleClick}>
      <StyledToggleButton value="delivery">Доставка</StyledToggleButton>
      <StyledToggleButton value="pick-up">Самовывоз</StyledToggleButton>
      <StyledToggleButton value="restaurant">В заведении</StyledToggleButton>
    </StyledToggleButtonGroup>
  );
}
