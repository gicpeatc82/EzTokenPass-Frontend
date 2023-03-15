import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import WalletButton from '../connectorButtons/WalletButton';
import QrCodeItem from '../../qrcode/QrCodeItem';
import useTonKeeper from '../../../hooks/ton/tonKeeper/useTonKeeper';

const dialogStyle = () => ({
  dialog: {
    '& .MuiPaper-root': {
      maxWidth: 500,
      m: { xs: 2, md: 4 },
      borderRadius: '15px',
      width: { xs: 'calc(100% - 32px)', md: 'calc(100% - 64px)' },
    },
  },
  dialogContent: {
    minWidth: { xs: '60%', md: 500 },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function TonKeeperCard() {
  const classes = dialogStyle();
  const { address, wallet, modalUniversalLink, setModalUniversalLink, handleTonKeeperButtonClick } = useTonKeeper();

  return (
    <>
      {wallet ? (
        <Typography>{address}</Typography>
      ) : (
        <WalletButton
          handleConnect={handleTonKeeperButtonClick}
          disabled={false}
          icon={'/image/account/tonkeeper.svg'}
          walletName={'TonKeeper'}
        />
      )}

      <Dialog open={!!modalUniversalLink} onClick={() => setModalUniversalLink('')} sx={classes.dialog}>
        <DialogTitle>Connect to Tonhub</DialogTitle>
        <DialogContent sx={classes.dialogContent}>
          <QrCodeItem id={'tonKeeper'} value={modalUniversalLink} size={256} />
        </DialogContent>
        <DialogActions onClick={() => setModalUniversalLink('')}>{'close'}</DialogActions>
      </Dialog>
    </>
  );
}
