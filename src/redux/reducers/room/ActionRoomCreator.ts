
import { createAsyncThunk } from "@reduxjs/toolkit";
import RoomService from "../../../services/RoomService";

export const createRoom = createAsyncThunk(
  "room/createRoom",
  async (
    [title, description, type, ageRestriction]: [
      string,
      string,
      string,
      string
    ],
    thunkApi
  ) => {
    try {
      const response = await RoomService.createRoom(
        title,
        description,
        type,
        ageRestriction
      );
      return response.data;
    } catch (e: any) {
      if (e.response?.data?.message) {
        return thunkApi.rejectWithValue(e.response.data.message);
      }
    }
  }
);

export const getRoomData = createAsyncThunk(
  "room/getRoomData",
  async (roomId: string, thunkApi) => {
    try {
      const response = await RoomService.getRoomData(roomId);
      return response.data;
    } catch (e: any) {
      if (e.response?.data?.message) {
        return thunkApi.rejectWithValue(e.response.data.message);
      }
    }
  }
);

export const deleteUserFromRoom = createAsyncThunk(
  "room/deleteUserFromRoom",
  async ([roomId, deleteUserId]: [string, string], thunkApi) => {
    try {
      const response = await RoomService.deleteUserFromRoom(
        roomId,
        deleteUserId
      );
      return response.data;
    } catch (e: any) {
      if (e.response?.data?.message) {
        return thunkApi.rejectWithValue(e.response.data.message);
      }
    }
  }
);

export const leaveFromRoom = createAsyncThunk(
  "room/leaveFromRoom",
  async (roomId: string, thunkApi) => {
    try {
      const response = await RoomService.leaveFromRoom(roomId);
      return response.data.message;
    } catch (e: any) {
      if (e.response?.data?.message) {
        return thunkApi.rejectWithValue(e.response.data.message);
      }
    }
  }
);

export const getRoomsOfUser = createAsyncThunk(
  "room/getRoomsOfUser",
  async (_, thunkApi) => {
    try {
      const response = await RoomService.getRoomsOfUser();
      return response.data;
    } catch (e: any) {
      if (e.response?.data?.message) {
        return thunkApi.rejectWithValue(e.response.data.message);
      }
    }
  }
);


export const acceptPotentialUser = createAsyncThunk(
  "room/acceptPotentialUser",
  async ([roomId,acceptedUserId]:[string,string], thunkApi) => {
    try {
      const response = await RoomService.acceptPotentialUser(roomId,acceptedUserId);
      return response.data;
    } catch (e: any) {
      if (e.response?.data?.message) {
        return thunkApi.rejectWithValue(e.response.data.message);
      }
    }
  }
);

export const deletePotentialUser = createAsyncThunk(
  "room/deletePotentialUser",
  async ([roomId,deleteUserId]:[string,string], thunkApi) => {
    try {
      const response = await RoomService.deletePotentialUser(roomId,deleteUserId);
      return response.data;
    } catch (e: any) {
      if (e.response?.data?.message) {
        return thunkApi.rejectWithValue(e.response.data.message);
      }
    }
  }
);

