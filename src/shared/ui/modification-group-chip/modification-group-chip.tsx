import { Box, Chip } from '@mui/material';

import { useAppSelector } from '@shared/lib/store';

type Props = {
  selected: string[] | [];
};

export function ModificationGroupChip(props: Props) {
  const modificationGroups = useAppSelector(
    (state) => state.modificationGroupsSlice.modificationGroups,
  );

  const moodificationGroupByIdName: { [key: string]: string } = {};

  modificationGroups.forEach(
    (modificationGroup) =>
      (moodificationGroupByIdName[modificationGroup.id] = modificationGroup.name),
  );

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {props.selected.map((value) => {
        return <Chip key={value} label={moodificationGroupByIdName[value]} />;
      })}
    </Box>
  );
}
