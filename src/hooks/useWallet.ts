import { useState, useEffect, useCallback } from 'react';
import type { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import type { Web3ReactHooks } from '@web3-react/core';
import { GnosisSafe } from '@web3-react/gnosis-safe';
import type { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { CHAINS, getAddChainParameters } from '../data/chains';

function useWallet({
  connector,
  chainId,
  isActive,
  setError,
}: {
  connector: MetaMask | WalletConnect | CoinbaseWallet | Network | GnosisSafe;
  chainId: ReturnType<Web3ReactHooks['useChainId']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
  setError: (error: Error | undefined) => void;
}) {
  const isNetwork = connector instanceof Network;
  const currentChainId = Number(Object.keys(CHAINS));
  const [desiredChainId, setDesiredChainId] = useState<number>(isNetwork ? 1 : -1);

  const switchChain = useCallback(
    (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);
      // if we're already connected to the desired chain, return
      if (desiredChainId === chainId) {
        setError(undefined);
        return;
      }

      // if they want to connect to the default chain and we're already connected, return
      if (desiredChainId === -1 && chainId !== undefined) {
        setError(undefined);
        return;
      }

      if (connector instanceof WalletConnect || connector instanceof Network) {
        connector
          .activate(desiredChainId === -1 ? undefined : desiredChainId)
          .then(() => setError(undefined))
          .catch(setError);
      } else {
        connector
          .activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
          .then(() => setError(undefined))
          .catch(setError);
      }
    },
    [connector, chainId, setError]
  );

  const handleConnect = () => {
    connector instanceof GnosisSafe
      ? void connector
          .activate()
          .then(() => setError(undefined))
          .catch(setError)
      : connector instanceof WalletConnect || connector instanceof Network
      ? connector
          .activate(desiredChainId === -1 ? undefined : desiredChainId)
          .then(() => setError(undefined))
          .catch(setError)
      : connector
          .activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
          .then(() => setError(undefined))
          .catch(setError);
  };

  useEffect(() => {
    if (isActive) if (chainId !== currentChainId) switchChain(currentChainId);
  }, [isActive, chainId, currentChainId]);

  return {
    handleConnect,
  };
}

export default useWallet;
