
import React, { FC } from "react";

import { Button } from "../../components";

import { useNavigate } from "react-router-dom";
import { GiPerspectiveDiceSixFacesRandom, GiDoor } from "react-icons/gi";
import { BsFillFilePlusFill } from "react-icons/bs";

import "./Home.css";
type HomePropsType = {
  userIsAuth: boolean;
};
const Home: FC<HomePropsType> = ({ userIsAuth }) => {
  let navigate = useNavigate();
  const userHomeBlocks = [
    {
      id: 0,
      title: "Найти случайную комнату",
      classname: "userhome-block__first",
      image: <GiPerspectiveDiceSixFacesRandom size="80" />,
      description: "Найти случайную комнату",
      buttonTitle: "Найти",
      clickFunction: function () {
        navigate("/room/random");
      },
    },
    {
      id: 1,
      title: "Посмотреть все комнаты",
      classname: "userhome-block__second",
      image: <GiDoor size="80" />,
      description: "Посмотреть все комнаты по заданному вами фильтру ",
      buttonTitle: "Посмотреть",
      clickFunction: function () {
        navigate("/room/all");
      },
    },
    {
      id: 2,
      title: "Создать комнату",
      classname: "userhome-block__third",
      image: <BsFillFilePlusFill size="80" />,
      description: "Создать собственную комнату",
      buttonTitle: "Создать",
      clickFunction: function () {
        navigate("/room/create");
      },
    },
  ];
  return (
    <>
      {!userIsAuth ? (
        <div className="home-wrapper">
          <div className="home-selection">
            <div className="home-selection__title">
              <span>Masked</span>
              <span>Chat</span>
              <span>Messaging</span>
            </div>
            <div className="home-selection__description">
              Новый анонимный чат с комнатами. Вы не узнаете кто скрывается за
              собеседниками, пока все не откроетесь друг другу!
            </div>
            <div className="home-selection__button">
              <Button
                onClickFunction={() => navigate(`/registration`)}
                title={"Начать"}
              />
            </div>
          </div>
          <div className="home-image__selection"></div>
        </div>
      ) : (
        <div className="userhome-wrapper">
          {userHomeBlocks &&
            userHomeBlocks.map((block, index) => (
              <div
                key={`${block.id}:${index}`}
                className={`userhome-block ${block.classname}`}
              >
                <div className="userhome-block__title">{block.title}</div>
                <div className="userhome-block__img">{block.image}</div>
                <div className="userhome-block__description">
                  {block.description}
                </div>
                <div className="userhome-block__button">
                  <Button
                    inverse
                    onClickFunction={block.clickFunction}
                    title={block.buttonTitle}
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Home;
