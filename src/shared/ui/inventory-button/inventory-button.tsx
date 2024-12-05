'use client';

import { ButtonProps } from '@mui/material';

import { StyledButton } from './style';

interface Props extends ButtonProps {}

export const InventoryButton = (props: Props) => {
  return <StyledButton {...props} />;
};
