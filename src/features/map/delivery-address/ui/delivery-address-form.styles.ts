import { List } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled.form`
  bottom: 30%;
  width: 100%;
  padding: 20px;
  border-radius: 15px 15px 0px 0px;
`;
export const StyledList = styled(List)({
  boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
  backgroundColor: 'white',

  '&.MuiList-root': {
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    display: 'block',
  },
});
