import useOpenMaskSignature from '../../../hooks/ton/openMask/useOpenMaskSignature';
import WalletButton from '../connectorButtons/WalletButton';

export default function OpenMaskCard() {
  const { handleBindOpenMaskAddress } = useOpenMaskSignature();

  return (
    <WalletButton
      handleConnect={handleBindOpenMaskAddress}
      disabled={false}
      icon={'/image/account/openMask.svg'}
      walletName={'OpenMask'}
    />
  );
}
