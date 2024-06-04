import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",

  initialState: {
    loading: false,
    error: false,
    category: [],
    subcategory: [],
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
} = categorySlice.actions;
export default categorySlice.reducer;
