import {
  Action,
  combineReducers,
  combineSlices,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import formSlice from "./features/form/formSlice";
import reservationSlice from "./features/reservation/reservationSlice";
import propertiesSlice from "./features/properties/propertiesSlice";
import verificationCodeSlice from "./features/verification-code/verificationCodeSlice";
import transactionsSlice from "./features/transactions/transactionsSlice";
// ...

const rootReducer = combineReducers({
  form: formSlice,
  reservation: reservationSlice,
  properties: propertiesSlice,
  verification: verificationCodeSlice,
  transaction: transactionsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: {
      form: formSlice,
      reservation: reservationSlice,
      properties: propertiesSlice,
      verification: verificationCodeSlice,
      transaction: transactionsSlice,
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
