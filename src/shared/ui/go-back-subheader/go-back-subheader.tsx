'use client';
import { Box, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';

import { StyledBox } from './style';

import { Iconify } from '../iconify';

interface Props {
  title: string;
}

export const GoBackSubheader = ({ title }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <StyledBox>
      <IconButton onClick={handleClick}>
        <Iconify icon="material-symbols:arrow-back-ios-rounded" sx={{ width: 24, height: 24 }} />
      </IconButton>
      <Box>{title}</Box>
    </StyledBox>
  );
};
