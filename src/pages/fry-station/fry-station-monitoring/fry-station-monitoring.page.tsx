import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'next/navigation';

import { useGetByRestaurantBranchIdQuery } from '@entities/fry-station';
import { useGetRestaurantBranchByIdQuery } from '@entities/restaurant-branch-v2';
import { FryStationItemMonitoring } from '@widgets/fry-station';

import { StyledContainer } from '../fry-station-item-list/styles';

export function FryStationMonitoringPage() {
  const restaurantBranchId = useParams()?.restaurantBranchId as string | string[];

  if (!restaurantBranchId || Array.isArray(restaurantBranchId)) {
    throw Error('Restaurant branch id should be valid');
  }

  const { data: fryStation, isLoading } = useGetByRestaurantBranchIdQuery({
    restaurantBranchId,
  });

  const { data: restaurantBranch, isLoading: isRestaurantBranchFetching } =
    useGetRestaurantBranchByIdQuery({
      restaurantBranchId,
    });

  if (isLoading || isRestaurantBranchFetching) {
    return (
      <StyledContainer>
        <CircularProgress />
      </StyledContainer>
    );
  }

  if (!fryStation || !restaurantBranch) {
    return (
      <StyledContainer>
        <Alert severity="error">
          <Typography>Жарочная станция для этого филиала не настроена</Typography>
        </Alert>
      </StyledContainer>
    );
  }

  return (
    <Box padding={2}>
      <FryStationItemMonitoring fryStationId={fryStation.id} restaurantBranch={restaurantBranch} />
    </Box>
  );
}
