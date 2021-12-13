
import React, { FC } from "react";
import { IRoom } from "../../models/IRoom";
import { GiDoor } from "react-icons/gi";
import Button from "../Button/Button";

import { format } from "timeago.js";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { deleteRoom, unSubscribeToRoom } from "../../redux/reducers/rooms/ActionRoomsCreator";
import { ModalConfirm } from "..";
import { useNavigate } from "react-router-dom";

import "./RoomBlock.css";
import { subscribeToRoom } from "../../redux/reducers/rooms/ActionRoomsCreator";

const RoomBlock: FC<IRoom> = React.memo(function RommBlock({
  id,
  title,
  description,
  type,
  ageRestriction,
  moderator,
  allowedUsers,
  potentialUsers,
  createdAt,
  updatedAt,
}) {
  const { user } = useAppSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDeleteRoom = () => {
    dispatch(deleteRoom(id));
  };
  const handleSubscribeOnRoom =()=>{
    dispatch(subscribeToRoom(id));
  }

  const handleUnsubscribeOnRoom =()=>{
    dispatch(unSubscribeToRoom(id));
  }

  return (
    <div className="roomblock-wrapper">
      <div className="roomblock-title">{title.toUpperCase()}</div>
      <div className="roomblock-image roomblock-item">
        <GiDoor size={150} />
      </div>
      <div className="roomblock-description roomblock-item">
        Описание: <span> {description.toLocaleLowerCase()}</span>
      </div>
      <div className="roomblock-type roomblock-item">
        Тип: <span>{type}</span>
      </div>
      <div className="roomblock-age__restriction roomblock-item">
        Возрастное ограничение: <span>{ageRestriction} </span>
      </div>
      <div className="roomblock-count roomblock-item">
        Пользователей: <span>{allowedUsers.length + 1} </span>
      </div>
      <div className="roomblock-enter roomblock-item">
        {user.id === moderator ? (
          <div className="roomblock-enter__moderator">
            {" "}
            <div>
              <Button
                onClickFunction={() => navigate(`/room/${id}`)}
                inverse
                title="Войти"
              />
            </div>{" "}
            <div>
              <ModalConfirm
                onClickFunction={handleDeleteRoom}
                title="Вы точно хотите удалить комнату?"
                buttonTitle="Удалить"
                inverse
              />
            </div>{" "}
          </div>
        ) : allowedUsers.includes(user.id) ? (
          <Button
            onClickFunction={() => navigate(`/room/${id}`)}
            inverse
            title="Войти"
          />
        ) : (
          !potentialUsers.includes(user.id) ?
          <Button inverse onClickFunction={handleSubscribeOnRoom} title="Подписаться" />
         
          :  <Button inverse onClickFunction={handleUnsubscribeOnRoom} title="Отписаться" />
        )}
      </div>
      <div className="roomblock-created roomblock-item">
        Создана: <span>{format(createdAt)}</span>
      </div>
    </div>
  );
});

export default RoomBlock;
