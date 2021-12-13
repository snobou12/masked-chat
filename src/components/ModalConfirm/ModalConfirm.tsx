
import React, { FC } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import "./ModalConfirm.css";
import Button from "../Button/Button";

const style: any = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  borderRadius: "40px",
  bgcolor: "#292929",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  p: 4,
};

type ModalConfirmPropsType = {
  onClickFunction: () => void;
  title: string;
  inverse?: boolean;
  buttonTitle: string;
  buttonPadding?: string;
  buttonWidth?: string;
};

const ModalConfirm: FC<ModalConfirmPropsType> = ({
  onClickFunction,
  title,
  buttonTitle,
  buttonWidth,
  buttonPadding,
  inverse,
}) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickDeny = () => {
    setOpenModal(false);
  };

  const handleClickConfirm = () => {
    setOpenModal(false);
    onClickFunction();
  };

  return (
    <div>
      <Button
        onClickFunction={handleOpenModal}
        inverse={inverse ? inverse : false}
        title={buttonTitle}
        buttonWidth={buttonWidth ? buttonWidth : ""}
        buttonPadding={buttonPadding ? buttonPadding : ""}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <div className="modalconfirm-title">{title}</div>
            <div className="modalconfirm-tools">
              <div>
                <Button onClickFunction={handleClickDeny} inverse title="Нет" />
              </div>
              <div>
                <Button
                  onClickFunction={handleClickConfirm}
                  inverse
                  title="Да"
                />
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalConfirm;
