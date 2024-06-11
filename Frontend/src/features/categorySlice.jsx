import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",

  initialState: {
    loading: false,
    error: false,
    category: [],
    subcategory: [],
    favoriAd:[],
    favorUser:[]
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
    singleUser:(state,{payload})=>{
      state.loading = false;
      state.favorUser=payload;
      //console.log(state.favorUser,"SINGLEUSER SLICE")
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
  singleUser,
} = categorySlice.actions;
export default categorySlice.reducer;
