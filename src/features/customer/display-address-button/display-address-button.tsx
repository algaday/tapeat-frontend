'use client';

import EastIcon from '@mui/icons-material/East';
import { useRouter } from 'next/navigation';

import { useAppSelector } from '@shared/lib/store';

import { StyledButton } from './display-address-button.styles';

export function DisplayAddressButton() {
  const address = useAppSelector((state) => state.user.address?.street);

  const router = useRouter();

  return (
    <StyledButton fullWidth endIcon={<EastIcon />} onClick={() => router.push('/frito/map')}>
      {address}
    </StyledButton>
  );
}
