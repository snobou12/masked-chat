
import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { ConfirmPhone, Hello, Phone, Submit, UserData } from ".";

import { registrationSlice } from "../../redux/reducers/registration/registrationSlice";
import "./Registration.css";
const Registration: FC = () => {
  const dispatch = useAppDispatch();

  const { activityBlock } = useAppSelector((state) => state.registrationSlice);

  const { handlePrevBlock, handleNextBlock } = registrationSlice.actions;

  const handleClickPrevBlock = () => {
    dispatch(handlePrevBlock());
  };
  const handleClickNextBlock = () => {
    dispatch(handleNextBlock());
  };

  const activeBlockFunc = (activityBlock: number) => {
    switch (activityBlock) {
      case 0:
        return <Hello handleNextBlock={handleClickNextBlock} />;
      case 1:
        return <UserData handlePrevBlock={handleClickPrevBlock} />;
      case 2:
        return (
          <Phone
            handleNextBlock={handleClickNextBlock}
            handlePrevBlock={handleClickPrevBlock}
          />
        );
      case 3:
        return <ConfirmPhone handlePrevBlock={handleClickPrevBlock} />;
      case 4:
        return <Submit handlePrevBlock={handleClickPrevBlock} />;
      default:
        return "Ошибка";
    }
  };

  return (
    <div className="registration-wrapper">{activeBlockFunc(activityBlock)}</div>
  );
};

export default Registration;
