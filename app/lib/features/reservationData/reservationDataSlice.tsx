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
    kidsAges: [{ value: 2, help: false }],

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
    kidsAges: [{ value: 10, help: true }, { value: 15, help: false }, { value: 2, help: false }],
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
    },

    update(state, action) {
      const { propertyName, city, numOfAdults, numOfKids, kidsAges, index } =
        action.payload;

      console.log(action.payload);

      if (propertyName !== undefined) state.data[index].propertyName = propertyName;
      if (city !== undefined) state.data[index].city = city;
      if (numOfAdults !== undefined) state.data[index].numOfAdults = numOfAdults;
      if (numOfKids !== undefined) state.data[index].numOfKids = numOfKids;
      if (kidsAges !== undefined) state.data[index].kidsAges = kidsAges;
    },
    saveKids(
      state,
      action) {
      const { index, age, help, kidId } = action.payload;
      while (state.data[index].kidsAges.length <= index) {
        state.data[index].kidsAges.push({ value: 0, help: false });
      }
      state.data[index].kidsAges[kidId] = { value: age, help };
    },
  },
});

export const reservationDataActions = reservationDataSlice.actions;
export default reservationDataSlice.reducer;
