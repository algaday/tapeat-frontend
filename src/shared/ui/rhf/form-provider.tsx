import React, { ReactNode } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

import { Box, BoxProps } from '@mui/material';

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
