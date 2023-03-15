import { TFunction } from 'react-i18next';
import type { Connector } from '@web3-react/types';
import { Box, Button, Theme } from '@mui/material';
import { UseUserState } from '../../../hooks/types';
import { isMobileDevice } from '../../../utils/userAgent';
import { getName } from '../../../utils/walletName';
import theme from '../../../utils/theme';
import BindAddressBox from './BindAddressBox';
import WalletBox from './WalletBox';
import useEvmSignature from '../../../hooks/evm/useEvmSignature';

interface VerifyWalletBoxProps {
  t: TFunction;
  userBoundAddress: UseUserState['userBoundAddress'];
  connector: Connector;
  account?: string;
}

const verifyWalletBoxStyles = (theme: Theme, containerFlexDirection: string) => ({
  wallpaper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: '#f9f9f9',
    borderRadius: '15px',
    flexDirection: 'column',
    overflow: 'hidden',
    minHeight: '300px',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: containerFlexDirection,
    justifyContent: 'space-around',
    alignItems: 'center',
    p: { xs: 2, md: 4 },
  },
  disconnect: { bgcolor: '#DEDEDE', color: 'rgba(0, 0, 0, 0.5)', mt: 2 },
});

export default function VerifyWalletContainer({
  t,
  userBoundAddress,
  connector,
  account,
}: VerifyWalletBoxProps): JSX.Element {
  const isMobile = isMobileDevice();
  const isMetaMask = getName(connector) === 'MetaMask';
  const isConnectButNotBoundAddress = account && !userBoundAddress;
  const containerFlexDirection = account && !userBoundAddress ? 'column' : 'row';
  const classes = verifyWalletBoxStyles(theme, containerFlexDirection);

  const { handleBindEvmAddress } = useEvmSignature();

  const handleDisconnectWallet = () => {
    if (connector?.deactivate) {
      void connector.deactivate();
    } else {
      void connector.resetState();
    }
  };
  return (
    <Box sx={classes.wallpaper}>
      <Box sx={classes.container}>
        {isConnectButNotBoundAddress ? (
          <BindAddressBox t={t} isMetaMask={isMetaMask} account={account} handleBindEvmAddress={handleBindEvmAddress} />
        ) : (
          <WalletBox
            userBoundAddress={userBoundAddress}
            handleBindEvmAddress={handleBindEvmAddress}
            isMobile={isMobile}
          />
        )}
        {account && !isMetaMask && (
          <Button variant="contained" color="font" sx={classes.disconnect} onClick={handleDisconnectWallet}>
            {t('Disconnect wallet')}
          </Button>
        )}
      </Box>
    </Box>
  );
}
