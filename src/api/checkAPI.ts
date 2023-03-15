import { tokenRequestReturnErr } from './baseAPI';
import { AxiosMethod } from './types';

export const checkBoundAddress = async (eventId: string, data: { address: string; tokenId: string; hash: string }) => {
  return await tokenRequestReturnErr(AxiosMethod.post, `/check/bound/${eventId}`, data);
};
