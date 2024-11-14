import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { Modification, ModificationGroupSchema } from './type';

type Props = ModificationGroupSchema & {
  onChange: (modification: Modification, prevValue: string | null) => void;
};

export function ModificationRadioGroup(props: Props) {
  const { modificationGroup } = props;

  const [prevValue, setPrevValue] = useState<null | string>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrevValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <FormLabel id={modificationGroup.id}>{modificationGroup.name}</FormLabel>
      <RadioGroup name={modificationGroup.name} onChange={handleChange}>
        {modificationGroup.modifications.map((modification) => {
          return (
            <Stack key={modification.id} direction="row" alignItems="center">
              <FormControlLabel
                onChange={() => props.onChange(modification, prevValue)}
                value={modification.id}
                control={<Radio />}
                label={modification.name}
              />

              <Typography fontStyle="italic">{modification.price} тенге</Typography>
            </Stack>
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
