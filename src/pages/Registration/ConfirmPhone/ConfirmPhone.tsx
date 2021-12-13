
import React, { FC } from "react";

import { Button } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux";
import { registrationSlice } from "../../../redux/reducers/registration/registrationSlice";

import confirmphoneImg from "../../../assets/img/confirmphone_img.png";

import "./ConfirmPhone.css";
import { checkActivationCode } from "../../../redux/reducers/registration/ActionRegCreator";

var rgNumber = /^\d+$/;

type ConfirmPhoneTypes = {
  handlePrevBlock: () => void;
};
const ConfirmPhone: FC<ConfirmPhoneTypes> = ({ handlePrevBlock }) => {
  const dispatch = useAppDispatch();
  const { handleChangeFormActivationCode } = registrationSlice.actions;
  const { form_phone, form_activation_code, checkActivationCodeError,isLoadingRegistration } =
    useAppSelector((state) => state.registrationSlice,);
  const { handleSetEmptyCheckActivationCodeError } = registrationSlice.actions;

  const [error, setError] = React.useState<string>("");

  const errorValid: boolean = form_activation_code.some(
    (v) => !v || form_activation_code.length < 4
  );

  const handleChangeCodes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const indexId = Number(e.target.getAttribute("id")) - 1;
    const value = e.target.value;
    const newArr = [...form_activation_code] as string[];
    newArr[indexId] = value;
    dispatch(handleChangeFormActivationCode(newArr));
    if (e.target.nextSibling) {
      (e.target.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleProtoNextBlock = () => {
    if (
      errorValid ||
      !rgNumber.exec(form_activation_code[0]) ||
      !rgNumber.exec(form_activation_code[1]) ||
      !rgNumber.exec(form_activation_code[2]) ||
      !rgNumber.exec(form_activation_code[3])
    ) {
      setError("Код должен состоять из 4 цифр");
      setTimeout(() => {
        setError("");
      }, 3000);
      return null;
    }
    const codeInString: string =
      form_activation_code[0] +
      form_activation_code[1] +
      form_activation_code[2] +
      form_activation_code[3];

    dispatch(checkActivationCode([form_phone.value, codeInString]));
    setTimeout(() => {
      dispatch(handleSetEmptyCheckActivationCodeError());
    }, 2000);
  };
  return (
    <div className="confirmphone-wrapper">
      <div className="confirmphone-block">
        <div className="confirmphone-title">Введите код активации</div>
        <div className="confirmphone-img">
          <img src={confirmphoneImg} alt="confirmphone_img" />
        </div>
        <div className="confirmphone-inputs">
          <input
            className="first-activation-input activation-input"
            id="1"
            type="tel"
            placeholder=""
            value={form_activation_code[0]}
            maxLength={1}
            onChange={handleChangeCodes}
          />
          <input
            className="second-activation-input activation-input"
            id="2"
            type="tel"
            placeholder=""
            value={form_activation_code[1]}
            maxLength={1}
            onChange={handleChangeCodes}
          />
          <input
            className="third-activation-input activation-input"
            id="3"
            type="tel"
            placeholder=""
            value={form_activation_code[2]}
            maxLength={1}
            onChange={handleChangeCodes}
          />
          <input
            className="fouth-activation-input activation-input"
            id="4"
            type="tel"
            placeholder=""
            value={form_activation_code[3]}
            maxLength={1}
            onChange={handleChangeCodes}
          />
        </div>
        <div className="confirmphone-description">
          Код был успешно выслан на ваш телефон
        </div>
        <div className="confirmphone-tools">
          <Button disabled={isLoadingRegistration} onClickFunction={handlePrevBlock} title="Назад" />
          <Button disabled={isLoadingRegistration} onClickFunction={handleProtoNextBlock} title="Дальше" />
        </div>
        <div className="confirmphone-error">
          {error ? error : ""}{" "}
          {checkActivationCodeError ? checkActivationCodeError : ""}
        </div>
      </div>
    </div>
  );
};

export default ConfirmPhone;
