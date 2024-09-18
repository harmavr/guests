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
      console.log(formData);

      state.items.push(...state.items, formData);
    },

    saveReservationFromCSV: (state, action) => {
      const { formData } = action.payload;
      console.log(formData);

      formData.forEach((reservation) => {
        state.items.push({
          propertyName: reservation.propertyName,
          city: reservation.city,
          numOfAdults: reservation.numOfAdults,
          numOfKids: reservation.numOfKids,
          kidsAges: reservation.kidsAges,
          detailedUser: reservation.detailedUser,
          tripDetails: reservation.tripDetails,
          page: 0,
          errors: undefined,
          weAreFreeToGo: false,
        });
      });
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
