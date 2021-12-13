
import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import registrationSlice from "./reducers/registration/registrationSlice";
import userSlice from "./reducers/user/userSlice";
import roomSlice from "./reducers/room/roomSlice";
import roomsSlice from "./reducers/rooms/roomsSlice";
import chatSlice from "./reducers/chat/chatSlice";

const rootReducer = combineReducers({
  registrationSlice,
  userSlice,
  roomSlice,
  roomsSlice,
  chatSlice
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore["dispatch"];
