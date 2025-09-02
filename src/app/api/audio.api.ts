import { createApi } from "@reduxjs/toolkit/query/react";
import { useServer } from "../hooks";

const AudioApi = createApi({
  baseQuery: useServer,
  reducerPath: "audioApi",
  endpoints: ({ mutation, query }) => ({
    GetGetStreamToken: query<{ data: string }, void>({
      query: () => "/rant/get-stream/token",
    }),
  }),
});

export const AudioApiReducer = AudioApi.reducer;
export const AudioApiMiddleware = AudioApi.middleware;
export const { useLazyGetGetStreamTokenQuery, useGetGetStreamTokenQuery } =
  AudioApi;
