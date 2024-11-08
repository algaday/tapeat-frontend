import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack } from '@mui/material';

import { RHFRadio } from '../rhf/rhf-radio';
import { Wrapper } from './modification-change-modal.styles';
import { ModificationChangeSchema, modificationChangeSchema } from './type';

type Props = {
  onSubmit: (data: ModificationChangeSchema) => void;
  onCancel: (name: string) => void;
} & ModificationChangeSchema;

const options = [
  {
    id: '1',
    label: 'Одна опция',
    value: false,
  },
  {
    id: '2',
    label: 'Несколько опции',
    value: true,
  },
];

export function ModificationChangeModal(props: Props) {
  const methods = useForm<ModificationChangeSchema>({
    resolver: zodResolver(modificationChangeSchema),
    defaultValues: {
      isMultipleChoice: props.isMultipleChoice,
    },
  });

  const onSubmit: SubmitHandler<ModificationChangeSchema> = async (data) => {
    props.onSubmit(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <Wrapper onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack direction="row" spacing={2} marginY={2}>
            <RHFRadio name="isMultipleChoice" labelText="Выбор опции" options={options} />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" color="success">
              Изменить
            </Button>
            <Button variant="outlined" onClick={() => props.onCancel('changeModal')}>
              Отменить
            </Button>
          </Stack>
        </Wrapper>
      </FormProvider>
    </>
  );
}
