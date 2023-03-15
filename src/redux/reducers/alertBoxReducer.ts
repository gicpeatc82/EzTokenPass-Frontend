import { createSlice } from '@reduxjs/toolkit';

export interface AlertBox {
  open: boolean;
  alertText: string;
  alertBGColor?: 'success' | 'error' | 'warning' | undefined;
}

export const alertBoxReducer = createSlice({
  name: 'alertBox',
  initialState: {
    isAlertBox: '',
  },
  reducers: {
    setAlertBox: (state, action) => {
      state.isAlertBox = action.payload;
    },
  },
});

export const { setAlertBox } = alertBoxReducer.actions;
export const selectAlertBox = (state: { alertBox: { isAlertBox: AlertBox } }) => state.alertBox.isAlertBox;
export default alertBoxReducer.reducer;
