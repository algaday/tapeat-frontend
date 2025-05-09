import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  RadioProps,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type Option = {
  value: string | boolean;
  label: string;
  id: string;
};

type Props = RadioProps & { name: string; labelText: string; options: Option[] };

export function RHFRadio(props: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field }) => {
        return (
          <FormControl>
            <FormLabel id={props.labelText}>{props.labelText}</FormLabel>
            <RadioGroup value={field.value} onChange={field.onChange} name={props.name}>
              {props.options.map((option) => {
                return (
                  <FormControlLabel
                    key={option.id}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        );
      }}
    />
  );
}
