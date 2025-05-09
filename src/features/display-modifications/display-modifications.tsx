import { Box } from '@mui/material';

import {
  addModificationCheckboxGroup,
  addModificationRadioGroup,
  ModificationGroupSchema,
} from '@entities/menu-item/menu-item-description';
import { useAppDispatch } from '@shared/lib/store';
import { ModificationCheckboxGroup } from '@shared/ui/modification-checkbox-group/modification-checkbox-group';
import { ModificationRadioGroup } from '@shared/ui/modification-radio-group/modification-radio-group';
import { Modification } from '@shared/ui/modification-radio-group/type';

type Props = {
  modificationGroups: ModificationGroupSchema[];
};

export function DisplayModification(props: Props) {
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (modification: Modification) => {
    dispatch(
      addModificationCheckboxGroup({
        price: Number(modification.price),
        id: modification.id,
      }),
    );
  };

  const handleRadioChange = (modification: Modification, prevModificationId: string | null) => {
    dispatch(
      addModificationRadioGroup({
        modification: {
          price: Number(modification.price),
          id: modification.id,
        },
        prevModificationId,
      }),
    );
  };

  return (
    <>
      {props.modificationGroups.map((modificationGroup) => {
        return (
          <Box key={modificationGroup.id}>
            {modificationGroup.isMultipleChoice ? (
              <ModificationCheckboxGroup
                key={modificationGroup.id}
                modificationGroup={modificationGroup}
                onChange={handleCheckboxChange}
              />
            ) : (
              <ModificationRadioGroup
                key={modificationGroup.id}
                modificationGroup={modificationGroup}
                onChange={handleRadioChange}
              />
            )}
          </Box>
        );
      })}
    </>
  );
}
