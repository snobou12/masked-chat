
import React, { FC } from "react";

import { Routes, Route } from "react-router-dom";
import { Header,Spinner } from "../components";

import { AllRooms, CreateRoom, Home, Login, Profile, RandomRoom, Registration, Room } from "../pages";
import { useAppDispatch, useAppSelector } from "../redux/hooks/redux";
import { checkAuth } from "../redux/reducers/user/ActionUserCreator";

import "./App.css";
const App: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoadingRegistration } = useAppSelector(
    (state) => state.registrationSlice
  );
  const { isLoadingRoom } = useAppSelector(
    (state) => state.roomSlice
  );
  const { isLoadingUser, user, isAuth } = useAppSelector(
    (state) => state.userSlice
  );
  React.useEffect(() => {
    if (localStorage.getItem("masked-token")) {
      dispatch(checkAuth());
    }
  }, []);

  return (
        <div className="app-wrapper">
          <Header userData={user} userIsAuth={isAuth} />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Home userIsAuth={isAuth} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/user/profile" element={<Profile user={user} />} />
               <Route path="room/random" element={<RandomRoom />} /> 
              <Route path="/room/create" element={<CreateRoom  />} />
              <Route path="/room/:roomId" element={<Room  />} />
              <Route path="/room/all" element={<AllRooms  />} />
            </Routes>
          </div>
        </div>
        
      
    
  );
};

export default App;
