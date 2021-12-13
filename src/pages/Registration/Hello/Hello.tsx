
import React, { FC } from "react";
import { Button } from "../../../components";
import anonymImg from "../../../assets/img/anonym_img.png";
import "./Hello.css";

type HelloProps = {
  handleNextBlock: () => void;
};
const Hello: FC<HelloProps> = ({ handleNextBlock }) => {
  return (
    <div className="hello-wrapper">
      <div className="hello-block">
        <div className="hello-title">
          Добро пожаловать в <span> Masked Chart</span>!
        </div>
        <div className="hello-img">
          <img src={anonymImg} alt="anonym_img" />
        </div>
        <div className="hello-description">
          С <span> Masked Chart </span>вы получите быстрый, простой и безопасный
          опыт обмена сообщениями с анонимным собеседником.
        </div>
        <div className="hello-tools">
          <Button onClickFunction={handleNextBlock} title="Дальше" />
        </div>
      </div>
    </div>
  );
};

export default Hello;
