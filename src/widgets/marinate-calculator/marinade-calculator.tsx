'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Divider, InputAdornment, Typography } from '@mui/material';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { RHFInputField } from '@shared/ui/rhf/rhf-input-field';

export const marinadeCalculatorSchema = z
  .object({
    containerWeight: z
      .number({ message: 'Введите вес контейнера' })
      .min(0.01, { message: 'Вес контейнера должен быть больше 0' }), // Avoid zero weight
    totalWeight: z
      .number({ message: 'Введите общий вес' })
      .min(0.01, { message: 'Общий вес должен быть больше 0' })
      .refine((val) => !isNaN(val), {
        message: 'Введите общий вес (мясо + контейнер)',
      }),
  })
  .refine((data) => data.totalWeight > data.containerWeight, {
    message: 'Общий вес должен быть больше веса контейнера',
    path: ['totalWeight'],
  });

export type MarinadeCalculatorSchema = z.infer<typeof marinadeCalculatorSchema>;

const CONTAINER_WEIGHT_KEY = 'CONTAINER_WEIGHT_KEY';

export function MarinadeCalculator() {
  const lastSavedContainerWeight = localStorage.getItem(CONTAINER_WEIGHT_KEY);

  const [result, setResult] = useState<{
    netMeatWeight: number;
    marinadeWeight: number;
  } | null>(null);
  const methods = useForm<MarinadeCalculatorSchema>({
    resolver: zodResolver(marinadeCalculatorSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      containerWeight: lastSavedContainerWeight ? parseFloat(lastSavedContainerWeight) : 1.4,
    },
  });

  const errorMessage =
    methods.formState.errors.containerWeight?.message ||
    methods.formState.errors.totalWeight?.message;

  const roundTo50Grams = (weightInKgs: number) => {
    // Round to nearest 0.05 kg
    return Math.round(weightInKgs * 20) / 20;
  };

  const calculateMarinadeAmount = (data: MarinadeCalculatorSchema) => {
    const netMeatWeight = data.totalWeight - data.containerWeight;

    const marinadeWeight = netMeatWeight / 4;

    setResult({
      netMeatWeight: roundTo50Grams(netMeatWeight),
      marinadeWeight: roundTo50Grams(marinadeWeight),
    });
    localStorage.setItem(CONTAINER_WEIGHT_KEY, data.containerWeight.toString());
  };

  return (
    <Box padding={4}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(calculateMarinadeAmount)} noValidate>
          <Typography fontWeight="bold" variant="h6" component="h2" sx={{ mb: 2 }}>
            Расчет маринада
          </Typography>
          <Divider></Divider>
          <Typography sx={{ color: '#333', mt: 2, fontSize: 17 }}>Вес контейнера (кг)</Typography>
          <RHFInputField
            name="containerWeight"
            placeholder="Вес контейнера (кг)"
            type="number"
            margin="normal"
            fullWidth
            sx={{ my: 0 }}
            showErrorMessage={false}
            InputProps={{
              inputProps: { min: 0, max: 100000 },
              endAdornment: <InputAdornment position="end">кг</InputAdornment>,
            }}
            inputProps={{
              inputMode: 'decimal',
              pattern: '[0-9]*[.,]?[0-9]*', // Allows optional decimal point (or comma) for fractions
            }}
          />
          <Typography sx={{ color: '#333', fontSize: 17 }}>
            Общий вес (мясо + контейнер) кг
          </Typography>
          <RHFInputField
            name="totalWeight"
            type="number"
            placeholder="Общий вес (кг)"
            margin="normal"
            fullWidth
            showErrorMessage={false}
            sx={{ my: 0 }}
            InputProps={{
              inputProps: { min: 0, max: 100000 },
              endAdornment: <InputAdornment position="end">кг</InputAdornment>,
            }}
            inputProps={{
              inputMode: 'decimal',
              pattern: '[0-9]*[.,]?[0-9]*', // Allows optional decimal point (or comma) for fractions
            }}
          />
          <Button sx={{ mb: 2 }} variant="contained" type="submit" fullWidth>
            Расчитать маринад
          </Button>
          {errorMessage && (
            <Alert severity="error">
              <Typography fontSize={19}>{errorMessage}</Typography>
            </Alert>
          )}
          {!errorMessage && result && (
            <Alert severity="success">
              <Typography fontSize={19}>Чистый вес мясо {result.netMeatWeight}кг.</Typography>
              <Typography fontSize={19}>Вес маринада {result.marinadeWeight}кг</Typography>
            </Alert>
          )}
        </form>
      </FormProvider>
    </Box>
  );
}
