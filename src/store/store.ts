import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { logoutUser } from "./globalReducer";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import storage from "redux-persist/lib/storage";

const LOGOUT = logoutUser.type;
const DEBUG = process.env.NODE_ENV !== "production";

/*
 * redux-persist configuration
 */
const persistConfig = {
  // if immutable js is used //#region
  transforms: [],
  key: "app-root-reducer",
  storage,
  whitelist: ["global"],
  stateReconciler: autoMergeLevel2,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let sagaMiddleware = createSagaMiddleware();

const middleware: any[] = [
  ...getDefaultMiddleware({
    thunk: false,
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
        LOGOUT,
      ],
    },
  }),
  sagaMiddleware,
];

if (DEBUG) {
  middleware.push(logger);
}

const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: DEBUG,
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);
export { persistor };
export default store;
