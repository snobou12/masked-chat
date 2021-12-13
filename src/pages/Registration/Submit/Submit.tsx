
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux";
import { registration } from "../../../redux/reducers/registration/ActionRegCreator";

import "./Submit.css";

type SubmitTypes = {
  handlePrevBlock: () => void;
};

const Submit: FC<SubmitTypes> = ({ handlePrevBlock }) => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    form_firstname,
    form_lastname,
    form_email,
    form_age,
    form_gender,
    form_phone,
    form_password,
    registrationMsg,
    registrationError,
    isLoadingRegistration
  } = useAppSelector((state) => state.registrationSlice);

  const handleClickSubmit = () => {
    dispatch(
      registration([
        form_email,
        form_password,
        form_firstname,
        form_lastname,
        form_age,
        form_gender,
        form_phone.value,
      ])
    );
  };

  const handleGotoLogin = () => {
    navigate("/login");
  };

  return (
    <div className="submit-wrapper">
      <div className="submit-block">
        <div className="submit-title">Ваши данные</div>
        <div className="submit-data">
          <div className="submit-data__item">
            Имя:<span>{form_firstname}</span>
          </div>
          <div className="submit-data__item">
            Фамилия:<span>{form_lastname}</span>
          </div>
          <div className="submit-data__item">
            Почта:<span>{form_email}</span>
          </div>
          <div className="submit-data__item">
            Возраст:<span>{form_age}</span>
          </div>
          <div className="submit-data__item">
            Пол:
            <span>
              {form_gender === "male"
                ? "Мужчина"
                : form_gender === "female"
                ? "Женщина"
                : "Другое"}
            </span>
          </div>
          <div className="submit-data__item">
            Номер телефона:<span>{form_phone.formattedValue}</span>
          </div>
        </div>
        {registrationMsg !== "Вы успешно зарегистрированы" ? (
          <div className="submit-tools">
            <Button disabled={isLoadingRegistration} onClickFunction={handlePrevBlock} title="Назад" />
            <Button disabled={isLoadingRegistration} onClickFunction={handleClickSubmit} title="Верно" />
          </div>
        ) : (
          <div className="submit-tools">
            <Button disabled={isLoadingRegistration} onClickFunction={handleGotoLogin} title="Войти" />{" "}
          </div>
        )}

        <div className="submit-error">
          {registrationError ? registrationError : ""}
        </div>
        <div className="submit-success">
          {registrationMsg ? registrationMsg : ""}
        </div>
      </div>
    </div>
  );
};

export default Submit;
