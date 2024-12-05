import { Box, Card, CardContent } from '@mui/material';
import styled from 'styled-components';

export const StyledCard = styled(Card)({
  display: 'flex',
  marginTop: '30px',
  maxWidth: '500px',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 10px',
});

export const StyledCardContent = styled(CardContent)({
  padding: 0,
});

export const StyledActionBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
});
