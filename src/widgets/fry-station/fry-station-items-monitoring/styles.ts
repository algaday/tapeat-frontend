import { Card, Button } from '@mui/material';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
`;

export const StyledCard = styled(Card)`
  width: 450px;
  pointer: cursor;
`;

export const StyledButton = styled(Button)`
  background-color: #ff9800;
  color: white;
  font-weight: bold;
  &:hover {
    background-color: #e68900;
  }
`;
