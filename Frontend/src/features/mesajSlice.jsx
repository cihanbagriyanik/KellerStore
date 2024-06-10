import { createSlice } from "@reduxjs/toolkit";

const mesajSlice = createSlice({
  name: "mesaj",

  initialState: {
    loading: false,
    error: false,
    message: [],
   
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    mesajSuccess: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
    },


  },
});

export const {
  fetchStart,
  mesajSuccess,

} = mesajSlice.actions;
export default mesajSlice.reducer;