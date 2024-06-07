import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    loading: false,
    error: false,
    isAdmin: false,
    token: null,
    user: null,
    currentUser: null,
    access:null,
    address:[],
    followAll:[],
    followSingle:[]
  },

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload.data.email;
      state.token = payload.token;
    },

    loginSuccess: (state, { payload }) => {
      //console.log(payload,"LOGIN PAYLOAD")
      state.loading = false;
      state.token = payload?.token;
      state.user = payload?.user;
      state.access=payload?.bearer?.access
      state.currentUser = payload?.user?.email;
    },
    addressSucces:(state,{payload})=>{
        state.address = payload

    },
    updateUser :(state,{payload})=>{
     // console.log(payload,"UPDATE ,,,,,,,,,pazload")
      state.user = payload
    },
    followAllSucces:(state,{payload})=>{
      state.loading = false;
      state.followAll = payload;
    },
    followSingleSucces:(state,{payload})=>{
      state.loading = false;
      state.followSingle = payload;
    },
    refresh: (state, { payload }) => {
      state.loading = false;
      state.token = payload?.bearer?.refresh;
    },

    logoutSuccess: (state) => {
      state.loading = false;
      state.token = null;
      state.user = null;
      state.currentUser = null;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  registerSuccess,
  logoutSuccess,
  loginSuccess,
  fetchFail,
  addressSucces,
  updateUser,
  followAllSucces,
  followSingleSucces
} = authSlice.actions;
export default authSlice.reducer;
