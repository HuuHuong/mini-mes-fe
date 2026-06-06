import { SLICE_NAME } from "@config/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { ThemeMode } from "@themes";
import { IDataUser } from "@types";

interface AppState {
  loading: boolean;
  themeMode: ThemeMode;
  token: string;
}

const initialAppState: AppState = {
  loading: false,
  themeMode: "dark",
  token: "",
};

const appSlice = createSlice({
  name: SLICE_NAME.APP,
  initialState: initialAppState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload;
    },
    toggleThemeMode(state) {
      state.themeMode = state.themeMode === "dark" ? "light" : "dark";
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { reducer: appReducer, actions: appActions } = appSlice;
