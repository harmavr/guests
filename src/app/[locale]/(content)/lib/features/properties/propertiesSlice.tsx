import { createSlice } from "@reduxjs/toolkit";
import { Properties, userData } from "../../types";

const initialState: userData[] = [
  {
    propertyName: "Villa Aroma",
    id: 1,
    tripDetails: [
      { FlightArrivalDate: "10/9/2024", FlightDepartureDate: "17/9/2024" },
    ],
    nights: 7,
    detailedUser: [{ firstName: "Charis", lastName: "Mavr" }],
    numOfKids: 1,
    numOfAdults: 2,
    total_amount: 1000,
    status: "Confirmed",
    city: "Rethymno",
  },
  {
    propertyName: "Euphoria",
    id: 2,
    tripDetails: [
      { FlightArrivalDate: "11/10/2024", FlightDepartureDate: "15/10/2024" },
    ],
    nights: 2,
    detailedUser: [{ firstName: "Giannis", lastName: "Zoub" }],
    numOfKids: 3,
    numOfAdults: 2,
    total_amount: 1500,
    status: "Pre Check-in",
    city: "Chania",
  },

];

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
});

export const propertiesActions = propertiesSlice.actions;
export default propertiesSlice.reducer;
