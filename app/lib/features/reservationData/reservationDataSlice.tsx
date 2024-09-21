import { createSlice } from "@reduxjs/toolkit";
import { ReservationData } from "../../types";

const initialState: ReservationData = {
  data: [],
};

const reservationDataSlice = createSlice({
  name: "reservationData",
  initialState,
  reducers: {
    saveReservationData(state, action) {
      const { resData } = action.payload;
      console.log(resData);

      state.data.push(resData);
    },
  },
});

export const reservationDataActions = reservationDataSlice.actions;
export default reservationDataSlice.reducer;
