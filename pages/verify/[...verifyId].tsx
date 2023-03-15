import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useWeb3React } from '@web3-react/core';
import { Dialog, DialogContent } from '@mui/material';
import { selectUserInfo } from '../../src/redux/reducers/userReducer';
import { handleCheckIsLogin } from '../../src/redux/reducers/userReducer';
import useVerifyQrCode from '../../src/hooks/useVerifyQrCode';
import useGetEvents from '../../src/hooks/useGetEvents';
import useUser from '../../src/hooks/useUser';
import SignTab from '../../src/components/tabs/SignTab';
import VerifyWalletContainer from '../../src/components/wallet/verifyWallet/VerifyWalletContainer';
import SelectTokenBox from '../../src/components/token/SelectTokenBox';
import BaseLayout from '../../src/components/layout/BaseLayout';
import SuccessTokenBox from '../../src/components/token/SuccessTokenBox';
import Meta from '../../src/components/layout/Meta';
import UserMainBox from '../../src/components/wallet/verifyWallet/UserMainBox';
import { getParameterByName } from '../../src/utils/queryString';

const dialogStyle = {
  background: 'center / cover no-repeat url(/image/qrcode-bgcolor.png)',
  '& .MuiBackdrop-root': { backgroundColor: 'transparent' },
  '& .MuiPaper-root': {
    maxWidth: 800,
    m: { xs: 2, md: 4 },
    borderRadius: '15px',
    width: { xs: 'calc(100% - 32px)', md: 'calc(100% - 64px)' },
  },
};

const VerifyPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const { t } = useTranslation();
  const { connector, account } = useWeb3React();

  const verifyQrCode = useVerifyQrCode();
  const { joinEventSuccessData } = verifyQrCode;
  const { userBoundAddress, handleGetUserBoundAddress } = useUser();
  const { eventInfo, handleGetOneEventInfo } = useGetEvents();

  useEffect(() => {
    const eventId = getParameterByName('eventId');
    if (eventId) handleGetOneEventInfo(eventId);
  }, []);

  useEffect(() => {
    if (!userInfo) dispatch(handleCheckIsLogin(router));
  }, [userInfo]);

  const renderUserInfoBox = () => {
    if (userBoundAddress) {
      return <SelectTokenBox t={t} verifyQrCode={verifyQrCode} userBoundAddress={userBoundAddress} />;
    }
    return <VerifyWalletContainer t={t} userBoundAddress={userBoundAddress} connector={connector} account={account} />;
  };

  return (
    <BaseLayout t={t}>
      <Meta title={eventInfo?.eventName || ''} />
      <Dialog fullWidth={!!joinEventSuccessData} open={true} sx={dialogStyle}>
        <DialogContent sx={{ minWidth: { xs: '90%', md: 700 }, p: 0 }}>
          {joinEventSuccessData && joinEventSuccessData !== null ? (
            <SuccessTokenBox t={t} joinEventSuccessData={joinEventSuccessData} />
          ) : (
            <UserMainBox handleGetUserBoundAddress={handleGetUserBoundAddress}>
              {userInfo ? renderUserInfoBox() : <SignTab t={t} />}
            </UserMainBox>
          )}
        </DialogContent>
      </Dialog>
    </BaseLayout>
  );
};

export default VerifyPage;
