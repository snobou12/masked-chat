
import React, { FC } from "react";
import { Button, RoomBlock, Spinner } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { getRoomsBySort } from "../../redux/reducers/rooms/ActionRoomsCreator";

import "./RandomRoom.css";

const RandomRoom: FC = () => {
  const dispatch = useAppDispatch();
  const { rooms, getRoomsBySortLoading } = useAppSelector(
    (state) => state.roomsSlice
  );
  const { user } = useAppSelector((state) => state.userSlice);
  const unknownRooms = rooms.filter(
    (room) => !room.allowedUsers.includes(user.id) && !room.potentialUsers.includes(user.id)
  );
  const randomId = Math.floor(0 + Math.random() * unknownRooms.length);

  const handleReloadWindow = ()=>{
    window.location.reload();
  }
  React.useEffect(() => {
    dispatch(getRoomsBySort(["", "", ""]));
  }, []);
  return (
    <>
      {getRoomsBySortLoading ? (
        <Spinner />
      ) : (
        <div className="randomroom-wrapper">
          {unknownRooms.length > 0 ? (
            <RoomBlock {...unknownRooms[randomId]} />
          ) : (
            <div className="randomroom-error"><span>Комнат пока нет :(</span> <div><Button onClickFunction={handleReloadWindow} inverse title="Обновить страницу" /></div></div>
          )}
        </div>
      )}
    </>
  );
};

export default RandomRoom;
