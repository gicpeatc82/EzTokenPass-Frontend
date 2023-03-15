import { useState } from 'react';
import { checkBoundAddress } from '../api/checkAPI';
import { getSpecificEventNFTsByUserWallet } from '../api/userAPI';
import { UseVerifyQrCodeState } from './types';
import useResponseMessage from './useResponseMessage';
import useAlertBox from './useAlertBox';

function useVerifyQrCode(): UseVerifyQrCodeState {
  const [userSpecificEventTokenList, setUserSpecificEventTokenList] =
    useState<UseVerifyQrCodeState['userSpecificEventTokenList']>(null);
  const [userSpecificEventTokenListTotalPage, setUserSpecificEventTokenListTotalPage] =
    useState<UseVerifyQrCodeState['userSpecificEventTokenListTotalPage']>(0);
  const [joinEventSuccessData, setJoinEventSuccessData] = useState<UseVerifyQrCodeState['joinEventSuccessData']>(null);
  const { handleGetAPIShowError, handleShowInfoMessage } = useResponseMessage();
  const { handleShowLoadingBox } = useAlertBox();

  const handleGetSpecificEventNFTsByUserWallet = (eventId: string, offset: number, limit: number) => {
    setUserSpecificEventTokenList(null);
    getSpecificEventNFTsByUserWallet(eventId, offset, limit).then((res: any) => {
      const successRes = handleGetAPIShowError(res);
      if (successRes) {
        setUserSpecificEventTokenList(res.data.data.nftIds);
        setUserSpecificEventTokenListTotalPage(Math.ceil(res.data.data.total / limit));
      }
    });
  };

  const handleCheckBoundAddress = (eventId: string, data: { address: string; tokenId: string; hash: string }) => {
    handleShowLoadingBox(true);
    checkBoundAddress(eventId, data).then((res: any) => {
      handleShowLoadingBox(false);
      const successRes = handleShowInfoMessage(res);
      if (successRes) setJoinEventSuccessData(res.data.data);
    });
  };

  return {
    userSpecificEventTokenList,
    userSpecificEventTokenListTotalPage,
    handleGetSpecificEventNFTsByUserWallet,

    joinEventSuccessData,
    handleCheckBoundAddress,
  };
}

export default useVerifyQrCode;
