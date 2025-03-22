import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';

import {
  FryStationItem,
  FryStationItemSubstitution,
  FryStationItemWithShortSubstitution,
} from '@entities/fry-station-item';
import { keyBy } from 'lodash';
import { useMemo } from 'react';
import { SubstitutionItem } from '.';

type Props = {
  fryStationItem: FryStationItemWithShortSubstitution;
  onChange: (substituteItem: SubstitutionItem | null) => void;
  substitutedItemId: string | null;
  fryStationItems: FryStationItemWithShortSubstitution[];
};

export function SubstitutionSelect({
  fryStationItem,
  substitutedItemId,
  onChange,
  fryStationItems,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const fryStationItemsById = useMemo(
    () => keyBy(fryStationItems, (item) => item.id),
    [fryStationItems],
  );

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleResetSelect = () => {
    onChange(null);
  };

  const handleSelect = (substitutionItem: SubstitutionItem) => {
    onChange(substitutionItem);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {!substitutedItemId && (
        <Button color="error" variant="contained" onClick={handleOpenMenu}>
          Включить замену
        </Button>
      )}
      {substitutedItemId && (
        <Button color="success" variant="contained" onClick={handleResetSelect}>
          Отключить замену
        </Button>
      )}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {fryStationItem.substitutions?.map((substitution) => {
          const substituteItem = fryStationItemsById[substitution.substituteItemId];

          return (
            <MenuItem
              key={substitution.substituteItemId}
              selected={substitution.substituteItemId === substitutedItemId}
              onClick={() =>
                handleSelect({
                  substituteItem,
                  quantityMultiplier: substitution.quantityMultiplier,
                })
              }
            >
              {fryStationItemsById[substitution.substituteItemId]?.name} (
              {substitution.quantityMultiplier} шт)
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
