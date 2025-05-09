import { Stack, styled } from '@mui/material';

export const StackStyle = styled(Stack)(({ theme }) => ({
  width: '100%',

  [theme.breakpoints.up('md')]: {
    width: '50%',
    margin: 'auto',
  },
}));
