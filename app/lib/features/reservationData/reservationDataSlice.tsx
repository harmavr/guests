import { createSlice } from "@reduxjs/toolkit";
import { ReservationData } from "../../types";

const initialState: ReservationData = {
  data: [{
    propertyName: "Villa Aroma",
    id: 1,
    tripDetails: { arrivalDate: "10/9/2024", departureDate: "17/9/2024" },


    detailedUser: [{ firstName: "Charis", lastName: "Mavr" }],
    numOfKids: 1,
    numOfAdults: 2,
    total_amount: 1000,
    status: "Confirmed",
    city: "Rethymno",

    totalAmount: 0
  },
  {
    propertyName: "Euphoria",
    id: 2,
    tripDetails:
      { arrivalDate: "11/10/2024", departureDate: "15/10/2024" },

    nights: 2,
    detailedUser: [{ firstName: "Giannis", lastName: "Zoub" }],
    numOfKids: 3,
    numOfAdults: 2,
    total_amount: 1500,
    status: "Pre Check-in",
    city: "Chania",
  },],
};


const reservationDataSlice = createSlice({
  name: "reservationData",
  initialState,
  reducers: {
    saveReservationData(state, action) {
      const { resData, status } = action.payload;
      console.log(resData);

      state.data.push({ ...resData, status: status });

      console.log(state.data);

    },
    changeStatus(state, action) {

      const { index } = action.payload
      console.log(index);
      state.data[index].status = 'Confirmed'
    }
  },
});

export const reservationDataActions = reservationDataSlice.actions;
export default reservationDataSlice.reducer;
