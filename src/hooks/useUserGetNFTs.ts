import { useState } from 'react';
import { getUserChainNFTs } from '../api/userAPI';
import { UseUserGetNFTsState } from './types';
import useResponseMessage from './useResponseMessage';

function useUserGetNFTs(): UseUserGetNFTsState {
  const { handleGetAPISuccess, handleGetAPIShowError, handleShowInfoMessage } = useResponseMessage();
  const [userNFTsList, setUserNFTsList] = useState(null);

  // 待完成
  const handleGetUserChainNFTs: UseUserGetNFTsState['handleGetUserChainNFTs'] = async (chain) => {
    const res = await getUserChainNFTs(chain);
    const successRes = handleGetAPISuccess(res);
    if (successRes) setUserNFTsList(res.data.data.nfts);
  };
  return {
    userNFTsList,
    handleGetUserChainNFTs,
  };
}

export default useUserGetNFTs;
