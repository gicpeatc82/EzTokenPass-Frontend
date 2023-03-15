import MetaMaskCard from '../../connect/connectorCards/MetaMaskCard';
import OpenMaskCard from '../../connect/connectorCards/OpenMaskCard';
import WalletConnectCard from '../../connect/connectorCards/WalletConnectCard';
import TonhubCard from '../../connect/connectorCards/TonhubCard';
import TonKeeperCard from '../../connect/connectorCards/TonKeeperCard';
import { UseUserState } from '../../../hooks/types';
import { UseEvmSignatureState } from '../../../hooks/evm/types';

interface WalletBoxProps {
  userBoundAddress: UseUserState['userBoundAddress'];
  isMobile: boolean;
  handleBindEvmAddress: UseEvmSignatureState['handleBindEvmAddress'];
}

export default function WalletBox({ userBoundAddress, handleBindEvmAddress, isMobile }: WalletBoxProps): JSX.Element {
  return (
    <>
      {!isMobile && (
        <>
          <MetaMaskCard />
          <OpenMaskCard />
        </>
      )}
      <TonhubCard />
      <TonKeeperCard />
      <WalletConnectCard userBoundAddress={userBoundAddress} handleBindEvmAddress={handleBindEvmAddress} />
    </>
  );
}
