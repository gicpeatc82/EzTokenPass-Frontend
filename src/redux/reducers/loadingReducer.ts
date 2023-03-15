import { createSlice } from '@reduxjs/toolkit';

export const loadingReducer = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingReducer.actions;
export const selectLoading = (state: { loading: { isLoading: boolean } }) => state.loading.isLoading;
export default loadingReducer.reducer;
