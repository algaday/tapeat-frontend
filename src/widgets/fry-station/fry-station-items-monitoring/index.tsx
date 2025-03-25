import { Undo } from '@mui/icons-material';
import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { keyBy } from 'lodash';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  FryStationItem,
  FryStationItemQuantity,
  useGetFryStationItemsQuery,
} from '@entities/fry-station-item';
import {
  recordCompletedFryItemQuantityChange,
  setSubstituteItemById,
  SubstitutionItem,
} from '@entities/fry-station-items-monitoring';
import { firebaseDb } from '@shared/lib/firebase';
import { useAppDispatch, useAppSelector } from '@shared/lib/store';

import { ResetConfirmation } from './reset-confirmation';
import { StyledContainer, StyledCard } from './styles';
import { SubstitutionSelect } from './substitution-select';
import { useResetItems } from './use-reset-items';
import { useRevertLastHistory } from './use-revert-last-history';

const COOKED_RESERVE_QUANTITIES = [2, 4, 6];

type Props = {
  fryStationId: string;
};

export const FryStationItemMonitoring = ({ fryStationId }: Props) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const { handleCloseDialog, handleConfirmReset, handleOpenDialog, isDialogOpen, isResetLoading } =
    useResetItems(fryStationId);

  const [fryStationItemQuantities, setFryStationItemQuantities] = useState<
    Record<string, FryStationItemQuantity>
  >({});
  const { data: fryStationItems = [], isLoading: isFryStationItemsFetching } =
    useGetFryStationItemsQuery();

  const { revertLastHistory } = useRevertLastHistory();

  useEffect(() => {
    setIsLoading(true);

    const quantitiesQuery = query(
      collection(firebaseDb, 'fry-stations', fryStationId, 'items'), // 👈 subcollection path
    );

    const unsubscribe = onSnapshot(
      quantitiesQuery,
      (snapshot) => {
        const quantities = snapshot.docs.map((doc) => doc.data() as FryStationItemQuantity);

        setFryStationItemQuantities(keyBy(quantities, (item) => item.fryStationItemId));

        setIsLoading(false);
      },
      (error) => {
        toast.error(error.message);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const { completedQuantities, substituteItemsById } = useAppSelector(
    (state) => state.fryStationMonitoring,
  );

  if (isLoading || isFryStationItemsFetching) {
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

  const calculateFractionQuantity = (quantity: number) => {
    const absFraction = Math.abs(quantity % 1);
    return absFraction === 1 ? 0 : absFraction;
  };

  const calculateDropAmount = (
    fryStationItem: FryStationItem,
    substitution: SubstitutionItem | null,
  ) => {
    const completedQuantity = completedQuantities[fryStationItem.id] || 0;

    const fryStationItemQuantity = fryStationItemQuantities[fryStationItem.id]?.quantity || 0;

    const remainingQuantity = fryStationItemQuantity - completedQuantity;

    console.log({ remainingQuantity, completedQuantity, name: fryStationItem.name });
    // For 1 fillet we substitute 3 strips. If we have 4 fillets, it is 12 strips.
    // Max drop of strips is 10. then we add 10 strips and current quantity is now, 4 - 10/3 = 0.6666
    // 0.6666 is still 1 fillet
    let requiredDropQuantity = Math.ceil(remainingQuantity);

    if (substitution) {
      // Step 1: How much of the original product is still required
      const fractionalLeftOver = calculateFractionQuantity(remainingQuantity);

      // Step 2: How many substitute units are needed for the whole remaining quantity
      const totalRequiredSubstituteQuantity =
        requiredDropQuantity * substitution.quantityMultiplier;

      // Step 3: How many substitute units were already cooked as part of another product
      const alreadyCoveredBySubstitution = fractionalLeftOver * substitution.quantityMultiplier;

      // Step 4: Subtract what's already covered
      // Fix floating point error like -2.000000000000001
      const remainingRequiredSubstituteQuantity = Math.round(
        totalRequiredSubstituteQuantity - alreadyCoveredBySubstitution,
      );

      requiredDropQuantity = remainingRequiredSubstituteQuantity;
    }

    const preferredDropAmount = requiredDropQuantity;

    const maxDropAmount =
      substitution?.substituteItem.maxDropAmount || fryStationItem.maxDropAmount;

    // Current reserve (if current quantity is negative, it means extra stock was made)
    const currentReserve = Math.max(0, -requiredDropQuantity);

    if (requiredDropQuantity < 1) {
      return {
        currentReserve,
        maxDropAmount,
        requiredDropQuantity,
        dropAmount: 0,
      };
    }

    return {
      currentReserve,
      maxDropAmount,
      requiredDropQuantity,
      dropAmount: Math.min(preferredDropAmount, maxDropAmount),
    };
  };

  const disposeCurrentReserve = (
    fryStationItem: FryStationItem,
    substituteItemId: string | null,
  ) => {
    const completedQuantity = completedQuantities[fryStationItem.id] || 0;
    const requiredQuantity = fryStationItemQuantities[fryStationItem.id]?.quantity || 0;

    // Reserve = how much we cooked above the required
    const currentReserve = completedQuantity - requiredQuantity;

    // Only remove if we overcooked
    if (currentReserve > 0) {
      dispatch(
        recordCompletedFryItemQuantityChange({
          fryStationItemId: fryStationItem.id,
          quantityDelta: -currentReserve, // remove exact excess
          substituteItemId,
        }),
      );
    }
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

  const onSubstitutionChange = (
    fryStationItem: FryStationItem,
    newSubstitution: SubstitutionItem | null,
  ) => {
    const substitutionBeforeChange = substituteItemsById[fryStationItem.id];
    // if substitution is turned off, remove reserve
    if (!newSubstitution && substitutionBeforeChange) {
      // dispose reserve
      disposeCurrentReserve(fryStationItem, substitutionBeforeChange.substituteItem.id);
    }

    dispatch(
      setSubstituteItemById({
        fryStationItemId: fryStationItem.id,
        newSubstitution,
      }),
    );
  };

  const dropItemToFryer = (
    fryStationItemId: string,
    quantity: number,
    substituteItem: SubstitutionItem | null,
  ) => {
    const quantityDelta = substituteItem ? quantity / substituteItem.quantityMultiplier : quantity;

    dispatch(
      recordCompletedFryItemQuantityChange({
        fryStationItemId,
        quantityDelta,
        substituteItemId: substituteItem?.substituteItem.id,
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
          <Undo
            onClick={() => revertLastHistory()}
            fontSize="large"
            sx={{ mr: 2, cursor: 'pointer' }}
          ></Undo>
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
          const currentSubstitute = substituteItemsById[item.id];

          const { dropAmount, requiredDropQuantity, maxDropAmount, currentReserve } =
            calculateDropAmount(item, currentSubstitute);

          // Displayed quantity (to prevent showing negative values)
          const displayQuantity = Math.max(0, requiredDropQuantity);

          const textColor = getTextColor(displayQuantity, maxDropAmount);

          const reserveQuantities = getReserveQuantities(dropAmount, maxDropAmount);

          const hasSubstitutions = !!item.substitutions?.length;

          return (
            <Stack key={item.id}>
              <StyledCard>
                <CardContent
                  sx={{
                    py: 1.5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {!currentSubstitute && <Typography variant="h3">{item.name}</Typography>}
                  {currentSubstitute && (
                    <Typography variant="h4">
                      {currentSubstitute.substituteItem.name} вместо {item.name}
                    </Typography>
                  )}
                  {hasSubstitutions && (
                    <SubstitutionSelect
                      onChange={(substitutedItem) => onSubstitutionChange(item, substitutedItem)}
                      substitutedItemId={currentSubstitute?.substituteItem.id || null}
                      fryStationItem={item}
                      fryStationItems={fryStationItems}
                    />
                  )}
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
                      <Typography sx={{ fontSize: 20 }}>Нужно положить</Typography>
                      <Typography variant="h4">{dropAmount}</Typography>
                      <Typography sx={{ fontSize: 20 }}>В запасе </Typography>
                      <Box display="flex">
                        <Typography sx={{ mr: 1 }} variant="h4">
                          {currentReserve}
                        </Typography>
                        {currentReserve > 0 && (
                          <Button
                            color="error"
                            onClick={() =>
                              disposeCurrentReserve(
                                item,
                                currentSubstitute?.substituteItem.id || null,
                              )
                            }
                          >
                            Удалить запасы
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  </Grid>

                  <Box display="flex">
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ py: 1, fontSize: 18, mt: 2, height: '66px' }}
                      onClick={() => dropItemToFryer(item.id, dropAmount, currentSubstitute)}
                      disabled={requiredDropQuantity < 1}
                    >
                      Приготовить {dropAmount} шт
                    </Button>
                    {reserveQuantities.map((reserve) => (
                      <Button
                        key={reserve}
                        variant="outlined"
                        sx={{ py: 1, fontSize: 16, lineHeight: 1.5, mt: 2, ml: 0.5 }}
                        onClick={() =>
                          dropItemToFryer(item.id, dropAmount + reserve, currentSubstitute)
                        }
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
