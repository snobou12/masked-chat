
import React, { FC } from "react";
import NumberFormat from "react-number-format";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux";
import { registrationSlice } from "../../../redux/reducers/registration/registrationSlice";

import phoneimg from "../../../assets/img/phone_img.png";

import { Button } from "../../../components";

import "./Phone.css";
import { checkUniquePhone } from "../../../redux/reducers/registration/ActionRegCreator";

type UserDataTypes = {
  handlePrevBlock: () => void;
  handleNextBlock: () => void;
};

const Phone: FC<UserDataTypes> = ({ handlePrevBlock, handleNextBlock }) => {
  const dispatch = useAppDispatch();
  const { form_phone, uniquePhoneError, isLoadingRegistration} = useAppSelector(
    (state) => state.registrationSlice
  );
  const { handleChangeFormPhone, handleSetEmptyUniquePhoneMsg } =
    registrationSlice.actions;
  const errorValid: boolean =
    !form_phone.formattedValue || form_phone.formattedValue.includes("_");
  const [error, setError] = React.useState<string>("");

  const handleProtoNextBlock = () => {
    if (errorValid) {
      setError("Неправильный ввод номера телефона");
      setTimeout(() => {
        setError("");
      }, 3000);
      return null;
    }

    dispatch(checkUniquePhone(form_phone.value));

    setTimeout(() => {
      dispatch(handleSetEmptyUniquePhoneMsg());
    }, 2000);
  };
  return (
    <div className="phone-wrapper">
      <div className="phone-block">
        <div className="phone-title">
          <span> Введите ваш номер телефона</span>
          <div className="phone-img">
            <img src={phoneimg} alt="phone_img" />
          </div>
          <span>Мы отправим код подтверждения на него</span>
        </div>

        <div className="phone-input">
          <NumberFormat
            className="field"
            format="+# (###) ###-##-##"
            mask="_"
            placeholder="+7 (999) 999-99-99"
            value={form_phone.value}
            onValueChange={({ formattedValue, value }) =>
              dispatch(handleChangeFormPhone({ formattedValue, value }))
            }
          />
        </div>
        <div className="phone-tools">
          <Button disabled={isLoadingRegistration} onClickFunction={handlePrevBlock} title="Назад" />
          <Button disabled={isLoadingRegistration} onClickFunction={handleProtoNextBlock} title="Дальше" />
        </div>
        <div className="phone-error">
          {error ? error : ""}
          {uniquePhoneError ? uniquePhoneError : ""}
        </div>
      </div>
    </div>
  );
};

export default Phone;
