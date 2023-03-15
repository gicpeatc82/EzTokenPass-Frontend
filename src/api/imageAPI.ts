import { AxiosError } from 'axios';
import { authTokenRequest } from './baseAPI';

const updateImageRequest = async (url: string, data: { image: File }) => {
  try {
    if (data) {
      const tokenRequest = authTokenRequest();
      const formData = new FormData();

      tokenRequest.defaults.headers.common['Content-Type'] = 'multipart/form-data';
      formData.append('image', data.image);

      return await tokenRequest.post(url, formData);
    }
  } catch (error: any) {
    const err = error as AxiosError;
    console.log(err.response?.data);
    return err;
  }
};

export const updateUserBannerImage = async (data: { image: File }) => {
  return updateImageRequest(`/images/banner`, data);
};

export const updateUserAvatarImage = async (data: { image: File }) => {
  return updateImageRequest(`/images/avatar`, data);
};
