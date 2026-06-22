import { configureStore } from "@reduxjs/toolkit";

import { allReducer } from "./all-reducer";

import { listenerMiddleware } from "../listener";
import { subscribeActionMiddleware } from "@common/redux";
import { persistReducer, persistStore } from "redux-persist";
import { reduxPersistStorage } from "../../storage";

const middleware = [subscribeActionMiddleware];

const persistConfig = {
  storage: reduxPersistStorage,
  key: "MINI-MES",
};

const persistedReducer = persistReducer(persistConfig, allReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .prepend(listenerMiddleware.middleware)
      .concat(middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
