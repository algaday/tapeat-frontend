'use client';

import { ModificationCard } from '@/shared/ui/modification-card/modification-card';
import { CircularProgress } from '@mui/material';

import { useGetAllModificationGroupsQuery } from '@entities/modification-group';

export function ModificationGroupList() {
  const { data: modificationGroups, isLoading } = useGetAllModificationGroupsQuery();

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      {modificationGroups?.map((modificationGroup) => {
        return (
          <ModificationCard
            key={modificationGroup.id}
            {...modificationGroup}
            modificationCount={modificationGroup.modifications.length}
          />
        );
      })}
    </>
  );
}
