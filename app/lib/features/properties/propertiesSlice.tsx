import { createSlice } from "@reduxjs/toolkit";
import { Properties } from "../../types";

const initialState: Properties[] = [
  {
    name: "Villa Aroma",
    id: 1,
    details: `10/9/2024(Thur)
                17/9/2024            `,
    nights: 7,
    visitor: "Charis Mavr",
    total_amount: 1000,
    status: "Confirmed",
  },
  {
    name: "Euphoria Villa",
    id: 2,
    details: `10/9/2024(Thur)
                20/9/2024            `,
    nights: 8,
    visitor: "Giannis Zoub",
    total_amount: 2000,
    status: "Pre Check-in",
  },
];

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
});

export const propertiesActions = propertiesSlice.actions;
export default propertiesSlice.reducer;
