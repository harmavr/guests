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
    propertyName: "Euphoria Villa",
    id: 2,
    tripDetails: [
      { FlightArrivalDate: "10/9/2023", FlightDepartureDate: "20/9/2023" },
    ],
    nights: 8,
    detailedUser: [{ firstName: "Giannis", lastName: "Zoub" }],
    total_amount: 2000,
    numOfAdults: 1,
    numOfKids: 2,
    status: "Pre Check-in",
    city: "Herakleion",
  },
  {
    propertyName: "Harmony Retreat",
    id: 3,
    tripDetails: [
      { FlightArrivalDate: "11/9/2023", FlightDepartureDate: "18/9/2023" },
    ],
    nights: 7,
    detailedUser: [{ firstName: "Sophia", lastName: "Nikos" }],
    total_amount: 1500,
    status: "Confirmed",
    city: "Chania",
  },
  {
    propertyName: "Tranquil Villa",
    id: 4,
    tripDetails: [
      { FlightArrivalDate: "12/9/2023", FlightDepartureDate: "19/9/2023" },
    ],
    nights: 7,
    detailedUser: [{ firstName: "Alexis", lastName: "Kontos" }],
    total_amount: 1800,
    status: "Pre Check-in",
    city: "Lasithi",
  },
  {
    propertyName: "Serenity Estate",
    id: 5,
    tripDetails: [
      { FlightArrivalDate: "13/9/2023", FlightDepartureDate: "20/9/2023" },
    ],
    nights: 7,
    detailedUser: [{ firstName: "Nikoleta", lastName: "Pavlou" }],
    total_amount: 2200,
    status: "Confirmed",
    city: "Rethymno",
  },
  {
    propertyName: "Ocean Breeze Villa",
    id: 6,
    tripDetails: [
      { FlightArrivalDate: "14/9/2023", FlightDepartureDate: "21/9/2023" },
    ],
    nights: 7,
    detailedUser: [{ firstName: "Dimitrios", lastName: "Kotsis" }],
    total_amount: 1900,
    status: "Pre Check-in",
    city: "Chania",
  },
  {
    propertyName: "Mountain Peak Lodge",
    id: 7,
    tripDetails: [
      { FlightArrivalDate: "15/9/2023", FlightDepartureDate: "22/9/2023" },
    ],
    nights: 7,
    detailedUser: [{ firstName: "Maria", lastName: "Konstantinou" }],
    total_amount: 1700,
    status: "Confirmed",
    city: "Herakleion",
  },
  {
    propertyName: "Sunset Hills Villa",
    id: 8,
    tripDetails: [
      { FlightArrivalDate: "16/9/2023", FlightDepartureDate: "23/9/2023" },
    ],
    nights: 7,
    detailedUser: [{ firstName: "Kostas", lastName: "Zervos" }],
    total_amount: 2100,
    status: "Pre Check-in",
    city: "Athens",
  },
  {
    propertyName: "Emerald Villa",
    id: 9,
    tripDetails: [
      { FlightArrivalDate: "17/9/2023", FlightDepartureDate: "24/9/2023" },
    ],
    nights: 7,
    detailedUser: [{ firstName: "Eleni", lastName: "Petrakis" }],
    total_amount: 2000,
    status: "Confirmed",
    city: "Thessaloniki",
  },
  {
    propertyName: "Crystal Cove Villa",
    id: 10,
    tripDetails: [
      { FlightArrivalDate: "18/9/2023", FlightDepartureDate: "25/9/2023" },
    ],
    nights: 7,
    detailedUser: [{ firstName: "Georgios", lastName: "Manos" }],
    total_amount: 2500,
    status: "Pre Check-in",
    city: "Paros",
  },
];

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
});

export const propertiesActions = propertiesSlice.actions;
export default propertiesSlice.reducer;
