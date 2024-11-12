import { BoxStyle } from './style';

interface Props {
  isFulfilled: boolean;
}

export const FulfillmentStatus = ({ isFulfilled }: Props) => {
  return (
    <BoxStyle isFulfilled={!!isFulfilled}>{isFulfilled ? 'Заполнено' : 'Не заполнено'}</BoxStyle>
  );
};
