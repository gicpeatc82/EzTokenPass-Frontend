import { URI_AVAILABLE } from '@web3-react/walletconnect';
import { useEffect, useState } from 'react';
import { hooks, walletConnect } from '../connectors/walletConnect';
import { WalletConnectButton } from '../connectorButtons/WalletConnectButton';
import useAlertBox from '../../../hooks/useAlertBox';
import { UseUserState } from '../../../hooks/types';
import { UseEvmSignatureState } from '../../../hooks/evm/types';

const { useAccount, useChainId, useIsActivating, useIsActive } = hooks;

export default function WalletConnectCard({
  userBoundAddress,
  handleBindEvmAddress,
}: {
  userBoundAddress: UseUserState['userBoundAddress'];
  handleBindEvmAddress: UseEvmSignatureState['handleBindEvmAddress'];
}) {
  const chainId = useChainId();
  const account = useAccount();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const [error, setError] = useState<any>(undefined);

  const { handleShowAlertBox } = useAlertBox();

  useEffect(() => {
    if (account && !userBoundAddress) {
      walletConnect
        .activate()
        .then(() => handleBindEvmAddress(account))
        .catch((error) => {
          console.debug(error);
          console.debug('activate fail');
        });
    }
  }, [account, userBoundAddress]);

  // log URI when available
  useEffect(() => {
    walletConnect.events.on(URI_AVAILABLE, (uri: string) => {
      console.log(`uri: ${uri}`);
    });
  }, []);

  // attempt to connect eagerly on mount
  useEffect(() => {
    walletConnect.connectEagerly().catch((error) => {
      console.log(error);
      console.debug('Failed to connect eagerly to walletconnect');
    });
  }, []);

  useEffect(() => {
    if (error) {
      if (error.message === 'User closed modal') handleShowAlertBox('Please connect wallet.', 'error');
    }
  }, [error]);

  return (
    <>
      {error && <></>}
      <WalletConnectButton
        connector={walletConnect}
        chainId={chainId}
        isActivating={isActivating}
        isActive={isActive}
        error={error}
        setError={setError}
      />
    </>
  );
}
