import { Card } from '@mui/material';
import styled from 'styled-components';

export const StyledListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
`;

export const StyledContainer = styled.div`
  padding: 16px;
`;

export const StyledCard = styled(Card)`
  width: 280px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;
