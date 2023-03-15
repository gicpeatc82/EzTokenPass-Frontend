import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Divider, Typography } from '@mui/material';
import { TFunction } from 'react-i18next';
import BuildIcon from '@mui/icons-material/Build';
import Link from 'next/link';
import { UseUserState } from '../../hooks/types';
import { handleSetAddress } from '../../utils/walletAddress';
import useOpen from '../../hooks/useOpen';

function NoNFT({ t, open, handleClose }: { t: TFunction; open: boolean; handleClose: () => void }) {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
          <Box sx={{ width: '15vw', height: '15vw', mb: 3 }}>
            <img src="/image/face/face-cry.png" alt="" width="100%" />
          </Box>

          <Typography>{t('You do not have the NFT for this event.')}</Typography>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 0 }}>
          <Button
            variant="contained"
            fullWidth
            color="warning"
            onClick={handleClose}
            sx={{ p: 2, display: 'flex', alignItems: 'center', borderRadius: 0 }}
          >
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function NoWallet({ t, open, handleClose }: { t: TFunction; open: boolean; handleClose: () => void }) {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
          <Box sx={{ width: '15vw', height: '15vw', mb: 3 }}>
            <img src="/image/icon/failed.svg" alt="" width="100%" />
          </Box>

          <Typography>{t('Your account has not connected any wallets.')}</Typography>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 0 }}>
          <Link href={'/member/my_wallet'}>
            <Button
              variant="contained"
              fullWidth
              color="error"
              onClick={handleClose}
              sx={{ p: 2, display: 'flex', alignItems: 'center', borderRadius: 0 }}
            >
              <Box sx={{ width: 20, height: 20, mr: 3 }}>
                <img src="/image/icon/wallet_user.svg" alt="" width="100%" />
              </Box>
              {t('To wallet page')}
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}

function YourWallet({
  t,
  open,
  handleClose,
  userEventNFTsAmount,
}: {
  t: TFunction;
  open: boolean;
  handleClose: () => void;
  userEventNFTsAmount: UseUserState['userEventNFTsAmount'];
}) {
  return (
    <>
      <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { maxWidth: 600 } }}>
        <DialogTitle color="white" sx={{ textAlign: 'center', bgcolor: '#01e2a6', mb: 2 }}>
          {t('your wallet')}
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 2, sm: 4 } }}>
          {userEventNFTsAmount &&
            userEventNFTsAmount.map((data) => (
              <Box
                key={data.userAddress}
                sx={{ display: 'flex', flexDirection: 'row', mb: 2, justifyContent: 'space-between' }}
              >
                <Typography sx={{ mr: 3 }}>
                  {data.balance} {t('NFTs in')}
                </Typography>
                <Typography sx={{ display: { xs: 'none', md: 'flex' } }}>{data.userAddress}</Typography>
                <Typography sx={{ display: { xs: 'flex', md: 'none' } }}>
                  {handleSetAddress(data.userAddress)}
                </Typography>
              </Box>
            ))}

          <Link href={'/member/my_wallet'}>
            <a>
              <Button variant="outlined" color="primary" fullWidth onClick={handleClose}>
                <Box
                  sx={{
                    transform: 'scaleX(-1)',
                    mr: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <BuildIcon fontSize="small" />
                </Box>
                {t('manage my wallet')}
              </Button>
            </a>
          </Link>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 0 }}>
          <Button fullWidth onClick={handleClose} sx={{ p: 2, color: '#333' }}>
            {t('got it!')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function MyWalletButton({
  t,
  buttonComponent,
  userEventNFTsAmount,
  userBoundAddress,
}: {
  t: TFunction<'translation', undefined>;
  buttonComponent: JSX.Element;
  userEventNFTsAmount: UseUserState['userEventNFTsAmount'];
  userBoundAddress: UseUserState['userBoundAddress'];
}) {
  const { open, handleClickOpen, handleClose } = useOpen();
  return (
    <>
      <Box onClick={handleClickOpen}>{buttonComponent}</Box>
      {userBoundAddress && userBoundAddress.length === 0 && <NoWallet t={t} open={open} handleClose={handleClose} />}
      {userBoundAddress && userEventNFTsAmount ? (
        <YourWallet t={t} open={open} handleClose={handleClose} userEventNFTsAmount={userEventNFTsAmount} />
      ) : (
        <NoNFT t={t} open={open} handleClose={handleClose} />
      )}
    </>
  );
}
