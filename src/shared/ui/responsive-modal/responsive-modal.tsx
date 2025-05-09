import { Dialog, DialogTitle } from '@mui/material';

import { useResponsive } from '@shared/hooks';

import { DialogContentStyle } from './style';

import { BottomDrawer } from '../bottom-drawer';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  hasCloser?: boolean;
}

export const ResponsiveModal = ({ open, onClose, children, title, hasCloser }: Props) => {
  const isDesktop = useResponsive('up', 'md');

  return isDesktop ? (
    <Dialog open={open} onClose={onClose} PaperProps={{ style: { borderRadius: '16px' } }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContentStyle>{children} </DialogContentStyle>
    </Dialog>
  ) : (
    <BottomDrawer
      open={open}
      onClose={onClose}
      PaperProps={{ style: { paddingBottom: '60px' } }}
      hasCloser={!!hasCloser}
      title={title}
    >
      {children}
    </BottomDrawer>
  );
};
