
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import anonymImg from "../../assets/img/anonym_img.png";
import { Button } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { login } from "../../redux/reducers/user/ActionUserCreator";

import "./Login.css";

const rgEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loginErrorMsg, isLoadingUser } = useAppSelector(
    (state) => state.userSlice
  );

  const [email, setEmail] = React.useState<string>("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = React.useState<string>("");

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const [error, setError] = React.useState<string>("");

  const handleSubmit = () => {
    if (!rgEmail.exec(email)) {
      setError("Неправильный ввод электронной почты");
      setTimeout(() => {
        setError("");
      }, 3000);
      return null;
    }
    if (password.length < 8 || password.length > 16) {
      setError("Пароль должен быть не менее 8 и не более 16 знаков");
      setTimeout(() => {
        setError("");
      }, 3000);
      return null;
    }

    dispatch(login([email, password]));
  };

  const handleClickForgot = () => {
    navigate("/forgot");
  };

  return (
    <div className="login-wrapper">
      <div className="login-block">
        <div className="login-title">
          Войдите в систему, чтобы начать разговор
        </div>
        <div className="login-img">
          <img src={anonymImg} alt="login_img" />
        </div>
        <div className="login-selection__row">
          <div className="login-selection">
            <div className="login-selection__title">Электронная почта</div>
            <div className="login-selection__input">
              <input
                value={email}
                onChange={handleChangeEmail}
                placeholder="Почта"
                type="text"
              />
            </div>
          </div>

          <div className="login-selection">
            <div className="login-selection__title">Пароль</div>
            <div className="login-selection__input">
              <input
                value={password}
                onChange={handleChangePassword}
                placeholder="Пароль"
                type="password"
              />
            </div>
          </div>
        </div>
        <div className="login-tools">
          <div className="login-tools__forgot login-tools__button">
            <Button onClickFunction={handleClickForgot} title="Забыли пароль" />
          </div>
          <div className="login-tools__login login-tools__button">
            <Button onClickFunction={handleSubmit} title="Войти" />
          </div>
        </div>
        <div className="login-error">
          {error ? error : ""} {loginErrorMsg ? loginErrorMsg : ""}
        </div>
      </div>
    </div>
  );
};

export default Login;
