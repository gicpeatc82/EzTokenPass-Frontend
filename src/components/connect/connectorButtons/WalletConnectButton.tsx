import DisconnectButton from './DisconnectButton';
import WalletButton from './WalletButton';
import useWallet from '../../../hooks/useWallet';
import { WalletButtonProps } from './types';

export function WalletConnectButton({
  connector,
  chainId,
  isActivating,
  isActive,
  error,
  setError,
}: WalletButtonProps) {
  const { handleConnect } = useWallet({ connector, chainId, isActive, setError });

  // const displayDefault = !isNetwork;
  // const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map((chainId) => Number(chainId));

  if (isActive) {
    return <DisconnectButton connector={connector} />;
  } else {
    return (
      <WalletButton
        handleConnect={handleConnect}
        disabled={isActivating}
        icon={'/image/account/walletConnect.png'}
        walletName={'WalletConnect'}
      />
    );
  }
}
