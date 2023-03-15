import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useUser from '../../../hooks/useUser';
import { AddressType, WalletType } from '../../../api/types';
import MyMemberTitle from '../MyMemberTitle';
import AddWalletListButton from './AddWalletListButton';
import WalletList from './WalletList';
import WalletListIcon from './WalletListIcon';

function MyWalletList() {
  const { t } = useTranslation();
  const { userBoundAddress, handleGetUserBoundAddress, handleDeleteUserBoundAddress } = useUser();

  useEffect(() => {
    handleGetUserBoundAddress();
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      <MyMemberTitle title={t('my wallet list')} />
      <Box sx={{ bgcolor: '#fff', borderRadius: '5px' }}>
        {userBoundAddress &&
          userBoundAddress.map((data: { address: string; addressType: string; walletType: string }) => (
            <WalletList
              key={data.address}
              icon={WalletListIcon(data.addressType as AddressType, data.walletType as WalletType)}
              text={t(`my ${data.walletType} wallet`)}
              address={data.address}
              handleDelete={() => handleDeleteUserBoundAddress(data.address)}
            />
          ))}

        <AddWalletListButton userBoundAddress={userBoundAddress} />
      </Box>
    </Box>
  );
}

export default MyWalletList;
