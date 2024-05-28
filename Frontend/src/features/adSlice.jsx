import { createSlice } from "@reduxjs/toolkit";

const adSlice = createSlice({
  name: "ad",

  initialState: {
    loading: false,
    error: false,
    ad: [],
    message: [],
    categories: [],
    neuesAd:[],
    belibtAd:[],
    mostAd:[]
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    adSuccess: (state, { payload }) => {
      console.log(payload,"genel ad")
      state.loading = false;
      state.ad = payload;
      console.log(state.ad,"genel ad")
    },
    neuSucces:(state,{payload})=>{
      state.loading = false;
      state.neuesAd = payload;
    },
    belibtSucces:(state,{payload})=>{
      state.loading = false;
      state.belibtAd = payload;
    },
    mostSucces:(state,{payload})=>{
      state.loading = false;
      state.mostAd = payload;
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

export const { fetchStart, adSuccess, messageSuccess, fetchFail,neuSucces,belibtSucces,mostSucces } =
  adSlice.actions;
export default adSlice.reducer;
