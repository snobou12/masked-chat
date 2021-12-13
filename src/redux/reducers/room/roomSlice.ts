
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoom } from "../../../models/IRoom";
import {
  acceptPotentialUser,
  createRoom,
  deletePotentialUser,
  deleteUserFromRoom,
  getRoomData,
  getRoomsOfUser,
  leaveFromRoom,
} from "./ActionRoomCreator";

type PayloadAcceptPotentialUser = {
  message: string;
  roomId: string;
  acceptedUserId: string;
};


type PayloadDeletePotentialUser={
  message:string;
  roomId:string;
  deleteUserId:string;
}

interface AuthState {
  createRoomMsg: string;
  createRoomError: string;

  isLoadingRoom: boolean;

  newRoomId: string;

  currentRoomError: string;
  currentRoom: IRoom;

  countUsersOfCurrentRoom: number;
  startPageUsersOfCurrentRoom: number;
  endPageUsersOfCurrentRoom: number;
  allPageUsersOfCurrentRoom: number;
  currentPageUsersOfCurrentRoom: number;

  roomInfoVisibility: boolean;

  deleteUserFromRoomError: string;
  deleteUserFromRoomMsg: string;

  leaveFromRoomError: string;
  leaveFromRoomMsg: string;

  profileRooms: IRoom[];
  getRoomsOfUserMsg: string;
  getRoomsOfUserError: string;

  acceptPotentialUserMsg: string;
  acceptPotentialUserError: string;
  acceptPotentialUserLoading: boolean;


  deletePotentialUserMsg: string;
  deletePotentialUserError: string;
  deletePotentialUserLoading: boolean;
}

type PayloadCreateRoom = {
  message: string;
  room: IRoom;
};

type PayloadDeleteUserFromRoom = {
  message: string;
  deleteUserId: string;
};

