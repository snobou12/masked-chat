
import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../../services/AuthService";

export const checkUniqueEmail = createAsyncThunk(
  "auth/checkUniqueEmail",
  async (email: string, thunkApi) => {
    try {
      const response = await AuthService.checkUniqueEmail(email);

      return response.data;
    } catch (e: any) {
      if (e.response?.data?.message) {
        return thunkApi.rejectWithValue(e.response.data.message);
      }
    }
  }
);

export const checkUniquePhone = createAsyncThunk(
  "auth/checkUniquePhone",
  async (phone: string, thunkApi) => {
    try {
      const response = await AuthService.checkUniquePhone(phone);
      
      if (response.data) {
        const codeResponse = await AuthService.sendActivationCode(phone);
      }
      return response.data;
    } catch (e: any) {
      if (e.response?.data?.message) {
        return thunkApi.rejectWithValue(e.response.data.message);
      }
    }
  }
);

export const checkActivationCode = createAsyncThunk(
  "auth/checkActivationCode",
  async ([phone, code]: [string, string], thunkApi) => {
    try {
      const response = await AuthService.checkActivationCode(phone, code);
      return response.data;
    } catch (e: any) {
      if (e.response?.data?.message) {
        return thunkApi.rejectWithValue(e.response.data.message);
      }
    }
  }
);

export const registration = createAsyncThunk(
  "auth/registration",
  async (
    [email, password, firstname, lastname, age, gender, phone]: [
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ],
    thunkApi
  ) => {
    try {
      const response = await AuthService.registration(
        email,
        password,
        firstname,
        lastname,
        age,
        gender,
        phone
      );
      

      return response.data;
    } catch (e: any) {
      if (e.response?.data?.message) {
        return thunkApi.rejectWithValue(e.response.data.message);
      }
    }
  }
);
