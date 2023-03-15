import { Button } from '@mui/material';
import type { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { GnosisSafe } from '@web3-react/gnosis-safe';
import type { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';

export default function DisconnectButton({
  connector,
}: {
  connector: MetaMask | WalletConnect | CoinbaseWallet | Network | GnosisSafe;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '1rem' }} />
      <Button
        sx={{ color: '#fff' }}
        onClick={() => {
          if (connector?.deactivate) {
            void connector.deactivate();
          } else {
            void connector.resetState();
          }
        }}
      >
        Disconnect
      </Button>
    </div>
  );
}