const initialState: AuthState = {
  createRoomMsg: "",
  createRoomError: "",

  isLoadingRoom: false,

  roomInfoVisibility: true,

  newRoomId: "",

  currentRoom: {
    id: "",
    title: "",
    description: "",
    ageRestriction: "",
    type: "",
    updatedAt: "",
    createdAt: "",
    moderator: "",
    allowedUsers: [],
    potentialUsers: [],
  },

  countUsersOfCurrentRoom: 0,
  allPageUsersOfCurrentRoom: 0,
  currentPageUsersOfCurrentRoom: 1,
  startPageUsersOfCurrentRoom: 0,
  endPageUsersOfCurrentRoom: 5,

  currentRoomError: "",

  deleteUserFromRoomError: "",
  deleteUserFromRoomMsg: "",

  leaveFromRoomError: "",
  leaveFromRoomMsg: "",

  profileRooms: [],
  getRoomsOfUserMsg: "",
  getRoomsOfUserError: "",

  acceptPotentialUserMsg: "",
  acceptPotentialUserError: "",
  acceptPotentialUserLoading: false,

  deletePotentialUserMsg: "",
  deletePotentialUserError: "",
  deletePotentialUserLoading: false,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    handleSetEmptyCreateRoomError(state) {
      state.createRoomError = "";
    },
    handleSetEmptyCreateRoomMsg(state) {
      state.createRoomMsg = "";
    },
    handleNextPageOfUsersOfCurrentRoom(state) {
      state.startPageUsersOfCurrentRoom += 5;
      state.endPageUsersOfCurrentRoom += 5;
      state.currentPageUsersOfCurrentRoom += 1;
    },
    handlePrevPageOfUsersOfCurrentRoom(state) {
      state.startPageUsersOfCurrentRoom -= 5;
      state.endPageUsersOfCurrentRoom -= 5;
      state.currentPageUsersOfCurrentRoom -= 1;
    },
    handleChangeRoomInfoVisibility(state, action: PayloadAction<boolean>) {
      state.roomInfoVisibility = action.payload;
    },
  },
  extraReducers: {
    [createRoom.fulfilled.type]: (
      state,
      action: PayloadAction<PayloadCreateRoom>
    ) => {
      state.isLoadingRoom = false;
      state.createRoomError = "";
      state.createRoomMsg = action.payload.message;
      state.newRoomId = action.payload.room.id;
    },
    [createRoom.pending.type]: (state) => {
      state.isLoadingRoom = true;
    },
    [createRoom.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoom = false;
      state.createRoomError = action.payload;
    },

    [getRoomData.fulfilled.type]: (state, action: PayloadAction<IRoom>) => {
      state.isLoadingRoom = false;
      state.currentRoom = action.payload;
      state.countUsersOfCurrentRoom = action.payload.allowedUsers.length;
      state.allPageUsersOfCurrentRoom = Math.ceil(
        action.payload.allowedUsers.length / 5
      );
    },
    [getRoomData.pending.type]: (state) => {
      state.isLoadingRoom = true;
    },
    [getRoomData.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoom = false;
      state.currentRoomError = action.payload;
    },

    [deleteUserFromRoom.fulfilled.type]: (
      state,
      action: PayloadAction<PayloadDeleteUserFromRoom>
    ) => {
      state.isLoadingRoom = false;
      state.deleteUserFromRoomMsg = action.payload.message;

      const prevUsers = [...state.currentRoom.allowedUsers];

      const newUsers = prevUsers.filter(
        (userId) => userId !== action.payload.deleteUserId
      );

      state.currentRoom.allowedUsers = newUsers;
    },
    [deleteUserFromRoom.pending.type]: (state) => {
      state.isLoadingRoom = true;
    },
    [deleteUserFromRoom.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingRoom = false;
      state.deleteUserFromRoomError = action.payload;
    },

    [leaveFromRoom.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoom = false;
      state.leaveFromRoomMsg = action.payload;
    },
    [leaveFromRoom.pending.type]: (state) => {
      state.isLoadingRoom = true;
    },
    [leaveFromRoom.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoom = false;
      state.leaveFromRoomError = action.payload;
    },

    [getRoomsOfUser.fulfilled.type]: (
      state,
      action: PayloadAction<IRoom[]>
    ) => {
      state.isLoadingRoom = false;
      state.profileRooms = action.payload;
    },
    [getRoomsOfUser.pending.type]: (state) => {
      state.isLoadingRoom = true;
    },
    [getRoomsOfUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoom = false;
      state.getRoomsOfUserError = action.payload;
    },

    [acceptPotentialUser.fulfilled.type]: (
      state,
      action: PayloadAction<PayloadAcceptPotentialUser>
    ) => {
      state.acceptPotentialUserLoading = false;
      state.acceptPotentialUserMsg = action.payload.message;
      for (let i=0;i<state.profileRooms.length;i++){
        if(state.profileRooms[i].id === action.payload.roomId){
          const prevPotentialUsers = [...state.profileRooms[i].potentialUsers];
          const newPotentialUsers = prevPotentialUsers.filter(user=>user !== action.payload.acceptedUserId);
          
          const prevAllowedUsers = [...state.profileRooms[i].allowedUsers];
          const newAllowedUsers = [...prevAllowedUsers,action.payload.acceptedUserId];

          state.profileRooms[i].allowedUsers=newAllowedUsers;
          state.profileRooms[i].potentialUsers=newPotentialUsers;

          
        }
      }
    },
    [acceptPotentialUser.pending.type]: (state) => {
      state.acceptPotentialUserLoading = true;
    },
    [acceptPotentialUser.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.acceptPotentialUserLoading = false;
      state.acceptPotentialUserError = action.payload;
    },


    [deletePotentialUser.fulfilled.type]: (
      state,
      action: PayloadAction<PayloadDeletePotentialUser>
    ) => {
      state.deletePotentialUserLoading = false;
      state.deletePotentialUserMsg = action.payload.message;

      for (let i=0;i<state.profileRooms.length;i++){
        if(state.profileRooms[i].id === action.payload.roomId){
          
          const prevPotentialUsers=[...state.profileRooms[i].potentialUsers];
          console.log(prevPotentialUsers);

          
          const newPotentialUsers = prevPotentialUsers.filter(user=>user !== action.payload.deleteUserId);

          
          console.log(newPotentialUsers);

          state.profileRooms[i].potentialUsers=newPotentialUsers;
        }
      }
      
    },
    [deletePotentialUser.pending.type]: (state) => {
      state.deletePotentialUserLoading = true;
    },
    [deletePotentialUser.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.deletePotentialUserLoading = false;
      state.deletePotentialUserError = action.payload;
    },

    


  },
});

export default roomSlice.reducer;
