import { Box, Divider, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import CopyTextButton from '../../button/CopyTextButton';
import AlertDelete from '../../popupBox/AlertDelete';
import { handleSetAddress } from '../../../utils/walletAddress';

export default function WalletList({
  icon,
  text,
  address,
  handleDelete,
}: {
  icon: JSX.Element;
  text: string;
  address: string;
  handleDelete: () => void;
}) {
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          p: { xs: 1, md: 2 },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography
            color="primary"
            component="div"
            sx={{ ml: { xs: 0, md: 2 }, mr: { xs: 0, md: 2 }, fontSize: { xs: '18px', md: '24px' } }}
          >
            {icon}
          </Typography>
          <Box sx={{ ml: { xs: 1, md: 2 } }}>
            <Typography variant="h5" sx={{ fontSize: { xs: '16px', md: '20px' } }}>
              {text}
            </Typography>
            <Typography variant="body1" color="font.main" sx={{ display: { xs: 'none', md: 'flex' } }}>
              {address}
            </Typography>
            <Typography
              variant="body1"
              color="font.main"
              sx={{ display: { xs: 'flex', md: 'none' }, fontSize: '14px' }}
            >
              {handleSetAddress(address)}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <CopyTextButton copyText={address} successCopyMessage={t('copied!')} />
          <AlertDelete
            handleRemove={handleDelete}
            deleteButton={
              <IconButton color="font" sx={{ ml: { xs: 1, md: 2 }, p: { xs: 0, md: 1 } }}>
                <CloseIcon fontSize="large" />
              </IconButton>
            }
          />
        </Box>
      </Box>
      <Divider />
    </>
  );
}
