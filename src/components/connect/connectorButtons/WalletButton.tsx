import { Box, Button } from '@mui/material';
import type { Web3ReactHooks } from '@web3-react/core';

interface WalletButtonProps {
  handleConnect: () => void;
  disabled: ReturnType<Web3ReactHooks['useIsActivating']>;
  icon: string;
  walletName: string;
}

const WalletButtonStyles = () => ({
  paper: { display: 'flex', flexDirection: 'column' },
  button: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#333',
    textTransform: 'capitalize',
    minWidth: { xs: 80, md: 125 },
    minHeight: { xs: 70, md: 100 },
    maxWidth: { xs: 80, md: 'auto' },
  },
  icon: { width: { xs: '40px', md: '60px' }, height: { xs: '40px', md: '60px' } },
  name: { fontSize: { xs: 10, md: 16 } },
});

export default function WalletButton({ handleConnect, disabled, icon, walletName }: WalletButtonProps) {
  const classes = WalletButtonStyles();
  return (
    <Box sx={classes.paper}>
      <Button variant="contained" color="secondary" sx={classes.button} onClick={handleConnect} disabled={disabled}>
        <Box sx={classes.icon}>
          <img src={icon} alt={walletName} width="100%" />
        </Box>
        <Box sx={classes.name}>{walletName}</Box>
      </Button>
    </Box>
  );
}
