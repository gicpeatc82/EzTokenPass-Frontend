import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './reducers/loadingReducer';
import alertBoxReducer from './reducers/alertBoxReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    alertBox: alertBoxReducer,
    user: userReducer,
  },
});

export default store;
