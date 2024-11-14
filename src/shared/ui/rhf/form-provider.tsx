/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, BoxProps } from '@mui/material';
import React, { ReactNode } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
};

type CombinedProps = Props & BoxProps;

export function FormProvider({ children, onSubmit, methods, ...other }: CombinedProps) {
  return (
    <Form {...methods}>
      <Box {...other} component="form" onSubmit={onSubmit}>
        {children}
      </Box>
    </Form>
  );
}
