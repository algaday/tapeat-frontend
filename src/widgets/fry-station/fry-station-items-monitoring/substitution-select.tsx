import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { keyBy } from 'lodash';
import * as React from 'react';
import { useMemo } from 'react';

import { FryStationItem } from '@entities/fry-station-item';
import { SubstitutionItem } from '@entities/fry-station-items-monitoring';

type Props = {
  fryStationItem: FryStationItem;
  onChange: (substituteItem: SubstitutionItem | null) => void;
  substitutedItemId: string | null;
  fryStationItems: FryStationItem[];
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
        <Button color="warning" variant="contained" onClick={handleOpenMenu}>
          Включить замену
        </Button>
      )}
      {substitutedItemId && (
        <Button variant="contained" color="info" onClick={handleResetSelect}>
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
