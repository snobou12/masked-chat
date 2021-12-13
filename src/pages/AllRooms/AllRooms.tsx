
import React, { FC } from "react";
import { RoomBlock, RoomSort, Spinner } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { getRoomsBySort } from "../../redux/reducers/rooms/ActionRoomsCreator";

import "./AllRooms.css";

const AllRooms: FC = () => {
  const {
    sortVisible,
    rooms,
    sort_title,
    sort_age,
    sort_type,
    getRoomsBySortLoading,
  } = useAppSelector((state) => state.roomsSlice);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getRoomsBySort([sort_title, sort_age, sort_type]));
  }, []);

  return (
    <>
      <RoomSort
        sort_title={sort_title}
        sort_age={sort_age}
        sort_type={sort_type}
        sortVisible={sortVisible}
      />
      <div className={"allrooms-wrapper"}>
        {getRoomsBySortLoading ? (
          <Spinner />
        ) : (
          <div className="room-blocks">
            {rooms.length > 0 ? (
              rooms.map((room, index) => (
                <RoomBlock key={`${room.id}:${index}`} {...room} />
              ))
            ) : (
              <div className="allrooms-not__found">Комнаты не найдены :(</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AllRooms;
