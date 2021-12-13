
import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoomInfo } from ".";
import { Button } from "../../components";

import userAnonymImage from "../../assets/img/user_anonym.png";
import moderatorAnonymImage from "../../assets/img/default_anonym_image.jpg";

import socket from "../../utils/socket";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";

import { getRoomData } from "../../redux/reducers/room/ActionRoomCreator";

import { chatSlice } from "../../redux/reducers/chat/chatSlice";
import { IChat } from "../../models/IChat";

import "./Room.css";


type paramsType = {
  roomId: string;
};

const Room: FC = () => {
  const { roomId } = useParams() as paramsType;
  const { user } = useAppSelector((state) => state.userSlice);
  const { handleUpdateChat } = chatSlice.actions;
  const { chat } = useAppSelector((state) => state.chatSlice);
  const { currentRoom } = useAppSelector((state) => state.roomSlice);

  const messagesRef = React.useRef<any>();

  const navigate = useNavigate();

  const { currentRoomError, roomInfoVisibility } = useAppSelector(
    (state) => state.roomSlice
  );
  const dispatch = useAppDispatch();
  const [message, setMessage] = React.useState<string>("");

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = () => {
    if (message.length > 0) {
      socket.emit("CLIENT@ROOM:NEW_MESSAGE", {
        roomId,
        message,
      });
      setMessage("");

      socket.on("SERVER@ROOM:NEW_MESSAGE", (response:{chat:IChat}) => {
        console.log(response);
        const responseChat: IChat = response.chat;
        dispatch(handleUpdateChat(responseChat));
      });
    }
  };

  const handleKeyDown =(e: React.KeyboardEvent<HTMLDivElement>)=>{
     if(e.key === "Enter"){
      handleSendMessage();
     }
    
  }

  React.useEffect(() => {
    dispatch(getRoomData(roomId));

    socket.emit("CLIENT@ROOM:JOIN", {
      roomId,
      userId: user.id,
    });
    socket.on("SERVER@ROOM:JOIN", (response:{chat:IChat}) => {
      const responseChat: IChat = response.chat;
      dispatch(handleUpdateChat(responseChat));
    });
    if (messagesRef.current) {
      messagesRef.current.scrollTo(0, 99999);
    }
  }, [chat.messages.length]);

  return (
    <div  onKeyDown={handleKeyDown} tabIndex={1} className="room-wrapper">
      {currentRoomError ? (
        <div className="room-error">
          <div className="room-error__title">{currentRoomError}</div>
          <div className="room-error__tools">
            <Button
              onClickFunction={() => navigate("/")}
              title="Вернуться на главную"
            />
          </div>
          <div></div>
        </div>
      ) : (
        <div  className="room-selection">
          <RoomInfo roomId={roomId} />
          <div
            className={
              roomInfoVisibility ? "room-chat__shrink" : "room-chat__full"
            }
          >
            <div ref={messagesRef} className="room-chat__messages">
              {chat.messages.map((messageItem, index) => (
                <div
                  key={`${messageItem._id}:${index}`}
                  className={
                    messageItem.userSenderId === user.id
                      ?    "room-chat__message__yourself"
                      : "room-chat__message__another"
                  }
                >
                  <div className="chat-message__top">
                    <div className="chat-message__avatar">
                      <img
                        src={
                          messageItem.userSenderId === currentRoom.moderator
                            ? moderatorAnonymImage
                            : userAnonymImage
                        }
                        alt="chat_anonym_icon"
                      />
                    </div>
                    <div
                      className={
                        messageItem.userSenderId === user.id
                          ? "chat-message__msg-yourself"
                          : "chat-message__msg-another"
                      }
                    >
                      {messageItem.message}
                    </div>
                  </div>
                  <div className="chat-message__bottom">
                  <div className="chat-message__userid">
                      {messageItem.userSenderId}
                    </div>
                    <div className="chat-message__date">
                      
                      {messageItem.createdAt.slice(11, 17)}
                      
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
            <div  className="room-chat__input">
              <input
                value={message}
                onChange={handleChangeMessage}
                placeholder="Введите сообщение"
              />
              <Button
               
                onClickFunction={handleSendMessage}
                inverse
                title="Отправить"
                buttonPadding="8px 10px"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
