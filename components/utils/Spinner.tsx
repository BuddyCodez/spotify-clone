import React from "react";
import "./spinner.css";
const Spinner = () => {
  return (
    <div className="spinner w-15 h-15">
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Spinner;
