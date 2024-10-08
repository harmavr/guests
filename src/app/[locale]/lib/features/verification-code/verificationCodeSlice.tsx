import { createSlice } from "@reduxjs/toolkit";

const verificationSlice = createSlice({
  name: "verification",
  initialState: {
    keyAccess: Math.floor(Math.random() * (1000000 - 100000) + 100000),
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
    newCode(state) {
      state.keyAccess = Math.floor(Math.random() * (1000000 - 100000) + 100000);
    },
  },
});

export const verificationActions = verificationSlice.actions;
export default verificationSlice.reducer;
