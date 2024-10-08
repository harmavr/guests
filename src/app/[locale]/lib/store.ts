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
import reservationDataSlice from "./features/reservationData/reservationDataSlice";
import loginSlice from "./features/login/loginSlice";
// ...

const rootReducer = combineReducers({
  form: formSlice,
  reservation: reservationSlice,
  properties: propertiesSlice,
  verification: verificationCodeSlice,
  transaction: transactionsSlice,
  reservationData: reservationDataSlice,
  login: loginSlice,
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
      reservationData: reservationDataSlice,
      login: loginSlice,
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
