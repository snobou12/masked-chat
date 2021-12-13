
import React, { FC } from "react";

import Loader from "react-loader-spinner";

import "./Spinner.css";

const Spinner: FC = () => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner-app">
        <Loader type="RevolvingDot" color="#ffffff" height={200} width={200} />
      </div>
    </div>
  );
};

export default Spinner;
