
import React, { FC } from "react";

import userAnonymImage from "../../../assets/img/user_anonym.png";
import moderatorAnonymImage from "../../../assets/img/default_anonym_image.jpg";

import "./RoomInfo.css";

import { Button, ModalConfirm } from "../../../components";
import { roomSlice } from "../../../redux/reducers/room/roomSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux";
import { deleteRoom } from "../../../redux/reducers/rooms/ActionRoomsCreator";
import { useNavigate } from "react-router-dom";
import {
  deleteUserFromRoom,
  leaveFromRoom,
} from "../../../redux/reducers/room/ActionRoomCreator";

type RoomInfoPropsType = {
  roomId: string;
};

const RoomInfo: FC<RoomInfoPropsType> = ({ roomId }) => {
  const navigate = useNavigate();
  const {
    handleNextPageOfUsersOfCurrentRoom,
    handlePrevPageOfUsersOfCurrentRoom,
    handleChangeRoomInfoVisibility,
  } = roomSlice.actions;
  const { user } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const {
    currentRoom,
    startPageUsersOfCurrentRoom,
    endPageUsersOfCurrentRoom,
    allPageUsersOfCurrentRoom,
    currentPageUsersOfCurrentRoom,
    roomInfoVisibility,
  } = useAppSelector((state) => state.roomSlice);

  const handlePrevPageOfUsers = () => {
    dispatch(handlePrevPageOfUsersOfCurrentRoom());
  };
  const handleNextPageOfUsers = () => {
    dispatch(handleNextPageOfUsersOfCurrentRoom());
  };
  const handleDeleteRoom = () => {
    dispatch(deleteRoom(roomId));
    navigate("/");
  };

  const handleLeaveFromRoom = () => {
    dispatch(leaveFromRoom(roomId));
    navigate("/");
  };
  const handleDeleteUserFromRoom = (deleteUserId: string) => {
    dispatch(deleteUserFromRoom([roomId, deleteUserId]));
  };
  const handleChangeVisibilityRoomInfo = (bool: boolean) => {
    dispatch(handleChangeRoomInfoVisibility(bool));
  };

  return (
    <>
      <div className={roomInfoVisibility ? "room-info__active" : "room-info"}>
        <div
          onClick={() => handleChangeVisibilityRoomInfo(false)}
          className="room-info__close"
        ></div>

        <div className="room-info__moderator">
          <span>Модератор</span>
          <div className="moderator-info__selection">
            <img src={moderatorAnonymImage} alt="room_moderator_icon" />
            <span>
              {currentRoom.moderator === user.id
                ? user.firstname + " " + user.lastname + " (Вы)"
                : currentRoom.moderator}
            </span>
          </div>
        </div>
        <div className="room-info__title">
          Название: <span>{currentRoom.title}</span>
        </div>
        <div className="room-info__description">
          Описание: <span>{currentRoom.description}</span>
        </div>
        <div className="room-info__type">
          Тип: <span>{currentRoom.type}</span>
        </div>
        <div className="room-info__age">
          Ограничение возраста: <span>{currentRoom.ageRestriction}</span>
        </div>

        <div className="room-info__users">
          <div>Пользователи</div>
          {currentRoom.allowedUsers
            .slice(startPageUsersOfCurrentRoom, endPageUsersOfCurrentRoom)
            .map((allowedUserId, index) => (
              <div
                key={`${allowedUserId}:${index}`}
                className="room__users-item"
              >
                <img src={userAnonymImage} alt="room_user_icon" />
                <span>
                  {allowedUserId === user.id
                    ? user.firstname + " " + user.lastname + " (Вы)"
                    : allowedUserId}
                </span>
                {user.id === currentRoom.moderator ? (
                  <div>
                    {" "}
                    <ModalConfirm
                      buttonWidth="20px"
                      buttonPadding="1px 10px"
                      title={`Вы точно хотите удалить пользователя - ${allowedUserId}?`}
                      buttonTitle="x"
                      onClickFunction={() =>
                        handleDeleteUserFromRoom(allowedUserId)
                      }
                    />{" "}
                  </div>
                ) : null}
              </div>
            ))}
        </div>
        <div className="room-info__tools">
          <div>
            <Button
              onClickFunction={handlePrevPageOfUsers}
              disabled={currentPageUsersOfCurrentRoom == 1}
              title="Предыдущие"
            />{" "}
          </div>
          <div>
            <Button
              onClickFunction={handleNextPageOfUsers}
              disabled={
                currentPageUsersOfCurrentRoom >= allPageUsersOfCurrentRoom
              }
              title="Следующие"
            />{" "}
          </div>
        </div>
        <div className="room-info__leave">
          {user.id === currentRoom.moderator ? (
            <ModalConfirm
              title="Вы точно хотите удалить комнату?"
              buttonTitle="Удалить комнату"
              onClickFunction={handleDeleteRoom}
            />
          ) : (
            <ModalConfirm
              title="Вы точно хотите выйти из комнаты?"
              buttonTitle="Выйти из комнаты"
              onClickFunction={handleLeaveFromRoom}
            />
          )}
        </div>
      </div>
      {!roomInfoVisibility && (
        <div
          onClick={() => handleChangeVisibilityRoomInfo(true)}
          className="room-info__open"
        >
          {" "}
        </div>
      )}
    </>
  );
};

export default RoomInfo;
