import { toUserFriendlyAddress } from '@tonconnect/sdk';
import { AddressType, TonWallet, WalletType } from '../../../api/types';
import { TonKeeperWallet, UseTonKeeperSignatureState } from '../types';
import { SignatureWalletMessage } from '../../../data/signatureWalletData';
import useSignature from '../../useSignature';

export default function useTonKeeperSignature(): UseTonKeeperSignatureState {
  const { bindUserNewAddress } = useSignature();

  const handleBindTonKeeper: UseTonKeeperSignatureState['handleBindTonKeeper'] = async (wallet) => {
    const address = toUserFriendlyAddress(wallet.account.address);
    const signature = (wallet as TonKeeperWallet)?.connectItems?.tonProof?.proof.signature;
    if (!signature) return;
    const data = {
      signature: signature,
      message: SignatureWalletMessage,
      address: address,
      walletType: WalletType.Web,
      addressType: AddressType.ton,
      signMethod: TonWallet.TonKeeper,
      walletInfo: wallet,
    };

    bindUserNewAddress(data);
  };
  return {
    handleBindTonKeeper,
  };
}
