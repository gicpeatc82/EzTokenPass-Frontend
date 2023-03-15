const authToken = '_token';

export const setMyAuthToken = (token: string): void => {
  localStorage.setItem(authToken, token);
};

export const getMyAuthToken = (): string => {
  return localStorage.getItem(authToken) || '';
};

export const setMyAuthTokenClear = () => {
  return localStorage.removeItem(authToken);
};
