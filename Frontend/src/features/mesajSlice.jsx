import { createSlice } from "@reduxjs/toolkit";

const mesajSlice = createSlice({
  name: "mesaj",

  initialState: {
    loading: false,
    error: false,
    messages: [],
  
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    messageSuccess: (state, { payload }) => {
      state.loading = false;
      state.messages = payload;
      //console.log(state.messages, "MESASLICE");
    },
 
  },
});

export const { fetchStart, messageSuccess } = mesajSlice.actions;
export default mesajSlice.reducer;
