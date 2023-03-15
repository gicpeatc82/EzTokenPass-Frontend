import { createSlice } from '@reduxjs/toolkit';
import googleAuth from '../../firebase/auth/googleAuth';
import facebookAuth from '../../firebase/auth/facebookAuth';
import appleAuth from '../../firebase/auth/appleAuth';
import firebaseSignOut from '../../firebase/auth/firebaseSignOut';
import { setMyAuthToken, getMyAuthToken, setMyAuthTokenClear } from '../../utils/localStorage';
import { getUserInfo } from '../../api/userAPI';
import { NextRouter } from 'next/router';
import { User } from 'firebase/auth';
import storage from '../../utils/storage';
import Cookies from 'js-cookie';
import { LocaleState } from '../../api/types';
import { Dispatch } from 'react';

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    userInfo: '',
    locale: 'en',
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
  },
});

export const { setUserInfo, setLocale } = userReducer.actions;
export const selectUserInfo = (state: { user: { userInfo: any } }) => state.user.userInfo;
export const selectLocale = (state: { user: LocaleState }) => state.user.locale;
export default userReducer.reducer;

const handleSetTimeout = () => {
  storage.setItem('lastTime', new Date().getTime());
};

const handleCheckTimeout = (router: NextRouter) => {
  let lastTime = new Date().getTime();
  let currentTime = new Date().getTime();
  const timeOut = 60 * 50 * 1000; // 設定超時時間 : 約1小時

  currentTime = new Date().getTime(); // 更新當前時間
  lastTime = storage.getItem('lastTime');

  if (currentTime - lastTime > timeOut) {
    storage.clear();
    handleLogOut();

    if (router.pathname === 'signin') return;
    router.push('/signin');
    window.location.reload();
  }
};

export const handleLogin = (router: NextRouter, text: string) => async (dispatch: Dispatch<any | LocaleState>) => {
  let user: User | undefined = undefined;
  switch (text) {
    case 'google': {
      user = await googleAuth();
      break;
    }
    case 'apple': {
      user = await appleAuth();
      break;
    }
    case 'facebook': {
      user = await facebookAuth();
      break;
    }
  }
  if (user) {
    handleSetTimeout();
    window.setInterval(() => handleCheckTimeout(router), 30000);
    dispatch(setUserInfo(user.providerData[0]));
    const userToken = await user.getIdToken();
    setMyAuthToken(userToken);
    if (router.pathname.indexOf('/verify') !== 0) router.back();
  }
};

export const handleCheckIsLogin = (router: NextRouter) => async (dispatch: Dispatch<any>) => {
  if (window && window.localStorage) {
    const token = getMyAuthToken();
    if (token) {
      const userInfo: any = await getUserInfo();
      if ((userInfo && userInfo.request?.status === 401) || (token && !userInfo)) {
        storage.clear();
        dispatch(setUserInfo(''));
        if (router.pathname.includes('/member')) router.push('/');
      } else if (userInfo && userInfo?.status === 200) {
        dispatch(setUserInfo(userInfo.data.data));
      }
    }
  }
};

export const handleLogOut = () => async (dispatch: Dispatch<any>) => {
  firebaseSignOut();
  setMyAuthTokenClear();
  storage.removeItem('lastTime');
  dispatch(setUserInfo(''));
};

export const handleChangeLang = (locale: string) => (dispatch: Dispatch<any>) => {
  dispatch(setLocale(locale));
  Cookies.set('locale', locale);
};
