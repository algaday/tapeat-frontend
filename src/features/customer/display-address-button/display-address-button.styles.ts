import { Button } from '@mui/material';
import styled from 'styled-components';

export const StyledButton = styled(Button)`
  &.MuiButton-root {
    background-color: #f4f3ef;
    border-radius: 10px;
    color: black;
    text-transform: none;
    font-size: 16px;
    font-weight: 550;
    padding: 7px 0;

    &:hover {
      background-color: #f4f3ef;
    }
  }
`;
