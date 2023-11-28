import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

// Define a type for the slice state
export interface AlertState {
  display: boolean;
  type?: boolean;
  title: string;
}

export interface diplayAlertArgs {
  type: boolean;
  title: string;
}
// Define the initial state using that type
const initialState: AlertState = {
  display: false,
  type: undefined,
  title: "",
};

export const alertSlice = createSlice({
  name: "alert",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    displayAlert: (state, action: PayloadAction<diplayAlertArgs>) => {
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.display = true;
    },
    closeAlert: (state) => {
      state.display = false;
      state.type = undefined;
      state.title = "";
    },
  },
});

export const { displayAlert, closeAlert } = alertSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAlertDisplay = (state: RootState) => state.alert.display;
export const selectAlertTitle = (state: RootState) => state.alert.title;
export const selectAlertType = (state: RootState) => state.alert.type;
export default alertSlice.reducer;
