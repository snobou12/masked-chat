
import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../../services/AuthService";

export const login = createAsyncThunk(
  "user/login",
  async ([email, password]: [string, string], thunkApi) => {
    try {
      const response = await AuthService.login(email, password);

      return response.data;
    } catch (e: any) {
      if (e.response?.data?.message) {
        return thunkApi.rejectWithValue(e.response.data.message);
      }
    }
  }
);

export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, thunkApi) => {
    try {
      const response = await AuthService.checkAuth();
      return response.data;
    } catch (e: any) {
      if (e.response?.data?.message) {
        return thunkApi.rejectWithValue(e.response.data.message);
      }
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkApi) => {
  try {
    const response = await AuthService.logout();
    return response.data;
  } catch (e: any) {
    if (e.response?.data?.message) {
      return thunkApi.rejectWithValue(e.response.data.message);
    }
  }
});
