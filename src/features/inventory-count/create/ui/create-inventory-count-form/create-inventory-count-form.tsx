'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { FormProvider as RHFormProvider, useForm } from 'react-hook-form';

import {
  CreateInventoryCountSchema,
  CreateInventoryCountSchema as FormValueProps,
  createInventoryCountSchema,
  useCreateInventoryCountMutation,
  useGetBranchInventoryCountTemplatesQuery,
} from '@entities/inventory-count';
import { useGetRestaurantBranchesQuery } from '@entities/restaurant-branch';
import { InventoryButton } from '@shared/ui/inventory-button';
import { RHFInputField } from '@shared/ui/rhf/rhf-input-field';

import { StackStyle } from './style';

import { BranchSelect } from './select-branch';
import { TemplateSelect } from './select-template';

export const defaultValues: CreateInventoryCountSchema = {
  branchName: '',
  inventoryCountTemplateId: '',
  staffName: '',
};

export const CreateInventoryCountForm = () => {
  const params = useParams<{ restaurantId: string; inventoryCountId: string }>();
  const restaurantId = params?.restaurantId as string;

  const { data: branches, isLoading: isBranchesLoading } =
    useGetRestaurantBranchesQuery(restaurantId);

  const methods = useForm<FormValueProps>({
    resolver: zodResolver(createInventoryCountSchema),
    defaultValues,
  });
  const { watch, handleSubmit } = methods;
  const router = useRouter();
  const { branchName } = watch();

  const branchId = branches?.find((branch) => branch.address === branchName)?.id ?? '';

  const { data: templates, isLoading: isTemplatesLoading } =
    useGetBranchInventoryCountTemplatesQuery(branchId, { skip: !branchId });

  const [createInventoryCount] = useCreateInventoryCountMutation();

  const onSubmit = async (data: FormValueProps) => {
    const res = await createInventoryCount(data).unwrap();
    router.push(`/restaurants/${restaurantId}/inventory-counts/${res.id}/storages`);
  };

  return (
    <RHFormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StackStyle spacing={2}>
          <RHFInputField name="staffName" label="Ваше Имя" />

          <BranchSelect branches={branches} isLoading={isBranchesLoading} />

          {branchName && <TemplateSelect templates={templates} isLoading={isTemplatesLoading} />}

          <InventoryButton type="submit" variant="contained">
            Создать
          </InventoryButton>
        </StackStyle>
      </form>
    </RHFormProvider>
  );
};
