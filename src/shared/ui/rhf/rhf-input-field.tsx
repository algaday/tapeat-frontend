import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type IProps = {
  name: string;
  showErrorMessage?: boolean;
};

type Props = IProps & TextFieldProps;

export function RHFInputField({ name, showErrorMessage, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error && showErrorMessage ? error.message : ' '}
          onChange={(event) => {
            const newValue =
              other.type === 'number' ? Number(event.target.value) : event.target.value;
            field.onChange(isNaN(newValue as number) ? '' : newValue);
          }}
          {...other}
        />
      )}
    />
  );
}
