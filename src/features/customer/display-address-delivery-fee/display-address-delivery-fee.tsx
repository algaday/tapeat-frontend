import { Box, Stack, Typography } from '@mui/material';

import { useAppSelector } from '@shared/lib/store';

export function DisplayAddressDeliveryFee() {
  const address = useAppSelector((state) => state.user.address?.street);

  return (
    <Stack marginY={3} direction="row" justifyContent="space-between">
      <Box>
        <Typography variant="body1" fontWeight="600">
          Доставка по адресу
        </Typography>
        <Typography variant="body1" fontWeight="500">
          {address}
        </Typography>

        <Typography variant="body2" color="error" marginTop={1}>
          Пожалуйста, дозакажите до минимальной суммы.
        </Typography>
        <Typography variant="body2" color="error">
          Минимальный заказ по указанному адресу - 5000 тенге{' '}
        </Typography>
      </Box>
      <Typography variant="body1" fontWeight="600">
        1000 тенге
      </Typography>
    </Stack>
  );
}
