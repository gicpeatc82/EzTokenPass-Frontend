import * as React from 'react';
import { setAlertBox } from '../../redux/reducers/alertBoxReducer';
import { useDispatch } from 'react-redux';
import { Box, Typography, Dialog, DialogContent, DialogActions } from '@mui/material';
import { TFunction } from 'react-i18next';
import { useRouter } from 'next/router';

export default function AlertFaceBox({
  t,
  isAlertBox,
}: {
  t: TFunction;
  isAlertBox: {
    open: boolean;
    alertText: string;
    alertBGColor?: 'success' | 'error' | 'warning';
  };
}) {
  const isSuccess = isAlertBox.alertBGColor === 'success';
  const isError = isAlertBox.alertBGColor === 'error';
  const isWarning = isAlertBox.alertBGColor === 'warning';

  const faceImg = isSuccess
    ? '/image/face/face-smile.png'
    : isError
    ? '/image/face/face-XoX.png'
    : '/image/face/face-cry.png';
  const buttonColor = isSuccess ? '#01E2A6' : isError ? '#CC2020' : '#E2A301';
  const successTitle = isSuccess ? 'Success!' : isError ? 'Pass Failed!' : 'Pass Failed!';

  const dispatch = useDispatch();
  const router = useRouter();
  const handleClose = () => {
    if (isWarning) router.push('/');
    dispatch(setAlertBox({ open: false, alertBGColor: '', alertText: '' }));
  };

  return (
    <Dialog
      open={isAlertBox.open ? isAlertBox.open : false}
      onClose={handleClose}
      sx={{
        '& .MuiPaper-root': {
          maxWidth: 500,
          m: { xs: 2, md: 4 },
          borderRadius: '15px',
          width: { xs: 'calc(100% - 32px)', md: 'calc(100% - 64px)' },
        },
      }}
    >
      <DialogContent
        sx={{
          minWidth: { xs: '60%', md: 500 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ mb: 2 }}>
          <img src={faceImg} alt="" />
        </Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          {t(successTitle)}
        </Typography>
        {isAlertBox.alertText}
      </DialogContent>
      <DialogActions
        sx={{ bgcolor: buttonColor, color: '#fff', pt: 3, pb: 3, justifyContent: 'center', cursor: 'pointer' }}
        onClick={handleClose}
      >
        {t('close')}
      </DialogActions>
    </Dialog>
  );
}
