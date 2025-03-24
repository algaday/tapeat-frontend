import { CardContent, CircularProgress, Typography } from '@mui/material';

import { useGetFryStationItemByIdQuery } from '@entities/fry-station-item';
import { NavigateToFryStationItemSubstitutionCreate } from '@features/fry-station-item';
import { NavigateToFryStationItemMappingCreate } from '@features/fry-station-item-mapping';

import { StyledCard, StyledContainer, StyledListContainer } from './styles';

type Props = {
  fryStationItemId: string;
  restaurantBranchId: string;
};

export const FryStationItemSubstitutionList = ({ fryStationItemId, restaurantBranchId }: Props) => {
  const { data: fryStationItem, isLoading } = useGetFryStationItemByIdQuery({ fryStationItemId });

  if (isLoading) {
    return (
      <StyledContainer>
        <CircularProgress />
      </StyledContainer>
    );
  }

  if (!fryStationItem) {
    return (
      <StyledContainer>
        <Typography variant="h6">Позиция жарочной станции не найдено</Typography>
        <NavigateToFryStationItemMappingCreate
          fryStationItemId={fryStationItemId}
          restaurantBranchId={restaurantBranchId}
        />
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <StyledListContainer>
        {fryStationItem.substitutions?.map((substitution) => (
          <StyledCard key={substitution.substituteItemId}>
            <CardContent>
              <Typography variant="h6">
                {fryStationItem.name} {'->'} {substitution.quantityMultiplier} *{' '}
                {substitution.substituteItemName}
              </Typography>
            </CardContent>
          </StyledCard>
        ))}
      </StyledListContainer>

      <NavigateToFryStationItemSubstitutionCreate
        fryStationItemId={fryStationItemId}
        restaurantBranchId={restaurantBranchId}
      />
    </StyledContainer>
  );
};
