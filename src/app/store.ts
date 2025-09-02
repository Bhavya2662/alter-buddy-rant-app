import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthReducer } from "./features";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  AudioApiMiddleware,
  AudioApiReducer,
  AuthApiMiddleware,
  AuthApiReducer,
} from "./api";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, AuthReducer);

export const store = configureStore({
  reducer: combineReducers({
    auth: persistedReducer,
    authApi: AuthApiReducer,
    audioApi: AudioApiReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      AuthApiMiddleware,
      AudioApiMiddleware,
    ] as Middleware[]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
setupListeners(store.dispatch);
export const persistor = persistStore(store);
