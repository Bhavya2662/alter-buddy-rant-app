import { createApi } from "@reduxjs/toolkit/query/react";
import { useServer } from "../hooks";
import { IUserProps } from "../../interface";

const AuthApi = createApi({
  baseQuery: useServer,
  reducerPath: "authApi",
  endpoints: ({ mutation, query }) => ({
    UserProfile: query<{ data: IUserProps }, void>({
      query: () => "/user/profile",
    }),
    MentorProfile: query<{ data: IUserProps }, void>({
      query: () => "/mentor/profile",
    }),
    GetAllCategory: query<{ data: any[] }, void>({
      query: () => `/category`,
    }),
  }),
});

export const AuthApiReducer = AuthApi.reducer;
export const AuthApiMiddleware = AuthApi.middleware;
export const {
  useUserProfileQuery,
  useLazyUserProfileQuery,
  useLazyMentorProfileQuery,
  useGetAllCategoryQuery,
} = AuthApi;
