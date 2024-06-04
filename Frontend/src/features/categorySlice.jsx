import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",

  initialState: {
    loading: false,
    error: false,
    category: [],
    subcategory: [],
    favoriAd:null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    adCategory: (state, { payload }) => {
      state.loading = false;
      state.category = payload;
    },
    favoriSucces: (state, { payload }) => {
      state.loading = false;
      state.favoriAd = payload;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  adCategory,
  fetchFail,
  favoriSucces,
} = categorySlice.actions;
export default categorySlice.reducer;
