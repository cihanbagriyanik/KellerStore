import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null,
    loading: false,
    error: false,
    isAdmin: false,
    token: null,
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
      state.loading = false;
      state.currentUser = payload?.user?.email;
      state.isAdmin = payload?.user?.isAdmin;
      state.token = payload?.token;
    },

    refresh: (state, { payload }) => {
      state.loading = false;
      state.token = payload?.bearer?.refresh;
    },

    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.isAdmin = false;
      state.token = null;
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
} = authSlice.actions;
export default authSlice.reducer;
