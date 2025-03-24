import { CardContent, Chip, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import { useGetFryStationItemsQuery } from '@entities/fry-station-item';

import { StyledCard, StyledContainer } from './styles';

type Props = {
  restaurantBranchId: string;
};

export const FryStationItemList = ({ restaurantBranchId }: Props) => {
  const { data: items, isLoading } = useGetFryStationItemsQuery();
  const router = useRouter();

  if (isLoading) {
    return (
      <StyledContainer>
        <CircularProgress />
      </StyledContainer>
    );
  }

  if (!items || items.length === 0) {
    return (
      <StyledContainer>
        <Typography variant="h6">Нет доступных позиций</Typography>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      {items.map((item) => (
        <StyledCard key={item.id}>
          <CardContent>
            <Typography variant="h6">{item.name}</Typography>
            <Chip
              onClick={() =>
                router.push(
                  `/management/restaurant-branches/${restaurantBranchId}/fry-station/items/${item.id}/mappings`,
                )
              }
              clickable={true}
              sx={{ mb: 1 }}
              color="secondary"
              label="Привязки"
            ></Chip>
            <Chip
              onClick={() =>
                router.push(
                  `/management/restaurant-branches/${restaurantBranchId}/fry-station/items/${item.id}/substitutions`,
                )
              }
              clickable={true}
              color="secondary"
              label="Правила замены"
            ></Chip>
          </CardContent>
        </StyledCard>
      ))}
    </StyledContainer>
  );
};
