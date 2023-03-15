import axios, { AxiosError } from 'axios';
import { getMyAuthToken } from '../utils/localStorage';
import { AxiosInstance } from 'axios';

const apiURL = process.env.NEXT_PUBLIC_SERVER_URL;
const request = axios.create({
  baseURL: apiURL,
});

export const getRequest = async (url: string) => {
  try {
    return await request.get(url);
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
    return false;
  }
};

export const authTokenRequest = (): AxiosInstance => {
  const token = getMyAuthToken();
  return axios.create({
    baseURL: apiURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const tokenRequest = async (method: string, url: string, data?: any): Promise<any> => {
  try {
    const axiosRequest = authTokenRequest();
    return await axiosRequest({
      method,
      url,
      data,
    });
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
    return false;
  }
};

export const tokenRequestReturnErr = async (method: string, url: string, data?: any): Promise<any> => {
  try {
    const axiosRequest = authTokenRequest();
    return await axiosRequest({
      method,
      url,
      data,
    });
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
    return err;
  }
};
