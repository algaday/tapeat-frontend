import { CardContent, CircularProgress, Typography } from '@mui/material';

import { useGetByFryStationItemIdQuery } from '@entities/fry-station-item-mapping';
import { NavigateToFryStationItemMappingCreate } from '@features/fry-station-item-mapping';

import { StyledCard, StyledContainer, StyledListContainer } from './styles';

type Props = {
  fryStationItemId: string;
  restaurantBranchId: string;
};

export const FryStationItemMappingList = ({ fryStationItemId, restaurantBranchId }: Props) => {
  const { data: mappings, isLoading } = useGetByFryStationItemIdQuery({ fryStationItemId });

  if (isLoading) {
    return (
      <StyledContainer>
        <CircularProgress />
      </StyledContainer>
    );
  }

  if (!mappings || mappings.length === 0) {
    return (
      <StyledContainer>
        <Typography variant="h6">Нет доступных позиций</Typography>
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
        {mappings.map((mapping) => (
          <StyledCard key={mapping.id}>
            <CardContent>
              <Typography variant="h6">{mapping.menuItem.name}</Typography>
              <Typography variant="body1">Кол-во: {mapping.quantityMultiplier}</Typography>
              {mapping.modifierItems.length > 0 && (
                <>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 1 }}>
                    Модификаторы:
                  </Typography>
                  {mapping.modifierItems.map((modifierItem) => (
                    <Typography key={modifierItem.id} variant="body2">
                      {modifierItem.groupName} {'->'} {modifierItem.name}
                    </Typography>
                  ))}
                </>
              )}
            </CardContent>
          </StyledCard>
        ))}
      </StyledListContainer>

      <NavigateToFryStationItemMappingCreate
        fryStationItemId={fryStationItemId}
        restaurantBranchId={restaurantBranchId}
      />
    </StyledContainer>
  );
};
