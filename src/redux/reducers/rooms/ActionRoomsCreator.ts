
import { createAsyncThunk } from "@reduxjs/toolkit";
import RoomsService from "../../../services/RoomsService";

export const getRoomsBySort = createAsyncThunk(
  "rooms/getRoomsBySort",
  async (
    [form_title, form_type, form_age]: [string, string, string],
    thunkApi
  ) => {
    try {
      const response = await RoomsService.getRoomsBySort(
        form_title,
        form_type,
        form_age
      );
      return response.data;
    } catch (e: any) {
      if (e.response?.data?.message) {
        return thunkApi.rejectWithValue(e.response.data.message);
      }
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "room/delete",
  async (roomId: string, thunkApi) => {
    try {
      const response = await RoomsService.deleteRoom(roomId);
      return response.data;
    } catch (e: any) {
      if (e.response?.data?.message) {
        return thunkApi.rejectWithValue(e.response.data.message);
      }
    }
  }
);


export const subscribeToRoom = createAsyncThunk(
  "room/subscribeToRoom",
  async (roomId:string, thunkApi) => {
    try {
      const response = await RoomsService.subscribeToRoom(roomId);
      return response.data;
    } catch (e: any) {
      if (e.response?.data?.message) {
        return thunkApi.rejectWithValue(e.response.data.message);
      }
    }
  }
);


export const unSubscribeToRoom = createAsyncThunk(
  "room/unSubscribeToRoom",
  async (roomId:string, thunkApi) => {
    try {
      const response = await RoomsService.unSubscribeToRoom(roomId);
      return response.data;
    } catch (e: any) {
      if (e.response?.data?.message) {
        return thunkApi.rejectWithValue(e.response.data.message);
      }
    }
  }
);