'use client';

import { CircularProgress, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import {
  ModificationGroupOverview,
  useAddModificationMutation,
  useGetModificationGroupQuery,
} from '@entities/modification-group';
import { AddModificationModal } from '@features/menu/add-modification-modal';

import { Modification } from './types';

export function ModificationGroupDetailsWidget() {
  const params = useParams<{ id: string }>();

  const [addModificationModal, setAddModificationModal] = useState(false);

  const { data, isLoading, isError } = useGetModificationGroupQuery(params?.id as string);

  const [addModification] = useAddModificationMutation();

  const handleModificationModalOpen = () => {
    setAddModificationModal(true);
  };

  const handleModificationModalClose = () => {
    setAddModificationModal(false);
  };

  const handleModificationSubmit = async (modification: Modification) => {
    if (data) {
      await addModification({
        ...modification,
        modificationGroupId: data.id,
      }).unwrap();

      setAddModificationModal(false);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography>There was an error</Typography>;
  }

  return (
    <>
      {data && <ModificationGroupOverview {...data} onModalOpen={handleModificationModalOpen} />}
      {addModificationModal && (
        <AddModificationModal
          onModificationClose={handleModificationModalClose}
          onModificationSubmit={handleModificationSubmit}
        />
      )}
    </>
  );
}
