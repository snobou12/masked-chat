
import React, { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { format } from "timeago.js";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, ModalConfirm } from "../../../components";
import { IRoom } from "../../../models/IRoom";
import { IUser } from "../../../models/IUser";
import { useNavigate } from "react-router-dom";

import {
  acceptPotentialUser,
  deletePotentialUser,
  deleteUserFromRoom,
  leaveFromRoom,
} from "../../../redux/reducers/room/ActionRoomCreator";
import { useAppDispatch } from "../../../redux/hooks/redux";

import { deleteRoom } from "../../../redux/reducers/rooms/ActionRoomsCreator";
import "./ProfileRooms.css";
type ProfileRoomsType = {
  profileRooms: IRoom[];
  getRoomsOfUserMsg: string;
  getRoomsOfUserError: string;
  user: IUser;
};

const ProfileRooms: FC<ProfileRoomsType> = ({
  profileRooms,
  getRoomsOfUserMsg,
  getRoomsOfUserError,
  user,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDeleteAllowedUserFromRoom = (
    roomId: string,
    deleteUserId: string
  ) => {
    dispatch(deleteUserFromRoom([roomId, deleteUserId]));
  };
  const handleDeleteRoom = (roomId: string) => {
    dispatch(deleteRoom(roomId));
  };

  const handleLeaveFromRoom = (roomId: string) => {
    dispatch(leaveFromRoom(roomId));
  };

  const handleAcceptPotentialUser = (roomId:string,acceptedUserId:string) => {
    dispatch(acceptPotentialUser([roomId,acceptedUserId]))
  };

  const handleDeletePotentialUser = (roomId:string,deleteUserId:string)=>{
    dispatch(deletePotentialUser([roomId,deleteUserId]));
  }

  const handleRefusePotentialUser = () => {};
  return (
    <>
      <div className="profile-rooms__title">Ваши комнаты</div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Название</TableCell>
              <TableCell align="center">Описание</TableCell>
              <TableCell align="center">Тип</TableCell>
              <TableCell align="center">Возрастное ограничение</TableCell>
              <TableCell align="center">Модератор</TableCell>
              <TableCell align="center">Пользователи</TableCell>
              <TableCell align="center">Пользователи на запрос</TableCell>
              <TableCell align="center">Создана</TableCell>
              <TableCell align="center">Изменена</TableCell>
              <TableCell align="center">Открыть</TableCell>
              <TableCell align="center">Выйти или удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profileRooms.map((row, index) => (
              <TableRow
                key={`${row.id}:${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>

                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">{row.ageRestriction}</TableCell>
                <TableCell align="center">
                  {row.moderator === user.id
                    ? user.firstname + " " + user.lastname + "(Вы)"
                    : row.moderator}
                </TableCell>
                <TableCell align="center">
                  <div className="profile-rooms__allowedusers">
                    {row.allowedUsers.map((allowedUser, index) => (
                      <div
                        key={`${allowedUser}:${index}`}
                        className="profile-rooms__alloweduser"
                      >
                        <span>
                          {allowedUser === user.id
                            ? user.firstname + " " + user.lastname + "(Вы)"
                            : allowedUser}{" "}
                        </span>
                        {row.moderator === user.id ? (
                          <div>
                            <ModalConfirm
                              title={`Вы точно хотите удалить пользователя - ${allowedUser}?`}
                              buttonTitle="x"
                              buttonWidth="20px"
                              buttonPadding="1px 10px"
                              onClickFunction={() =>
                                handleDeleteAllowedUserFromRoom(
                                  row.id,
                                  allowedUser
                                )
                              }
                            />{" "}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="profile-rooms__potentialusers">
                    {row.potentialUsers.map((potentialUser, index) => (
                      <div
                        key={`${potentialUser}:${index}`}
                        className="profile-rooms__potentialuser"
                      >
                        <span> {potentialUser}</span>
                        {row.moderator === user.id ? (
                          <div className="profile-rooms__potentialuser__tools">
                            <div>
                              <ModalConfirm
                                title={`Вы точно хотите добавить пользователя - ${potentialUser}?`}
                                buttonTitle="+"
                                buttonWidth="20px"
                                buttonPadding="1px 10px"
                                onClickFunction={() =>
                                  handleAcceptPotentialUser(row.id,potentialUser)
                                }
                              />{" "}
                            </div>
                            <div>
                              <ModalConfirm
                                title={`Вы точно хотите удалить пользователя - ${potentialUser}?`}
                                buttonTitle="x"
                                buttonWidth="20px"
                                buttonPadding="1px 10px"
                                onClickFunction={() =>
                                  handleDeletePotentialUser(row.id,potentialUser)
                                }
                              />{" "}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell align="center">{format(row.createdAt)}</TableCell>
                <TableCell align="center">{format(row.updatedAt)}</TableCell>
                <TableCell align="center">
                  <Button
                    title="Открыть"
                    buttonWidth="80px"
                    buttonPadding="8px 5px"
                    onClickFunction={() => navigate(`/room/${row.id}`)}
                  />
                </TableCell>
                <TableCell align="center">
                  {row.moderator == user.id ? (
                    <ModalConfirm
                      title={`Вы точно хотите удалить комнату - ${row.id}?`}
                      buttonTitle="Удалить"
                      buttonWidth="80px"
                      buttonPadding="8px 5px"
                      onClickFunction={() => handleDeleteRoom(row.id)}
                    />
                  ) : (
                    <ModalConfirm
                      title={`Вы точно хотите выйти из комнаты - ${row.id}?`}
                      buttonTitle="Выйти"
                      buttonWidth="80px"
                      buttonPadding="8px 5px"
                      onClickFunction={() => handleLeaveFromRoom(row.id)}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProfileRooms;
