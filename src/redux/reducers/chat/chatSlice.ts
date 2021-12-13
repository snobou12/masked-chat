
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat } from "../../../models/IChat";


interface AuthState {
  chat:IChat;

}

const initialState: AuthState = {
  chat:{id:"",messages:[],roomId:""},
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers:{
    handleUpdateChat(state,action:PayloadAction<IChat>){
        state.chat=action.payload
    }
  }
 
});

export default chatSlice.reducer;
