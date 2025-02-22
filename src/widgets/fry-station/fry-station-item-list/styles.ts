import { Card } from '@mui/material';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
`;

export const StyledCard = styled(Card)`
  width: 250px;
  transition: transform 0.2s ease-in-out;
  pointer: cursor;
  &:hover {
    transform: scale(1.05);
  }
`;
