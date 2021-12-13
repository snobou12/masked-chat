
import React, { ChangeEvent, FC } from "react";
import { Button } from "../../components";
import { BsFillFilePlusFill } from "react-icons/bs";

import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';

import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { createRoom } from "../../redux/reducers/room/ActionRoomCreator";
import { roomSlice } from "../../redux/reducers/room/roomSlice";
import { useNavigate } from "react-router";
import "./CreateRoom.css";

var rgNumber = /^\d+$/;

const CreateRoom: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { createRoomMsg, createRoomError, newRoomId, isLoadingRoom } =
    useAppSelector((state) => state.roomSlice);
  const { handleSetEmptyCreateRoomError, handleSetEmptyCreateRoomMsg } =
    roomSlice.actions;

  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [type, setType] = React.useState<string>("");
  const [ageRestriction, setAgeRestriction] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const handleChangeOptionsRoom = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    formCase: string
  ) => {
    switch (formCase) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "type":
        setType(e.target.value);
        break;
      case "ageRestriction":
        setAgeRestriction(e.target.value);
        break;
      default:
        break;
    }
  };
  const handleClickSubmit = () => {
    if (title.length < 3 || title.length > 20) {
      setError(
        "Название комнаты должно быть не меньше 3 и не больше 20 знаков"
      );
      setTimeout(() => {
        setError("");
      }, 2500);
      return null;
    }

    if (description.length < 8 || description.length > 60) {
      setError(
        "Описание комнаты должно быть не меньше 8 и не больше 60 знаков"
      );
      setTimeout(() => {
        setError("");
      }, 2500);
      return null;
    }

    if (type.length < 3 || type.length > 20) {
      setError("Тип комнаты должнен быть не меньше 3 и не больше 15 знаков");
      setTimeout(() => {
        setError("");
      }, 2500);
      return null;
    }

    for (let i = 0; i < type.length; i++) {
      if (type[i] === " ") {
        setError("Тип комнаты должно состоять из одного слова");
        setTimeout(() => {
          setError("");
        }, 2500);
        return null;
      }
    }

    if (!rgNumber.exec(ageRestriction) || ageRestriction.length !== 2) {
      setError(
        "Ограничение возраста должно состоять только из двухзначного числа"
      );
      setTimeout(() => {
        setError("");
      }, 3000);
      return null;
    }

    dispatch(createRoom([title, description, type, ageRestriction]));
    setTimeout(() => {
      dispatch(handleSetEmptyCreateRoomError());
    }, 2000);
  };
  React.useEffect(() => {
    if (createRoomMsg === "Комната успешно создана") {
      setTimeout(() => {
        dispatch(handleSetEmptyCreateRoomMsg());
        navigate(`/room/${newRoomId}`);
      }, 1500);
    }
  }, [createRoomMsg]);



  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 320,
      maxHeight: 400,
      fontSize: 16,
      color: 'white',
      backgroundColor: '#292929',
      borderRadius:"20px",
      fontWeight: 'bold',
    },
  });
  return (
    <div className="createroom-wrapper">
      <div className="createroom-block">
        <div className="createroom-title">
          <span>Создание комнаты</span>
          <CustomWidthTooltip title={<div className="createroom-tooltip">
            <div className="createroom-tooltipt__title">
              Информация
            </div>
            <div className="createroom-tooltipt__info">
              <ul>
              <li>Название комнаты должно состоять от 3 до 20 знаков </li>
              <li>Описание комнаты должно состоять от 8 до 60 знаков </li>
              <li>Тип комнаты должно состоять от 3 до 16 знаков и из одного слова</li>
              <li>Возрастное ограничение комнаты должно состоять только из двухзначного числа</li>
              </ul>
              



            </div>
            </div>} placement="bottom" enterDelay={400} leaveDelay={100}>
              <InfoIcon />
          </CustomWidthTooltip>
          </div>
        <div className="createroom-image">
          <BsFillFilePlusFill size="200" />
        </div>
        <div className="createroom-selection__row">
          <div className="createroom-selection">
            <div className="createroom-selection__title">Название комнаты</div>
            <div className="createroom-selection__input">
              <input
                type="text"
                value={title}
                onChange={(e) => handleChangeOptionsRoom(e, "title")}
                placeholder="Название"
              />
            </div>
          </div>

          <div className="createroom-selection">
            <div className="createroom-selection__title">Описание комнаты</div>
            <div className="createroom-selection__input">
              <input
                value={description}
                onChange={(e) => handleChangeOptionsRoom(e, "description")}
                placeholder="Описание"
              />
            </div>
          </div>
        </div>

        <div className="createroom-selection__row">
          <div className="createroom-selection">
            <div className="createroom-selection__title">Тип комнаты</div>
            <div className="createroom-selection__input">
              <input
                value={type}
                onChange={(e) => handleChangeOptionsRoom(e, "type")}
                placeholder="Знакомства, работа..."
              />
            </div>
          </div>

          <div className="createroom-selection">
            <div className="createroom-selection__title">
              Возрастное ограничение
            </div>
            <div className="createroom-selection__input">
              <input
                value={ageRestriction}
                onChange={(e) => handleChangeOptionsRoom(e, "ageRestriction")}
                type="number"
                placeholder="Возраст"
              />
            </div>
          </div>
        </div>

        <div className="createroom-tools">
          <Button
            disabled={isLoadingRoom}
            onClickFunction={handleClickSubmit}
            title="Создать"
          />
        </div>
        <div className="createroom-error">
          {error ? error : ""}
          {createRoomError ? createRoomError : ""}
        </div>
        <div className="createroom-success">
          {createRoomMsg ? createRoomMsg : ""}
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
