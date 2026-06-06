import { configureStore } from "@reduxjs/toolkit";

import { allReducer } from "./all-reducer";

import { listenerMiddleware } from "../listener";
import { subscribeActionMiddleware } from "@common/redux";
import { persistReducer, persistStore } from "redux-persist";
import { reduxPersistStorage } from "../../storage";

/**
 * Use this instead storage of reduxPersist
 * import {persistStore, persistReducer} from 'redux-persist';
 * import {reduxPersistStorage} from '@utils';
 * const persistedReducer = persistReducer(
 *   {key: 'root', storage: reduxPersistStorage},
 *   allReducer,
 * );
 */

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
/**
 * export const persistore = persistStore(store);
 */

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
