import { useEffect, useState } from 'react';
import { hooks, metaMask } from '../connectors/metaMask';
import { MetaMaskButton } from '../connectorButtons/MetaMaskButton';
import useAlertBox from '../../../hooks/useAlertBox';

const { useChainId, useIsActivating, useIsActive } = hooks;

export default function MetaMaskCard() {
  const chainId = useChainId();
  const isActivating = useIsActivating();
  const isActive = useIsActive();

  const [error, setError] = useState<any>(undefined);
  const { handleShowAlertBox } = useAlertBox();

  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask');
    });
  }, []);

  useEffect(() => {
    if (error) {
      if (error.code === 4001) handleShowAlertBox('Please connect wallet.', 'error');
    }
  }, [error]);

  return (
    <MetaMaskButton
      connector={metaMask}
      chainId={chainId}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
    />
  );
}
