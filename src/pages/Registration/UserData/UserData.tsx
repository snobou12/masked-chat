
import React, { FC } from "react";

import { Button } from "../../../components";

import { pink } from "@mui/material/colors";
import Radio from "@mui/material/Radio";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux";
import { registrationSlice } from "../../../redux/reducers/registration/registrationSlice";

import "./UserData.css";
import { checkUniqueEmail } from "../../../redux/reducers/registration/ActionRegCreator";

const rgEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
var rgNumber = /^\d+$/;
const rgChars = /^([а-яё]+|[a-z]+)$/i;

type UserDataTypes = {
  handlePrevBlock: () => void;
};

const UserData: FC<UserDataTypes> = ({ handlePrevBlock }) => {
  const dispatch = useAppDispatch();
  const {
    handleChangeFormFirstname,
    handleChangeFormAge,
    handleChangeFormRepassword,
    handleChangeFormPassword,
    handleChangeFormLastname,
    handleChangeFormGender,
    handleChangeFormEmail,
    handleSetEmptyUniqueEmailMsg,
  } = registrationSlice.actions;

  const {
    form_firstname,
    form_lastname,
    form_email,
    form_age,
    form_password,
    form_repassword,
    form_gender,
    uniqueEmailError,
    isLoadingRegistration
  } = useAppSelector((state) => state.registrationSlice);

  const [selectedGender, setSelectedGender] =
    React.useState<string>(form_gender);

  const handleChangeSelectedGender = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(handleChangeFormGender(event.target.value));
    setSelectedGender(event.target.value);
  };

  const handleChangeForm = (
    event: React.ChangeEvent<HTMLInputElement>,
    formCase: string
  ) => {
    switch (formCase) {
      case "firstname":
        dispatch(handleChangeFormFirstname(event.target.value));
        break;
      case "lastname":
        dispatch(handleChangeFormLastname(event.target.value));
        break;
      case "email":
        dispatch(handleChangeFormEmail(event.target.value));
        break;
      case "age":
        dispatch(handleChangeFormAge(event.target.value));
        break;
      case "password":
        dispatch(handleChangeFormPassword(event.target.value));
        break;
      case "repassword":
        dispatch(handleChangeFormRepassword(event.target.value));
        break;
      default:
        break;
    }
  };

  const controlProps = (item: string) => ({
    checked: selectedGender === item,
    onChange: handleChangeSelectedGender,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const [error, setError] = React.useState<string>("");

  const handleProtoNextBlock = () => {
    if (!rgChars.exec(form_firstname)) {
      setError("Неправильно написано имя");
      setTimeout(() => {
        setError("");
      }, 3000);
      return null;
    }

    if (form_firstname.length < 4 || form_firstname.length > 12) {
      setError("Имя должно быть не менее 4 и не более 12 букв");
      setTimeout(() => {
        setError("");
      }, 3000);
      return null;
    }

    if (!rgChars.exec(form_lastname)) {
      setError("Неправильно написана фамилия");
      setTimeout(() => {
        setError("");
      }, 3000);
      return null;
    }

    if (form_lastname.length < 4 || form_lastname.length > 12) {
      setError("Фамилия должна быть не менее 4 и не более 12 букв");
      setTimeout(() => {
        setError("");
      }, 3000);
      return null;
    }

    if (!rgEmail.exec(form_email)) {
      setError("Неправильный ввод электронной почты");
      setTimeout(() => {
        setError("");
      }, 3000);
      return null;
    }

    if (!rgNumber.exec(form_age) || form_age.length !== 2) {
      setError("Возраст должен состоять только из двухзначного числа");
      setTimeout(() => {
        setError("");
      }, 3000);
      return null;
    }

    if (Number(form_age) < 18) {
      setError("Только от 18 лет");
      setTimeout(() => {
        setError("");
      }, 3000);
      return null;
    }

    if (form_password.length < 8 || form_password.length > 16) {
      setError("Пароль должен быть не менее 8 и не более 16 знаков");
      setTimeout(() => {
        setError("");
      }, 3000);
      return null;
    }

    if (form_password !== form_repassword) {
      setError("Пароль не совпадают");
      setTimeout(() => {
        setError("");
      }, 3000);
      return null;
    }

    dispatch(checkUniqueEmail(form_email));
    setTimeout(() => {
      dispatch(handleSetEmptyUniqueEmailMsg());
    }, 2000);
  };
  return (
    <div className="userdata-wrapper">
      <div className="userdata-block">
        <div className="userdata-title">Заполните данные о себе</div>
        <div className="userdata-selection__row">
          <div className="userdata-selection">
            <div className="userdata-firstname__title">Имя</div>
            <div className="userdata-firstname__input">
              <input
                type="text"
                value={form_firstname}
                onChange={(e) => handleChangeForm(e, "firstname")}
                placeholder="Имя"
              />
            </div>
          </div>

          <div className="userdata-selection">
            <div className="userdata-lastname__title">Фамилия</div>
            <div className="userdata-lastname__input">
              <input
                type="text"
                value={form_lastname}
                onChange={(e) => handleChangeForm(e, "lastname")}
                placeholder="Фамилия"
              />
            </div>
          </div>
        </div>
        <div className="userdata-selection__row">
          <div className="userdata-selection">
            <div className="userdata-email__title">Почта</div>
            <div className="userdata-email__input">
              <input
                type="text"
                onChange={(e) => handleChangeForm(e, "email")}
                value={form_email}
                placeholder="Почта"
              />
            </div>
          </div>

          <div className="userdata-selection">
            <div className="userdata-age__title">Возраст</div>
            <div className="userdata-age__input">
              <input
                type="number"
                value={form_age}
                onChange={(e) => handleChangeForm(e, "age")}
                placeholder="Возраст"
              />
            </div>
          </div>
        </div>

        <div className="userdata-selection__row">
          <div className="userdata-selection">
            <div className="userdata-password__title">Пароль</div>
            <div className="userdata-password__input">
              <input
                type="password"
                value={form_password}
                onChange={(e) => handleChangeForm(e, "password")}
                placeholder="Пароль"
              />
            </div>
          </div>

          <div className="userdata-selection">
            <div className="userdata-repassword__title">Еще раз пароль</div>
            <div className="userdata-repassword__input">
              <input
                type="password"
                value={form_repassword}
                placeholder="Еще раз пароль"
                onChange={(e) => handleChangeForm(e, "repassword")}
              />
            </div>
          </div>
        </div>

        <div className="userdata-selection">
          <div className="userdata-gender__title">Пол</div>
          <div className="userdata-gender__checkbox">
            <div className="userdata-gender-item">
              <Radio
                {...controlProps("male")}
                size="small"
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                }}
              />
              <span>Мужской</span>
            </div>
            <div className="userdata-gender-item">
              <Radio
                {...controlProps("female")}
                size="small"
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                }}
              />
              <span>Женский</span>
            </div>
            <div className="userdata-gender-item">
              <Radio
                {...controlProps("another")}
                size="small"
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                }}
              />
              <span>Другое</span>
            </div>
          </div>
        </div>

        <div className="userdata-tools">
          <Button disabled={isLoadingRegistration} onClickFunction={handlePrevBlock} title="Назад" />
          <Button disabled={isLoadingRegistration} onClickFunction={handleProtoNextBlock} title="Дальше" />
        </div>

        <div className="userdata-error">
          {error ? error : ""}
          {uniqueEmailError ? uniqueEmailError : ""}
        </div>
      </div>
    </div>
  );
};

export default UserData;
