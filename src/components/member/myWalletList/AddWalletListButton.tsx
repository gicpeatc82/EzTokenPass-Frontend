import { useTranslation } from 'react-i18next';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import MyWalletPageConnectBox from '../../wallet/MyWalletPageConnectBox';
import { UseUserState } from '../../../hooks/types';
import useOpen from '../../../hooks/useOpen';

export default function AddWalletListButton({
  userBoundAddress,
}: {
  userBoundAddress: UseUserState['userBoundAddress'];
}) {
  const { t } = useTranslation();
  const { open, handleClickOpen, handleClose } = useOpen();

  return (
    <>
      {open ? (
        <>
          <MyWalletPageConnectBox t={t} userBoundAddress={userBoundAddress} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', p: 2 }}>
            <IconButton color="primary" onClick={handleClose} sx={{ ml: 2 }}>
              <CloseIcon fontSize="large" />
              <Typography sx={{ fontSize: { xs: 16, md: 24 } }}> {t('close')}</Typography>
            </IconButton>
          </Box>
        </>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', p: 2 }}>
          <IconButton color="primary" onClick={handleClickOpen} sx={{ ml: 2 }}>
            <AddIcon fontSize="large" />
            <Typography sx={{ fontSize: { xs: 16, md: 24 } }}>{t('add signing wallet')}</Typography>
          </IconButton>
        </Box>
      )}
    </>
  );
}
