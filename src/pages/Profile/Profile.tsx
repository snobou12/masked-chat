
import React, { FC } from "react";

import { IUser } from "../../models/IUser";
import { ProfileInfo, ProfileRooms } from ".";

import "./Profile.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { getRoomsOfUser } from "../../redux/reducers/room/ActionRoomCreator";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

type ProfilePropsType = {
  user: IUser;
};

const Profile: FC<ProfilePropsType> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { profileRooms, getRoomsOfUserMsg, getRoomsOfUserError } =
    useAppSelector((state) => state.roomSlice);

  React.useEffect(() => {
    dispatch(getRoomsOfUser());
  }, []);
  return (
    <div className="profile-wrapper">
      <ProfileInfo user={user} />
      {profileRooms.length > 0 ? (
        <ProfileRooms
          user={user}
          profileRooms={profileRooms}
          getRoomsOfUserMsg={getRoomsOfUserMsg}
          getRoomsOfUserError={getRoomsOfUserError}
        />
      ) : (
        <div className="profile-norooms">
          <span>
            У вас пока нет комнат, вы можете создать или посмотреть другие
          </span>
          <div className="profile-norooms__tools">
            <div>
              {" "}
              <Button
                onClickFunction={() => navigate("/room/create")}
                title="Создать комнату"
              />{" "}
            </div>
            <div>
              {" "}
              <Button
                onClickFunction={() => navigate("/room/all")}
                title="Посмотреть другие"
              />{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
