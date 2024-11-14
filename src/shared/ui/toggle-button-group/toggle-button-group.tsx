import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';

export function CustomToggleButtonGroup() {
  const [alignment, setAlignment] = useState<string | null>('delivery');

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment);
  };
  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      size="small"
      fullWidth
      onChange={handleAlignment}
      sx={{ marginBottom: 2 }}
    >
      <ToggleButton value="delivery" aria-label="left aligned">
        Доставка
      </ToggleButton>
      <ToggleButton value="pickup" aria-label="centered">
        Самовывоз
      </ToggleButton>
      <ToggleButton value="loci" aria-label="right aligned">
        В заведении
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
