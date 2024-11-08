import { Controller, useFormContext } from 'react-hook-form';

import { Stack, Switch, SwitchProps, Typography } from '@mui/material';

type Props = SwitchProps & { name: string; text: string };

export function RHFSwitch(props: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field }) => {
        return (
          <Stack direction={'row'} alignItems={'center'}>
            <Typography>{props.text}</Typography>
            <Switch
              id={props.id}
              value={field.value}
              onChange={field.onChange}
              checked={field.value}
            />
          </Stack>
        );
      }}
    />
  );
}
