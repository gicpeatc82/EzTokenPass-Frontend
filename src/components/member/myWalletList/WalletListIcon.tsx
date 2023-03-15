import { FaWallet } from 'react-icons/fa';
import { GiWallet } from 'react-icons/gi';
import { AddressType, WalletType } from '../../../api/types';

export default function WalletListIcon(addressType: AddressType, walletType: WalletType) {
  if (addressType === AddressType.evm)
    return <img src="/image/wallet/evmWallet.png" width="20px" alt={AddressType.evm} />;
  if (addressType === AddressType.ton)
    return <img src="/image/wallet/tonWallet.png" width="20px" alt={AddressType.ton} />;
  if (walletType === WalletType.Freeport)
    return <img src="/image/wallet/freeportWallet.png" width="20px" alt={AddressType.ton} />;
  if (walletType === WalletType.App) return <FaWallet />;
  if (walletType === WalletType.Web) return <GiWallet />;
  return <GiWallet />;
}
