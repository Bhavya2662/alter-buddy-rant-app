import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store";

export const useServer = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BACKEND_URL!,
  prepareHeaders: (header, api) => {
    const token = (api.getState() as RootState).auth.token
      ? (api.getState() as RootState).auth.token
      : "";
    return header.set("Authorization", token as string);
  },
});
