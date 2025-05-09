import { Button, styled } from '@mui/material';

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  alignSelf: 'center',
  width: '100%',
  height: theme.spacing(6),
  transition: 'background-color 0.3s ease, color 0.3s ease',

  [theme.breakpoints.up('md')]: {
    width: '50%',
  },

  '&:hover': {
    backgroundColor: theme.palette.grey[800],
  },

  '&:active': {
    backgroundColor: theme.palette.grey[900],
  },

  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey[500],
    color: theme.palette.common.white,
    cursor: 'not-allowed',
    opacity: 0.7,
  },

  '&:focus': {
    outline: `2px solid ${theme.palette.primary.main}`,
  },
}));
