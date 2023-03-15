import { tokenRequestReturnErr, tokenRequest } from './baseAPI';
import { TimeOrder } from '../hooks/types';
import { ChainNameState } from '../hooks/types';
import { AxiosMethod, addBindUserNewAddressAttr, ImportNFTAttr } from './types';

export const getUserInfo = async () => {
  return tokenRequestReturnErr(AxiosMethod.get, `/user`);
};

export const getUserBoundAddress = async () => {
  return tokenRequestReturnErr(AxiosMethod.get, `/user/address`);
};

export const getUserJoinedEvents = async (timeOrder?: TimeOrder.ASC | TimeOrder.DESC) => {
  return tokenRequestReturnErr(AxiosMethod.get, `/check?timeOrder=${timeOrder}`);
};

export const getUserCreateEvents = async () => {
  return tokenRequest(AxiosMethod.get, `/event`);
};

export const getSpecificEventNFTsByUserWallet = async (eventId: string, offset: number, limit: number) => {
  return tokenRequestReturnErr(AxiosMethod.get, `/user/NFTs/${eventId}?offset=${offset || ''}&limit=${limit || ''}`);
};

export const getUserEventNFTsAmount = async (eventId: string) => {
  return tokenRequestReturnErr(AxiosMethod.get, `/user/NFTs/amount/${eventId}`);
};

export const getUserChainNFTs = async (chain: ChainNameState['chain']): Promise<any> => {
  return tokenRequestReturnErr(AxiosMethod.get, `/user/NFTs/all/${chain}`);
};

export const addBindUserNewAddress = async (data: addBindUserNewAddressAttr) => {
  return tokenRequestReturnErr(AxiosMethod.post, `/user/address`, data);
};

export const addUserNewNFT = async (data: ImportNFTAttr) => {
  return tokenRequestReturnErr(AxiosMethod.post, `/user/NFTs`, data);
};

export const deleteUserBoundAddress = async (address: string) => {
  return tokenRequestReturnErr(AxiosMethod.delete, `/user/address`, { address });
};

export const removeUserEvent = async (eventId: string) => {
  return tokenRequestReturnErr(AxiosMethod.delete, `/event/${eventId}`);
};

export const updateUserName = async (displayName: string) => {
  return tokenRequestReturnErr(AxiosMethod.put, `/user/name`, { displayName });
};

export const updateUserAvatarURL = async (photoURL: string) => {
  return tokenRequestReturnErr(AxiosMethod.put, `/user/photo`, { photoURL });
};
