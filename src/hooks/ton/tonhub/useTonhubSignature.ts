import { RemoteConnectPersistance } from 'react-ton-x';
import { TonhubConnector, TonhubSignRequest, TonhubSignResponse } from 'ton-x';
import { SignatureWalletMessage } from '../../../data/signatureWalletData';
import { AddressType, TonWallet, WalletType } from '../../../api/types';
import { UseTonhubSignatureState } from '../types';
import useSignature from '../../useSignature';
import useAlertBox from '../../useAlertBox';

function useTonhubSignature(): UseTonhubSignatureState {
  const { bindUserNewAddress } = useSignature();
  const { handleShowAlertBox } = useAlertBox();

  const getTonhubSignature = async (connectionState: RemoteConnectPersistance, connector: TonhubConnector) => {
    if (connectionState.type === 'online') {
      const request: TonhubSignRequest = {
        seed: connectionState.seed, // Session Seed
        appPublicKey: connectionState.walletConfig.appPublicKey, // Wallet's app public key
        timeout: 5 * 60 * 1000, // 5 min timeout
        text: SignatureWalletMessage, // Text to sign, presented to the user.
        // payload: payload, // Optional serialized to base64 string payload cell
      };
      const response: TonhubSignResponse = await connector.requestSign(request);
      if (response.type === 'rejected') {
        // Handle rejection
        handleShowAlertBox('rejected', 'error');
      } else if (response.type === 'expired') {
        // Handle expiration
        handleShowAlertBox('expired', 'error');
      } else if (response.type === 'invalid_session') {
        // Handle expired or invalid session
        handleShowAlertBox('invalid_session', 'error');
      } else if (response.type === 'success') {
        // Handle successful transaction
        const signature = response.signature;
        const walletConfig = connectionState.walletConfig.walletConfig;
        return { signature, walletConfig };

        // You can check signature on the backend with TonhubConnector.verifySignatureResponse
        // let correctSignature = TonhubConnector.verifySignatureResponse({ signature: signature, config: walletConfig });
      } else {
        throw new Error('Impossible');
      }
    }
  };

  const handleBindTonhub: UseTonhubSignatureState['handleBindTonhub'] = async (connectionState, connector) => {
    const res = await getTonhubSignature(connectionState, connector);
    if (res) {
      const data = {
        signature: res.signature,
        message: SignatureWalletMessage,
        address: connectionState.walletConfig.address,
        walletType: WalletType.Web,
        addressType: AddressType.ton,
        signMethod: TonWallet.TonHub,
        walletInfo: res.walletConfig,
      };
      bindUserNewAddress(data);
    }
  };
  return {
    handleBindTonhub,
  };
}

export default useTonhubSignature;
