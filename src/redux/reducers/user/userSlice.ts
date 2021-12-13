
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../models/IUser";
import { checkAuth, login, logout } from "./ActionUserCreator";

interface LoginPayloadType {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: IUser;
  isAuth: boolean;
  isLoadingUser: boolean;
  loginErrorMsg: string;
  logoutErrorMsg: string;
}

const initialState: AuthState = {
  user: {
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    phone: "",
    isActivatedEmail: false,
  },
  isLoadingUser: false,
  isAuth: false,
  loginErrorMsg: "",
  logoutErrorMsg: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled.type]: (
      state,
      action: PayloadAction<LoginPayloadType>
    ) => {
      state.isLoadingUser = false;
      localStorage.setItem("masked-token", action.payload.accessToken);
      state.user = action.payload.user;
      state.isAuth = true;
    },
    [login.pending.type]: (state) => {
      state.isLoadingUser = true;
    },
    [login.rejected.type]: (state, action: PayloadAction<string>) => {
      localStorage.removeItem("masked-token");
      state.isLoadingUser = false;
      state.isAuth = false;
      state.user = {
        id: "",
        email: "",
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        phone: "",
        isActivatedEmail: false,
      };
      state.loginErrorMsg = action.payload;
    },

    [checkAuth.fulfilled.type]: (
      state,
      action: PayloadAction<LoginPayloadType>
    ) => {
      state.isLoadingUser = false;
      localStorage.setItem("masked-token", action.payload.accessToken);
      state.user = action.payload.user;
      state.isAuth = true;
    },
    [checkAuth.pending.type]: (state) => {
      state.isLoadingUser = true;
    },
    [checkAuth.rejected.type]: (state) => {
      localStorage.removeItem("masked-token");
      state.isLoadingUser = false;
      state.isAuth = false;
      state.user = {
        id: "",
        email: "",
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        phone: "",
        isActivatedEmail: false,
      };
    },

    [logout.fulfilled.type]: (state) => {
      localStorage.removeItem("masked-token");
      state.isLoadingUser = false;
      state.isAuth = false;
      state.user = {
        id: "",
        email: "",
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        phone: "",
        isActivatedEmail: false,
      };
    },
    [logout.pending.type]: (state) => {
      state.isLoadingUser = true;
    },
    [logout.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingUser = false;
      state.logoutErrorMsg = action.payload;
    },
  },
});

export default userSlice.reducer;
