import { useState } from 'react';

import { Modal } from '@/shared/ui/modal/modal';
import {
  StyledActionBox,
  StyledCard,
  StyledCardContent,
} from '@/shared/ui/modification-card/modification-card.styles';
import RemoveCircleOutlineTwoToneIcon from '@mui/icons-material/RemoveCircleOutlineTwoTone';
import { Box, Button, CardActions, Chip, IconButton, Typography } from '@mui/material';

import { useDeleteModificationMutation } from '../api/modification-group-api';
import { Modification } from './types';

export function ModificationItem(props: Modification) {
  const [modificationModal, setModificationModal] = useState(false);

  const [deleteModification] = useDeleteModificationMutation();

  const handleSubmit = () => {
    deleteModification({ id: props.id });
  };
  const handleCancel = () => {
    setModificationModal(false);
  };

  return (
    <>
      <StyledCard>
        <Box padding={0}>
          <StyledCardContent>
            <Typography variant="h5">{props.name}</Typography>
          </StyledCardContent>
        </Box>
        <StyledActionBox>
          <CardActions>
            {props.isMandatory && <Chip label="обязательный" />}
            <Button variant="outlined" disabled>
              {props.price} тг
            </Button>
            <IconButton onClick={() => setModificationModal(true)}>
              <RemoveCircleOutlineTwoToneIcon color="error" />
            </IconButton>
          </CardActions>
        </StyledActionBox>
      </StyledCard>
      {modificationModal && (
        <Modal text="Хотите удалить модификацию?" onCancel={handleCancel} onDelete={handleSubmit} />
      )}
    </>
  );
}
