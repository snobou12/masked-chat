
import React, { FC } from "react";

import { Link, useNavigate } from "react-router-dom";

import logoIconLeft from "../../assets/icons/logo2.png";
import logoIconRight from "../../assets/icons/logo1.png";
import defaultUserImage from "../../assets/img/user_anonym.png";

import "./Header.css";
import { IUser } from "../../models/IUser";

type HeaderPropsType = {
  userData: IUser;
  userIsAuth: boolean;
};

const Header: FC<HeaderPropsType> = ({ userData, userIsAuth }) => {
  const navigate = useNavigate();
  const navItems = [
    { id: 0, title: "Главная", path: "/" },
    { id: 1, title: "Регистрация", path: "/registration" },
    { id: 2, title: "Войти", path: "/login" },
  ];
  const handleClickProfile = () => {
    navigate("/user/profile");
  };
  return (
    <div className="header-wrapper">
      <div onClick={() => navigate("/")} className="header-logo">
        <img src={logoIconLeft} alt="mc_icon" />

        <span>Masked Chat</span>
        <img src={logoIconRight} alt="mc_icon" />
      </div>
      {!userIsAuth ? (
        <div className="header-nav">
          {navItems &&
            navItems.map((nav, index) => (
              <Link
                className="header-nav__item"
                key={`${nav.id}:${index}`}
                to={nav.path}
              >
                {nav.title}
              </Link>
            ))}
        </div>
      ) : (
        <div onClick={handleClickProfile} className="header-user">
          <div className="header-user__firstname">{userData.firstname}</div>
          <div className="header-user__lastname">{userData.lastname}</div>
          <div className="header-user__avatar">
            <img src={defaultUserImage} alt="default_user_logo" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
