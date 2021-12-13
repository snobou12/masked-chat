
import React, { FC } from "react";

import userDefaultImage from "../../../assets/img/user_anonym.png";
import { Button, ModalConfirm } from "../../../components";
import { IUser } from "../../../models/IUser";
import { logout } from "../../../redux/reducers/user/ActionUserCreator";
import { useAppDispatch } from "../../../redux/hooks/redux";

import "./ProfileInfo.css";

type ProfileInfoPropsType = {
  user: IUser;
};

const ProfileInfo: FC<ProfileInfoPropsType> = ({ user }) => {
  const dispatch = useAppDispatch();

  const handleClickLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="profile-info">
      <div className="profile-info__title">Ваш профиль (ДОДЕЛАТЬ ВСЕ *)</div>

      <div className="profile-info__item">
        <span>Аватарка</span>
        <img src={userDefaultImage} alt="user_avatar" />
        <Button
          inverse
          buttonPadding="1px 5px"
          buttonWidth="100px"
          title="Изменить"
        />
      </div>
      <div className="profile-info__item">
        <span>Имя</span>
        <input placeholder={user.firstname} />
        <div>
          <ModalConfirm
            title={`Вы действительно хотите изменить ${
              user.firstname
            } на ${"test"} `}
            onClickFunction={() => console.log("test")}
            buttonTitle="Изменить"
            buttonPadding="1px 5px"
            buttonWidth="100px"
          />
        </div>
      </div>
      <div className="profile-info__item">
        <span>Фамилия</span>
        <input placeholder={user.lastname} />
        <div>
          <ModalConfirm
            title={`Вы действительно хотите изменить ${
              user.lastname
            } на ${"test"} `}
            onClickFunction={() => console.log("test")}
            buttonTitle="Изменить"
            buttonPadding="1px 5px"
            buttonWidth="100px"
          />
        </div>
      </div>

      <div className="profile-info__item">
        <span>Возраст</span>
        <input placeholder={user.age} />
        <div>
          <ModalConfirm
            title={`Вы действительно хотите изменить ${user.age} на ${"test"} `}
            onClickFunction={() => console.log("test")}
            buttonTitle="Изменить"
            buttonPadding="1px 5px"
            buttonWidth="100px"
          />
        </div>
      </div>

      <div className="profile-info__item">
        <span>Пароль</span>
        <input placeholder="Старый пароль" />
        <input placeholder="Новый пароль" />
        <div>
          <ModalConfirm
            title={`Вы действительно хотите изменить пароль на новый?`}
            onClickFunction={() => console.log("test")}
            buttonTitle="Изменить"
            buttonPadding="1px 5px"
            buttonWidth="100px"
          />
        </div>
      </div>

      <div className="profile-info__item">
        <span>Активировать аккаунт</span>
        <div>
          <Button
            title="Выслать ссылку на почту"
            inverse
            buttonPadding="1px 5px"
            buttonWidth="100px"
          />
        </div>
      </div>

      <div className="profile-info__item">
        <span>Удалить аккаунт</span>
        <div>
          <ModalConfirm
            title={`Вы действительно хотите удалить аккаунт?`}
            onClickFunction={() => console.log("test")}
            buttonTitle="Удалить"
            buttonPadding="1px 5px"
            buttonWidth="100px"
          />
        </div>
      </div>

      <div className="profile-info__item">
        <ModalConfirm
          title={`Вы действительно хотите выйти из системы?`}
          onClickFunction={handleClickLogout}
          buttonTitle="Выйти из системы"
          buttonPadding="5px 10px"
          buttonWidth="100px"
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
