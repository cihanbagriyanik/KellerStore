import { createSlice } from "@reduxjs/toolkit";

const adSlice = createSlice({
  name: "ad",

  initialState: {
    loading: false,
    error: false,
    ad: [],
    message: [],
    categories: [],
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    adSuccess: (state, { payload }) => {
      state.loading = false;
      state.ad = payload;
    },
    messageSuccess: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
    },
    categoriesSuccess: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, adSuccess, messageSuccess, fetchFail } =
  adSlice.actions;
export default adSlice.reducer;
