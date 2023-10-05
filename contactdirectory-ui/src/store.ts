import { configureStore } from "@reduxjs/toolkit";
import contactDataReducer from "./slices/contactDataSlice"; // Create this file in the next step
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    contactData: contactDataReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
