import { Box, styled, SwipeableDrawer } from '@mui/material';

export const DrawerStyle = styled(SwipeableDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    borderTopRightRadius: theme.shape.borderRadius,
    borderTopLeftRadius: theme.shape.borderRadius,
    background: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(3),
  },
}));

export const ContentStyle = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  flex: 1,
  height: '65%',
}));

export const HeaderBoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3),
}));

export const HeaderBoxContentStyle = styled(Box)({
  flexGrow: 1,
});
