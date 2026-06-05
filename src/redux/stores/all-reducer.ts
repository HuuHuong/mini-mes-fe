import { appReducer } from "@redux/redux-slice";
import { combineReducers } from "@reduxjs/toolkit";

export const allReducer = combineReducers({
  app: appReducer,
});

export type RootState = ReturnType<typeof allReducer>;
