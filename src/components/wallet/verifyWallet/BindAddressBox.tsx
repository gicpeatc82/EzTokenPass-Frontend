import Image from 'next/image';
import { TFunction } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import logoGreenImg from '../../../../public/image/logo/logo-green-72x72.png';
import exchangeImg from '../../../../public/image/icon/exchange-72x72.png';
import logoGreenBGImg from '../../../../public/image/logo/logo-green-bg-72x72.png';
import metamaskImg from '../../../../public/image/account/metaMask.png';
import walletImg from '../../../../public/image/icon/digital-wallet-72x72.png';
import { myLoader } from '../../../utils/myLoader';
import { handleSetAddress } from '../../../utils/walletAddress';
import { UseEvmSignatureState } from '../../../hooks/evm/types';

interface BindAddressBoxProps {
  t: TFunction;
  isMetaMask: boolean;
  account?: string;
  handleBindEvmAddress: UseEvmSignatureState['handleBindEvmAddress'];
}

export default function BindAddressBox({
  t,
  isMetaMask,
  account,
  handleBindEvmAddress,
}: BindAddressBoxProps): JSX.Element {
  const BindAddressBoxStyles = () => ({
    row: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: '300px',
      pt: { xs: 2, md: 4 },
      mb: { xs: 2, md: 4 },
    },
    addressText: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      border: '2px solid #01E2A6',
      borderRadius: '50px',
      color: 'rgba(0, 0, 0, 0.5)',
      textTransform: 'capitalize',
      maxWidth: '420px',
      p: 1,
      mb: 4,
    },
    bindBtn: { display: 'flex', flexDirection: 'column' },
    showOnMobile: { display: { xs: 'flex', md: 'none' } },
    showOnWeb: { display: { xs: 'none', md: 'flex' } },
  });
  const classes = BindAddressBoxStyles();

  return (
    <>
      <Typography>{t('Please signature wallet to this account.')}</Typography>
      <Box sx={classes.row}>
        <Image
          loader={myLoader}
          src={isMetaMask ? logoGreenImg : logoGreenBGImg}
          alt="TokenPass"
          width="72"
          height="72"
          objectFit="contain"
        />
        <Image loader={myLoader} src={exchangeImg} alt="exchange" width="42" height="42" objectFit="contain" />
        <Image
          loader={myLoader}
          src={isMetaMask ? metamaskImg : walletImg}
          alt="metamask"
          width="72"
          height="72"
          objectFit="contain"
        />
      </Box>

      <Typography>{t('Current link address is')}</Typography>
      <Box sx={classes.addressText}>
        <Typography sx={classes.showOnMobile}>{account ? handleSetAddress(account) : t('connect wallet')}</Typography>
        <Typography sx={classes.showOnWeb}>{account ? account : t('connect wallet')}</Typography>
      </Box>
      {account && (
        <Button variant="contained" sx={classes.bindBtn} onClick={() => handleBindEvmAddress(account)}>
          <LinkIcon fontSize="large" />
          {t('bind your wallet')}
        </Button>
      )}
    </>
  );
}
