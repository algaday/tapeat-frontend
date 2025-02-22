import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'next/navigation';

import { useGetByRestaurantBranchIdQuery } from '@entities/fry-station';
import { GoBackSubheader } from '@shared/ui/go-back-subheader';
import { FryStationItemList } from '@widgets/fry-station';

import { StyledContainer } from './styles';

export function FryStationItemListPage() {
  const restaurantBranchId = useParams()?.restaurantBranchId as string | string[];

  if (!restaurantBranchId || Array.isArray(restaurantBranchId)) {
    throw Error('Restaurant branch id should be valid');
  }

  const { data: fryStation, isLoading } = useGetByRestaurantBranchIdQuery({
    restaurantBranchId,
  });

  if (isLoading) {
    return (
      <StyledContainer>
        <CircularProgress />
      </StyledContainer>
    );
  }

  if (!fryStation) {
    return (
      <StyledContainer>
        <Alert severity="error">
          <Typography>Жарочная станция для этого филиала не настроена</Typography>
        </Alert>
      </StyledContainer>
    );
  }

  return (
    <Box>
      <GoBackSubheader title="Жарочные позиции" />
      <FryStationItemList fryStationId={fryStation.id} restaurantBranchId={restaurantBranchId} />
    </Box>
  );
}
