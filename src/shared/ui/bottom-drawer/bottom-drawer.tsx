import { IconButton, SwipeableDrawerProps, Typography } from '@mui/material';
import React from 'react';

import { ContentStyle, DrawerStyle, HeaderBoxContentStyle, HeaderBoxStyle } from './style';

import { Iconify } from '../iconify';

type Props = Omit<SwipeableDrawerProps, 'onOpen'> & {
  children?: React.ReactNode;
  onClose?: VoidFunction;
  onOpen?: VoidFunction;
  title?: string;
  hasCloser: boolean;
};

export function BottomDrawer({
  children,
  onClose,
  onOpen,
  title,
  hasCloser,
  ...drawerProps
}: Props) {
  const handleOnOpen = () => {
    onOpen?.();
  };

  return (
    <DrawerStyle {...drawerProps} onClose={onClose} onOpen={handleOnOpen} anchor="bottom">
      <HeaderBoxStyle>
        <HeaderBoxContentStyle>
          <Typography variant="h5">{title}</Typography>
        </HeaderBoxContentStyle>
        {hasCloser && (
          <IconButton onClick={() => onClose()}>
            <Iconify icon="material-symbols:close" sx={{ width: 24, height: 24 }} />
          </IconButton>
        )}
      </HeaderBoxStyle>
      <ContentStyle>{children}</ContentStyle>
    </DrawerStyle>
  );
}
