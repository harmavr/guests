// slices/userDataSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TripDetail, userData } from "../../types";

const initialState: userData = {
  propertyName: "",
  city: "",
  numOfAdults: 0,
  numOfKids: 0,
  kidsAges: [{ value: 0, help: false }],
  page: 1,
  detailedUser: [{ firstName: "", lastName: "" }],
  errors: {
    propertyNameError: false,
    cityError: false,
    numOfAdultsError: false,
  },
  // errors2: {
  //   firstName: false,
  //   lastName: false,
  // },
  weAreFreeToGo: false,
  tripDetails: [
    {
      checkboxArrival: false,
      FlightArrivalDate: "",
      FlightArrivalTime: "",
      LocationArrival: "",
      FlightArrivalNumber: "",
      NotesArrival: "",
      checkboxDeparture: false,
      FlightDepartureDate: "",
      FlightDepartureTime: "",
      LocationDeparture: "",
      FlightDepartureNumber: "",
      NotesDeparture: "",
    },
  ],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    submit(state, action: PayloadAction<Partial<userData>>) {
      const { propertyName, city, numOfAdults, numOfKids, kidsAges } =
        action.payload;

      console.log(action.payload);

      if (propertyName !== undefined) state.propertyName = propertyName;
      if (city !== undefined) state.city = city;
      if (numOfAdults !== undefined) state.numOfAdults = numOfAdults;
      if (numOfKids !== undefined) state.numOfKids = numOfKids;
      if (kidsAges !== undefined) state.kidsAges = kidsAges;
    },
    next(state, action) {
      if (action.payload === 1) {
        state.page = 2;
      }
      if (action.payload === 2) {
        state.page = 3;
      }
      if (action.payload === 3) {
        state.page = 4;
      }
      if (action.payload === 4) {
        state.page = 5;
      }
    },
    init(state) {
      state.page = 1;
    },
    back(state) {
      state.page = Math.max(state.page - 1, 1);
    },
    saveData(
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        index: number;
      }>
    ) {
      const { firstName, lastName, index } = action.payload;
      console.log(action.payload);

      if (index >= 0) {
        state.detailedUser[index] = { firstName, lastName };
      } else {
        console.error("Invalid index");
      }

      console.log(state.detailedUser[index]);
    },
    saveKidsAge(
      state,
      action: PayloadAction<{ index: number; age: number; help: boolean }>
    ) {
      const { index, age, help } = action.payload;
      while (state.kidsAges.length <= index) {
        state.kidsAges.push({ value: 0, help: false });
      }
      state.kidsAges[index] = { value: age, help };
    },
    saveTravelDetails(state, action: PayloadAction<TripDetail>) {
      state.tripDetails[0] = { ...state.tripDetails[0], ...action.payload };
    },
    validate(state, action: PayloadAction<Partial<userData>>) {
      const { propertyName, city, numOfAdults, firstName, lastName } =
        action.payload;

      console.log(propertyName, city, numOfAdults, firstName, lastName);

      state.errors = {
        propertyNameError: !propertyName,
        cityError: !city,
        numOfAdultsError: numOfAdults <= 0,
      };
      state.errors2 = {
        firstName: !firstName,
        lastName: !lastName,
      };
    },
    setWeAreFreeToGo(state) {
      state.weAreFreeToGo = true;
    },
  },
});

export const formActions = formSlice.actions;
export default formSlice.reducer;
