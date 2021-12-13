
import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { getRoomsBySort } from "../../redux/reducers/rooms/ActionRoomsCreator";

import { roomsSlice } from "../../redux/reducers/rooms/roomsSlice";

import Button from "../Button/Button";

import "./RoomSort.css";

type RoomSortProps = {
  sortVisible: boolean;
  sort_title: string;
  sort_type: string;
  sort_age: string;
};
const RoomSort: FC<RoomSortProps> = ({
  sortVisible,
  sort_title,
  sort_type,
  sort_age,
}) => {
  const dispatch = useAppDispatch();

  const {
    handleChangeSortVisible,
    handleChangeSortTitle,
    handleChangeSortType,
    handleChangeSortAge,
    handleCleanSortOptions,
  } = roomsSlice.actions;

  const sortRoomItems = [
    {
      id: 0,
      title: "По названию",
      inputPlaceholder: "Название комнаты",
      inputValue: sort_title,
      formCase: "form_title",
    },
    {
      id: 1,
      title: "По типу",
      inputPlaceholder: "Тип комнаты",
      inputValue: sort_type,
      formCase: "form_type",
    },
    {
      id: 2,
      title: "По возрасту",
      inputPlaceholder: "Возраст не <, чем",
      inputValue: sort_age,
      formCase: "form_age",
    },
  ];
  const handleChangeSortInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    formCase: string
  ) => {
    switch (formCase) {
      case "form_title":
        dispatch(handleChangeSortTitle(e.target.value));
        dispatch(getRoomsBySort([e.target.value, sort_type, sort_age]));
        break;
      case "form_type":
        dispatch(handleChangeSortType(e.target.value));
        dispatch(getRoomsBySort([sort_title, e.target.value, sort_age]));
        break;
      case "form_age":
        dispatch(handleChangeSortAge(e.target.value));
        dispatch(getRoomsBySort([sort_title, sort_type, e.target.value]));
        break;
      default:
        break;
    }
  };
  const handleOpenSort = () => {
    dispatch(handleChangeSortVisible(true));
  };
  const handleCloseSort = () => {
    dispatch(handleChangeSortVisible(false));
  };

  const handleRemoveSortOptions = () => {
    dispatch(handleCleanSortOptions());
    dispatch(getRoomsBySort(["", "", ""]));
  };
  return (
    <>
      <div className={sortVisible ? "room-sort__active" : "room-sort"}>
        {sortRoomItems &&
          sortRoomItems.map((sort, index) => (
            <div key={`${sort.id}:${index}`} className="room-sort__item">
              <div className="sort-item__title">{sort.title}</div>
              <div className="sort-item__input">
                <input
                  value={sort.inputValue}
                  onChange={(e) => handleChangeSortInput(e, sort.formCase)}
                  type="text"
                  placeholder={sort.inputPlaceholder}
                />
              </div>
            </div>
          ))}

        <div className="room-sort__tools">
          <div className="room-sort__clean">
            <Button
              onClickFunction={handleRemoveSortOptions}
              title="Очистить"
            />
          </div>
        </div>

        {sortVisible && (
          <div onClick={handleCloseSort} className="room-sort__close"></div>
        )}
      </div>
      {!sortVisible && (
        <div onClick={handleOpenSort} className="room-sort__open"></div>
      )}
    </>
  );
};

export default RoomSort;
