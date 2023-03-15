import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { WalletType } from '../../api/types';
import { SignatureWalletMessage } from '../../data/signatureWalletData';
import useSignature from '../useSignature';
import { UseEvmSignatureState } from './types';

export default function useEvmSignature(): UseEvmSignatureState {
  const { connector } = useWeb3React();
  const { bindUserNewAddress } = useSignature();
  const getEvmSignature = async (account: string): Promise<any> => {
    try {
      const web3 = new Web3(connector.provider as any);
      return await web3.eth.personal.sign(web3.utils.utf8ToHex(SignatureWalletMessage), account, '');
    } catch (e) {
      console.error(e);
    }
  };

  const handleBindEvmAddress: UseEvmSignatureState['handleBindEvmAddress'] = async (account) => {
    const signature = await getEvmSignature(account);
    const data = {
      signature: signature,
      message: SignatureWalletMessage,
      address: account,
      walletType: WalletType.Web,
    };
    if (signature) bindUserNewAddress(data);
  };

  return {
    handleBindEvmAddress,
  };
}
