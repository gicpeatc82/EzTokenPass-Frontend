import { Box, Button, Theme, Typography } from '@mui/material';
import { TFunction } from 'react-i18next';
import { UseUserState } from '../../hooks/types';
import WalletBox from './verifyWallet/WalletBox';
import { isMobileDevice } from '../../utils/userAgent';
import { handleSetAddress } from '../../utils/walletAddress';
import theme from '../../utils/theme';
import { useWeb3React } from '@web3-react/core';
import useEvmSignature from '../../hooks/evm/useEvmSignature';

interface MyWalletPageConnectBoxProps {
  t: TFunction;
  userBoundAddress: UseUserState['userBoundAddress'];
}

const MyWalletPageConnectStyles = (theme: Theme) => ({
  box1: {
    display: 'flex',
    alignItems: 'center',
    bgcolor: '#f9f9f9',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  boxTitle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    bgcolor: '#01e2a6',
    color: '#fff',
    textTransform: 'capitalize',
    p: 2,
  },
  box3: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    mt: 2,
    mb: 2,
    p: 2,
  },
});

export default function MyWalletPageConnectBox({ t, userBoundAddress }: MyWalletPageConnectBoxProps): JSX.Element {
  const isMobile = isMobileDevice();
  const { handleBindEvmAddress } = useEvmSignature();
  const classes = MyWalletPageConnectStyles(theme);
  const { account: evmAddress } = useWeb3React();

  return (
    <Box sx={classes.box1}>
      <Box sx={classes.boxTitle}>{evmAddress ? handleSetAddress(evmAddress) : t('connect wallet')}</Box>
      <Box sx={classes.box3}>
        {evmAddress ? (
          <>
            <Typography>{t('Please signature wallet to this account.')}</Typography>
            <Box sx={{ pt: 2, mb: 2 }}></Box>
            <Button variant="contained" onClick={() => handleBindEvmAddress(evmAddress)}>
              {t('bind your wallet')}
            </Button>
          </>
        ) : (
          <WalletBox
            userBoundAddress={userBoundAddress}
            handleBindEvmAddress={handleBindEvmAddress}
            isMobile={isMobile}
          />
        )}
      </Box>
    </Box>
  );
}
