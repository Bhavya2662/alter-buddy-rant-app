import React, { FC, Fragment, ReactNode } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "../app/store";
import { BrowserRouter, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

export interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <Fragment>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>{children}</Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </Fragment>
  );
};
