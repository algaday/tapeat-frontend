import { Card, CardContent } from '@mui/material';
import Image from 'next/image';
import styled from 'styled-components';

export const StyledImage = styled(Image)({
  borderRadius: '10px',
});

export const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  paddingRight: '20px',

  '&.MuiCardContent-root:last-child': {
    paddingBottom: '12px',
  },
});

export const StyledCard = styled(Card)({
  marginTop: '10px',
});
