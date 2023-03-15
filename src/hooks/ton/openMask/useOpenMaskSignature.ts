import { AddressType, TonWallet, WalletType } from '../../../api/types';
import { SignatureWalletMessage } from '../../../data/signatureWalletData';
import { UseOpenMaskSignatureState } from '../types';
import useSignature from '../../useSignature';

function useOpenMaskSignature(): UseOpenMaskSignatureState {
  const { bindUserNewAddress } = useSignature();
  const getOpenMaskSignature = async () => {
    if (typeof window.ton !== 'undefined') {
      const provider = window.ton;

      try {
        const accounts = await provider.send('ton_requestAccounts');
        const account = accounts[0];

        const signature = await provider.send('ton_personalSign', {
          data: SignatureWalletMessage,
        }); // String payload data in utf8 format

        return { account, signature };
      } catch (e) {
        console.error(e);
        return false;
      }
    } else {
      console.error('OpenMask is not installed!');
      return false;
    }
  };

  const handleBindOpenMaskAddress: UseOpenMaskSignatureState['handleBindOpenMaskAddress'] = async () => {
    const res = await getOpenMaskSignature();
    if (res) {
      const data = {
        signature: res.signature,
        message: SignatureWalletMessage,
        address: res.account,
        walletType: WalletType.Web,
        addressType: AddressType.ton,
        signMethod: TonWallet.OpenMask,
      };
      bindUserNewAddress(data);
    }
  };
  return {
    handleBindOpenMaskAddress,
  };
}

export default useOpenMaskSignature;
