import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { setAlertBox } from '../../redux/reducers/alertBoxReducer';
import { useDispatch } from 'react-redux';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertSnackbar({
  isAlertBox,
}: {
  isAlertBox: {
    open: boolean;
    alertText: string;
    alertBGColor?: 'success' | 'error' | 'warning';
  };
}) {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setAlertBox({ open: false, alertBGColor: '', alertText: '' }));
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={isAlertBox.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={isAlertBox.alertBGColor ? isAlertBox.alertBGColor : 'success'}
          sx={{
            width: '100%',
            fontSize: '1rem',
          }}
        >
          {isAlertBox.alertText}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
