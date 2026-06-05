import { SLICE_NAME } from "@config/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { ThemeMode } from "@themes";

interface AppState {
  loading: boolean;
  themeMode: ThemeMode;
}

const initialAppState: AppState = {
  loading: false,
  themeMode: "dark",
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
  },
});

export const { reducer: appReducer, actions: appActions } = appSlice;
