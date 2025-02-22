import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from '@mui/material';

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
  isResetLoading: boolean
};

export const ResetConfirmation = ({ isOpen, onClose, onConfirm, isResetLoading }: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Подтверждение</DialogTitle>
      <DialogContent>
        <Typography>Вы уверены, что хотите сбросить все заказы?</Typography>
      </DialogContent>
      <DialogActions>
        <Button disabled={isResetLoading} onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button disabled={isResetLoading} onClick={onConfirm} color="error" variant="contained">
          Сбросить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
