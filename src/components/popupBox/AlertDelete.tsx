import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function AlertDelete({
  handleRemove,
  deleteButton,
}: {
  handleRemove: () => void;
  deleteButton: JSX.Element;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box onClick={handleClickOpen}>{deleteButton}</Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {t('are you sure to delete this?')}
        </DialogTitle>

        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            {t('close')}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleRemove();
              handleClose();
            }}
          >
            {t('delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
