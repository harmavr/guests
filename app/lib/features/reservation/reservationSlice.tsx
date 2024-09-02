// slices/reservationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reservation, userData } from "../../types";

const initialState: Reservation = {
  items: [],
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    saveReservation(state, action: PayloadAction<{ formData: userData }>) {
      const { formData } = action.payload;
      // console.log(formData);

      state.items.push(formData);
    },

    changeTravellerData(
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        index: number;
      }>
    ) {
      const { firstName, lastName, index } = action.payload;

      // Safeguard to check if the index exists
      if (state.items[0] && state.items[0].detailedUser[index]) {
        // Update the specific traveller's data immutably
        state.items[0].detailedUser[index] = {
          ...state.items[0].detailedUser[index],
          firstName,
          lastName,
        };
      }
    },
  },
});

export const reservationActions = reservationSlice.actions;
export default reservationSlice.reducer;
