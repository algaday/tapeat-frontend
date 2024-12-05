import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { RHFInputField } from '@/shared/ui/rhf/rhf-input-field';
import { useCreateBranchMutation } from '@entities/restaurant-branch';

import { CreateBranchSchema, createBranchSchema } from '../model';
import { Wrapper } from './restaurant-branch-form.styles';

export function RestaurantBranchForm() {
  const [createBranch] = useCreateBranchMutation();
  const router = useRouter();
  const methods = useForm<CreateBranchSchema>({
    resolver: zodResolver(createBranchSchema),
  });

  const onSubmit: SubmitHandler<CreateBranchSchema> = async (branch) => {
    await createBranch(branch).unwrap();
    router.push('/dashboard/branches');
  };
  return (
    <FormProvider {...methods}>
      <Wrapper onSubmit={methods.handleSubmit(onSubmit)}>
        <Typography variant="h6" component="h2">
          Создать филиал для ресторана
        </Typography>
        <RHFInputField name="address" id="address" label="Адрес" margin="normal" />
        <Button variant="contained" type="submit">
          Создать
        </Button>
      </Wrapper>
    </FormProvider>
  );
}
