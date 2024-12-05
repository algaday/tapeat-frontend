'use client';

import { CircularProgress } from '@mui/material';

import { ModificationCard } from '@/shared/ui/modification-card/modification-card';
import { useGetAllModificationGroupsQuery } from '@entities/modification-group';

export function ModificationGroupList() {
  const { data: modificationGroups, isLoading } = useGetAllModificationGroupsQuery();

  if (isLoading) {
    return <CircularProgress />;
  }
  //todo: put the right props
  return (
    <>
      {modificationGroups?.map((modificationGroup) => {
        return (
          <ModificationCard
            modificationGroupId={''}
            price={''}
            key={modificationGroup.id}
            {...modificationGroup}
            modificationCount={modificationGroup.modifications.length}
          />
        );
      })}
    </>
  );
}
