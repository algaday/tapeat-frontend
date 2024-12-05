import dayjs from 'dayjs';

export const formatDate = (isoString: string, format: string = 'DD/MM/YY'): string => {
  return dayjs(isoString).format(format);
};
