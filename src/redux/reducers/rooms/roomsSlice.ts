
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoom } from "../../../models/IRoom";

import { deleteRoom, getRoomsBySort, subscribeToRoom, unSubscribeToRoom } from "./ActionRoomsCreator";

type PayloadDelete = {
  message: string;
  roomId: string;
};

type PayloadSubcribeToRoom={
  message:string;
  roomId:string;
  userId:string;
}

interface AuthState {
  sortVisible: boolean;
  sort_title: string;
  sort_type: string;
  sort_age: string;
  rooms: IRoom[];

  getRoomsBySortLoading: boolean;
  getRoomsBySortError: string;

  deleteRoomError: string;
  deleteRoomMsg: string;
  deleteRoomIsLoading: boolean;


  subscribeToRoomMsg:string;
  subscribeToRoomError:string;
  subscribeToRoomLoading:boolean;

  UnSubscribeToRoomMsg:string;
  UnSubscribeToRoomError:string;
  UnSubscribeToRoomLoading:boolean;
}

const initialState: AuthState = {
  sortVisible: false,
  sort_title: "",
  sort_type: "",
  sort_age: "",
  rooms: [],

  getRoomsBySortLoading: false,
  getRoomsBySortError: "",
  deleteRoomError: "",
  deleteRoomMsg: "",
  deleteRoomIsLoading: false,

  subscribeToRoomMsg:"",
  subscribeToRoomError:"",
  subscribeToRoomLoading:false,

  UnSubscribeToRoomMsg:"",
  UnSubscribeToRoomError:"",
  UnSubscribeToRoomLoading:false,
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    handleChangeSortVisible(state, action: PayloadAction<boolean>) {
      state.sortVisible = action.payload;
    },
    handleChangeSortTitle(state, action: PayloadAction<string>) {
      state.sort_title = action.payload;
    },
    handleChangeSortType(state, action: PayloadAction<string>) {
      state.sort_type = action.payload;
    },
    handleChangeSortAge(state, action: PayloadAction<string>) {
      state.sort_age = action.payload;
    },
    handleCleanSortOptions(state) {
      state.sort_age = "";
      state.sort_title = "";
      state.sort_type = "";
    },
  },
  extraReducers: {
    [getRoomsBySort.fulfilled.type]: (
      state,
      action: PayloadAction<IRoom[]>
    ) => {
      state.getRoomsBySortLoading = false;
      state.rooms = action.payload;
    },
    [getRoomsBySort.pending.type]: (state) => {
      state.getRoomsBySortLoading = true;
    },
    [getRoomsBySort.rejected.type]: (state, action: PayloadAction<string>) => {
      state.getRoomsBySortLoading = false;
      state.getRoomsBySortError = action.payload;
    },

    [deleteRoom.fulfilled.type]: (
      state,
      action: PayloadAction<PayloadDelete>
    ) => {
      state.deleteRoomIsLoading = false;
      state.deleteRoomError = "";
      state.deleteRoomMsg = action.payload.message;
      const prevRooms = [...state.rooms];
      const newRooms = prevRooms.filter((room)=>room.id !== action.payload.roomId);
      state.rooms = newRooms;
    },
    [deleteRoom.pending.type]: (state) => {
      state.deleteRoomIsLoading = true;
    },
    [deleteRoom.rejected.type]: (state, action: PayloadAction<string>) => {
      state.deleteRoomIsLoading = false;
      state.deleteRoomError = action.payload;
    },



    [subscribeToRoom.fulfilled.type]: (
      state,
      action: PayloadAction<PayloadSubcribeToRoom>
    ) => {
      state.subscribeToRoomLoading = false;
      state.subscribeToRoomMsg=action.payload.message;
      for (let i=0;i<state.rooms.length;i++){
        if(state.rooms[i].id===action.payload.roomId){
          state.rooms[i].potentialUsers=[...state.rooms[i].potentialUsers,action.payload.userId]
        }
      }
      
      
    },
    [subscribeToRoom.pending.type]: (state) => {
      state.subscribeToRoomLoading = true;
    },
    [subscribeToRoom.rejected.type]: (state, action: PayloadAction<string>) => {
      state.subscribeToRoomLoading = false;
      state.subscribeToRoomError=action.payload;
      
    },




    [unSubscribeToRoom.fulfilled.type]: (
      state,
      action: PayloadAction<PayloadSubcribeToRoom>
    ) => {
      state.UnSubscribeToRoomLoading=false;
      state.UnSubscribeToRoomMsg=action.payload.message;


      for(let i=0;i<state.rooms.length;i++){
        if(state.rooms[i].id === action.payload.roomId){
          const prevPotentialUsers = [...state.rooms[i].potentialUsers];
          const newPotentialUsers = prevPotentialUsers.filter((userId)=>userId !== action.payload.userId);
          state.rooms[i].potentialUsers=newPotentialUsers
        }
      }
      
    },
    [unSubscribeToRoom.pending.type]: (state) => {
      state.UnSubscribeToRoomLoading=true;
      
    },
    [unSubscribeToRoom.rejected.type]: (state, action: PayloadAction<string>) => {
     
      state.UnSubscribeToRoomLoading=false;
      state.UnSubscribeToRoomError=action.payload;
      
    },
  },
});

export default roomsSlice.reducer;
