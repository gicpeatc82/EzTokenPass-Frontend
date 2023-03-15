import { Question1State } from '../hooks/types';
import { tokenRequestReturnErr } from './baseAPI';
import { AxiosMethod } from './types';

export const addUserSurveyResults = async (data: Question1State) => {
  return await tokenRequestReturnErr(AxiosMethod.post, `/question/ques1`, data);
};
