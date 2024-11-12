import { BoxStyle } from './style';

interface Props {
  percentage: number;
}

export const ProgressIndicator = ({ percentage }: Props) => {
  return (
    <BoxStyle bgColor={percentage === 100 ? '#36B37E29' : '#FFAB0029'}>{percentage}%</BoxStyle>
  );
};
