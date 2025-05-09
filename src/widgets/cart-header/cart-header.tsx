'use client';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { IconButton, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import { clearCart } from '@entities/cart';
import { useAppDispatch } from '@shared/lib/store';

export function CartHeader() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleBackArrowClick = () => {
    router.push('/frito');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Stack
      direction={'row'}
      justifyContent="space-between"
      alignItems="center"
      paddingX={2}
      paddingY={1}
    >
      <IconButton onClick={handleBackArrowClick}>
        <KeyboardBackspaceOutlinedIcon />
      </IconButton>
      <Typography margin={0} variant="h6">
        Корзина
      </Typography>
      <IconButton onClick={handleClearCart}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Stack>
  );
}
