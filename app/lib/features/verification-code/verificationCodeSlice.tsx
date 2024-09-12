import { createSlice } from "@reduxjs/toolkit";

const verificationSlice = createSlice({
  name: "verification",
  initialState: {
    keyAccess: Math.floor(Math.random() * 999999),
    access: false,
  },
  reducers: {
    checkValidity(state, action) {
      const { key } = action.payload;
      if (key === state.keyAccess) {
        state.access = true;
      } else {
        state.access = false;
      }
    },
  },
});

export const verificationActions = verificationSlice.actions;
export default verificationSlice.reducer;
