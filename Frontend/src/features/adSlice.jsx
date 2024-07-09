import { createSlice } from "@reduxjs/toolkit";

const adSlice = createSlice({
  name: "ad",

  initialState: {
    loading: false,
    error: false,
    ad: [],
    message: [],
    categories: [],
    neuesAd: [],
    belibtAd: [],
    mostAd: [],
    homecateories: [],
    singleAd: [],
    siderSearch:[],
    searchNav: "",
    updateAd:[],
    updateAdres:[]
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
    neuSucces: (state, { payload }) => {
      state.loading = false;
      state.neuesAd = payload;
    },
    belibtSucces: (state, { payload }) => {
      state.loading = false;
      state.belibtAd = payload;
    },
    mostSucces: (state, { payload }) => {
      state.loading = false;
      state.mostAd = payload;
    },
    messageSuccess: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
    },
    singleSucces: (state, { payload }) => {
      state.loading = false;
      state.singleAd = payload;
    },
    categoriesSuccess: (state, { payload }) => {
      state.loading = false;
      state.categories = payload;
    },
    homecateoriesSucces: (state, { payload }) => {
      state.loading = false;
      state.homecateories = payload;
      //console.log(state.homecateories,"homecarories conrol SLICE")
    },
    searchSuccesnav: (state, { payload }) => {
      state.loading = false;
      state.searchNav = payload;
      // console.log(state.searchNav,"SLICE NAVBAR SEARCH")
    },
    siderSearch: (state, { payload }) => {
      state.loading = false;
      state.siderSearch = payload;
      // console.log(state.searchNav,"SLICE NAVBAR SEARCH")
    },
    updateSuccess:(state,{payload})=>{
      console.log(payload,"slicedeki dikkat")
      state.loading = false;
      state.updateAd = payload.data;
      state.updateAdres = payload.adress

    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  adSuccess,
  messageSuccess,
  fetchFail,
  neuSucces,
  belibtSucces,
  mostSucces,
  homecateoriesSucces,
  singleSucces,
  searchSuccesnav,
  siderSearch,
  updateSuccess
} = adSlice.actions;
export default adSlice.reducer;
