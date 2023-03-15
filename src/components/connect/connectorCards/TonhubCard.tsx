import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { TonhubConnector } from 'ton-x';
import { RemoteConnectPersistance, TonhubConnectProvider } from 'react-ton-x';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import WalletButton from '../connectorButtons/WalletButton';
import QrCodeItem from '../../qrcode/QrCodeItem';
import useOpen from '../../../hooks/useOpen';
import { dev } from '../../../data/node_envData';
import { isMobile, openLink } from '../../../hooks/ton/tonKeeper/state/utils';
import { addReturnStrategy } from '../../../hooks/ton/tonKeeper/state/connector';
import { useEffect } from 'react';
import useTonhubSignature from '../../../hooks/ton/tonhub/useTonhubSignature';

const TonhubConnect = ({ children }: { children: JSX.Element }) => {
  // use any persistent state you want for remote connector
  const [connectionState, setConnectionState] = useLocalStorage<RemoteConnectPersistance>('connection', {
    type: 'initing',
  });

  return (
    <TonhubConnectProvider
      network={dev ? 'testnet' : 'mainnet'}
      url={`${process.env.NEXT_PUBLIC_URL}`}
      name="Token Pass"
      debug={false}
      connectionState={connectionState}
      setConnectionState={setConnectionState}
    >
      {children}
    </TonhubConnectProvider>
  );
};

export default function TonhubCard() {
  const { open, handleClickOpen, handleClose } = useOpen();
  const connectionState = useReadLocalStorage<RemoteConnectPersistance>('connection');
  const connector = new TonhubConnector({ network: dev ? 'testnet' : 'mainnet' }); //Set network "sandbox" for testnet
  const { handleBindTonhub } = useTonhubSignature();

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

  const classes = dialogStyle();
  const isPending = connectionState && connectionState.type === 'pending';
  const isOnline = connectionState && connectionState.type === 'online';

  const handleClickOpenTonhub = () => {
    if (isPending && isMobile()) {
      openLink(addReturnStrategy(connectionState.link, 'none'), '_blank');
    } else {
      handleClickOpen();
    }
  };

  useEffect(() => {
    if (!!isOnline) handleBindTonhub(connectionState, connector);
  }, [isOnline]);

  return (
    <TonhubConnect>
      <>
        {!!isPending && (
          <Dialog open={open} onClose={handleClose} sx={classes.dialog}>
            <DialogTitle>Connect to Tonhub</DialogTitle>
            <DialogContent sx={classes.dialogContent}>
              <QrCodeItem id={'tonhub'} value={connectionState.link} size={250} />
            </DialogContent>
            <DialogActions onClick={handleClose}>{'close'}</DialogActions>
          </Dialog>
        )}
        {!!isOnline ? (
          <Button variant="contained" onClick={() => handleBindTonhub(connectionState, connector)}>
            Authorize Signature
          </Button>
        ) : (
          <WalletButton
            handleConnect={handleClickOpenTonhub}
            disabled={false}
            icon={'/image/account/tonhub.svg'}
            walletName={'Tonhub'}
          />
        )}
      </>
    </TonhubConnect>
  );
}
