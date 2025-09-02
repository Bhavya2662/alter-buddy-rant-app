import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../store";
import { IUserProps } from "../../interface";

export interface AuthSliceProps {
  token: string | null;
  user: any | null;
}

const initialState: AuthSliceProps = {
  token: null,
  user: null,
};

const AuthSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    saveUser: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    saveUserProfile: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.token = null;
    },
  },
});

export const useAuthSlice = () =>
  useAppSelector((state) => {
    return state.auth;
  });

export const AuthReducer = AuthSlice.reducer;
export const { saveUser, removeUser, saveUserProfile } = AuthSlice.actions;
