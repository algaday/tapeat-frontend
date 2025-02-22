import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { FryStationItem } from '@entities/fry-station-item';
import { incrementCompletedFryStationItemQuantity } from '@entities/fry-station-items-monitoring';
import { firebaseDb } from '@shared/lib/firebase';
import { useAppDispatch, useAppSelector } from '@shared/lib/store';

import { StyledContainer, StyledCard } from './styles';
import theme from '@app/providers/theme';
import { useResetItemsMutation } from '@entities/fry-station-item';
import { ResetConfirmation } from './reset-confirmation';
import { useResetItems } from './use-reset-items';
import { useRevertLastHistory } from './use-revert-last-history';
import { Undo } from '@mui/icons-material';

const COOKED_RESERVE_QUANTITIES = [2, 4, 6];

type Props = {
  fryStationId: string;
};
export const FryStationItemMonitoring = ({ fryStationId }: Props) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const [fryStationItems, setFryStationItems] = useState<FryStationItem[]>([]);

  const { handleCloseDialog, handleConfirmReset, handleOpenDialog, isDialogOpen, isResetLoading } =
    useResetItems(fryStationId);

  const { revertLastHistory, isRevertPossible } = useRevertLastHistory();
  useEffect(() => {
    setIsLoading(true);

    const fryStationQuery = query(
      collection(firebaseDb, 'fry-station-item'),
      where('fryStationId', '==', fryStationId),
    );

    const unsubscribe = onSnapshot(
      fryStationQuery,
      (snapshot) => {
        setFryStationItems(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as FryStationItem[],
        );
        setIsLoading(false);
      },
      (error) => {
        toast.error(error.message);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  // Get completed quantities from Redux store
  const completedQuantities = useAppSelector(
    (state) => state.fryStationMonitoring.completedQuantities,
  );

  if (isLoading) {
    return (
      <StyledContainer>
        <CircularProgress />
      </StyledContainer>
    );
  }

  if (!fryStationItems || fryStationItems.length === 0) {
    return (
      <StyledContainer>
        <Typography variant="h6">Нет доступных позиций</Typography>
      </StyledContainer>
    );
  }

  const calculateDropAmount = (fryStationItem: FryStationItem) => {
    const completedQuantity = completedQuantities[fryStationItem.id] || 0;

    const currentQuantity = fryStationItem.quantity - completedQuantity;

    const preferredDropAmount = currentQuantity;

    if (currentQuantity < 1) {
      return 0;
    }

    return Math.min(preferredDropAmount, fryStationItem.maxDropAmount);
  };

  const getTextColor = (currentQuantity: number, maxDropAmount: number) => {
    const drops = Math.abs(currentQuantity) / maxDropAmount;

    if (drops < 2) {
      return theme.palette.success.light;
    }

    if (drops < 3) {
      return theme.palette.warning.light;
    }

    return theme.palette.error.light;
  };

  const dropItemToFryer = (fryStationItemId: string, quantity: number) => {
    dispatch(
      incrementCompletedFryStationItemQuantity({
        fryStationItemId,
        quantityDelta: quantity,
      }),
    );
  };

  const getReserveQuantities = (dropAmount: number, maxDropAmount: number) => {
    const canDropForReserveQuantity = maxDropAmount - dropAmount;
    if (canDropForReserveQuantity <= 0) return [];

    // Special case: If only up to 3 drops available, return [1, 2, 3]
    if (canDropForReserveQuantity <= 3) {
      return Array.from({ length: canDropForReserveQuantity }, (_, i) => i + 1);
    }

    // Step 1: Try using predefined [2, 4, 6] first
    const reserves = COOKED_RESERVE_QUANTITIES.filter((q) => q <= canDropForReserveQuantity);

    // Step 2: If not enough values, fill missing ones with [2,3,4,5,6]
    if (reserves.length < 3) {
      for (let i = 2; i <= 6; i++) {
        if (!reserves.includes(i) && i <= canDropForReserveQuantity) {
          reserves.push(i);
        }
        if (reserves.length === 3) break;
      }
    }

    return reserves.sort((a, b) => a - b);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'white',
          borderRadius: 1,
          py: 1,
          px: 2,
        }}
        bgcolor="black"
      >
        <Typography variant="h3">Жарочная станция</Typography>
        <Box display="flex">
          <Undo onClick={()=>revertLastHistory()} fontSize="large" sx={{ mr: 2, cursor: 'pointer' }}></Undo>
          <Button
            variant="contained"
            color="error"
            sx={{ fontSize: 18 }}
            disabled={isResetLoading}
            onClick={handleOpenDialog}
          >
            Сбросить все заказы
          </Button>
        </Box>
      </Box>
      <StyledContainer>
        {fryStationItems.map((item) => {
          const completedQuantity = completedQuantities[item.id] || 0;
          const currentQuantity = item.quantity - completedQuantity;
          const dropAmount = calculateDropAmount(item);

          // Displayed quantity (to prevent showing negative values)
          const displayQuantity = Math.max(0, currentQuantity);
          // Current reserve (if current quantity is negative, it means extra stock was made)
          const currentReserve = Math.max(0, -currentQuantity);

          const textColor = getTextColor(displayQuantity, item.maxDropAmount);

          const reserveQuantities = getReserveQuantities(dropAmount, item.maxDropAmount);

          return (
            <Stack key={item.id}>
              <StyledCard>
                <CardContent sx={{ py: 1.5 }}>
                  <Typography variant="h3">{item.name}</Typography>
                </CardContent>
                <Divider></Divider>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6} padding={2}>
                      <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
                        Нужно приготовить
                      </Typography>
                      <Typography variant="h1" color={textColor}>
                        {displayQuantity}
                      </Typography>
                    </Grid>
                    <Divider orientation="vertical" flexItem sx={{ mr: '-1px' }} />
                    <Grid item xs={6} padding={2}>
                      <Typography sx={{ fontSize: 18 }}>Нужно положить</Typography>
                      <Typography variant="h4">{dropAmount}</Typography>
                      <Typography sx={{ fontSize: 18 }}>В запасе </Typography>
                      <Typography variant="h4">{currentReserve}</Typography>
                    </Grid>
                  </Grid>

                  <Box display="flex">
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ py: 1, fontSize: 18, mt: 2 }}
                      onClick={() => dropItemToFryer(item.id, dropAmount)}
                      disabled={currentQuantity < 1}
                    >
                      Приготовить {dropAmount} шт
                    </Button>
                    {reserveQuantities.map((reserve) => (
                      <Button
                        key={reserve}
                        variant="outlined"
                        sx={{ py: 1, fontSize: 16, lineHeight: 1.5, mt: 2, ml: 0.5 }}
                        onClick={() => dropItemToFryer(item.id, dropAmount + reserve)}
                        disabled={currentQuantity < 1}
                        color={reserve >= COOKED_RESERVE_QUANTITIES[1] ? 'error' : undefined}
                      >
                        {dropAmount + reserve}шт (+{reserve})
                      </Button>
                    ))}
                  </Box>
                </CardContent>
              </StyledCard>
            </Stack>
          );
        })}
      </StyledContainer>
      <ResetConfirmation
        isResetLoading={isResetLoading}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmReset}
      />
    </>
  );
};
