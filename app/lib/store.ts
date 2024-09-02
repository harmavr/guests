import {
  Action,
  combineReducers,
  combineSlices,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import formSlice from "./features/form/formSlice";
import reservationSlice from "./features/reservation/reservationSlice";
// ...

const rootReducer = combineReducers({
  form: formSlice,
  reservation: reservationSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: {
      form: formSlice,
      reservation: reservationSlice,
    },
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
