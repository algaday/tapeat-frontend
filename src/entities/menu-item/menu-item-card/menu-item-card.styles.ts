import { Card } from '@mui/material';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  margin: 20px 0px;
  display: flex;
  gap: 10px;
  align-items: center;
  max-width: 470px;

  .card-image {
    height: auto;
  }
  .image {
    display: block;
  }

  .card-content {
    max-height: 150px;
    padding: 0px 10px;
    overflow: hidden;
  }
  .card-title {
    font-size: 24px;
    padding: 0;
    margin: 0;
  }

  .card-description {
    font-size: 14px;

    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
