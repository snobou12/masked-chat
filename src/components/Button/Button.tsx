
import React, { FC } from "react";

import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";

import "./Button.css";

type ButtonProps = {
  title: string;
  disabled?: boolean;
  inverse?: boolean;
  buttonPadding?:string,
  buttonWidth?:string,

  onClickFunction?: () => void,
};

const Button: FC<ButtonProps> = ({
  title,
  disabled,
  onClickFunction,
  inverse,
  buttonPadding,
  buttonWidth,
  
  
}) => {
  const CustomButtonRoot = styled("button")`
    background-color: ${inverse ? "white" : "#292929"};
    padding:${buttonPadding ? buttonPadding : "10px 40px"};
    min-width:${buttonWidth ? buttonWidth : "145px"};
    border-radius: 100px;
    color: ${inverse ? "black" : "#fff"};
    font-weight: 700;
    font-family: Montserrat, sans-serif;
    font-size: 16px;
    transition: all 200ms ease;
    cursor: pointer;
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
    border: none;

    &:hover {
      background-color: #0059b2;
    }

    &.${buttonUnstyledClasses.active} {
      background-color: #004386;
    }

    &.${buttonUnstyledClasses.focusVisible} {
      box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
        0 0 0 5px rgba(0, 127, 255, 0.5);
      outline: none;
    }

    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
    }
  `;

  function CustomButton(props: any) {
    return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
  }
  return (
    
    <CustomButton
      
      disabled={disabled ? disabled : false}
      onClick={onClickFunction}
    >
      {title}
    </CustomButton>
  );
};

export default Button;
