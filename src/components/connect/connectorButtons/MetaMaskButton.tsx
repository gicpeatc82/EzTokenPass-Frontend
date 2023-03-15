import DisconnectButton from './DisconnectButton';
import { WalletButtonProps } from './types';
import useWallet from '../../../hooks/useWallet';
import WalletButton from './WalletButton';

export function MetaMaskButton({ connector, chainId, isActivating, isActive, error, setError }: WalletButtonProps) {
  const { handleConnect } = useWallet({ connector, chainId, isActive, setError });

  // const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map((chainId) => Number(chainId));

  if (isActive) {
    return <DisconnectButton connector={connector} />;
  } else {
    return (
      <WalletButton
        handleConnect={handleConnect}
        disabled={isActivating}
        icon={'/image/account/metaMask.png'}
        walletName={'MetaMask'}
      />
    );
  }
}
