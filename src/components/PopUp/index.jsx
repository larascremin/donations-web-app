import React from "react";
import "./style.css";

function PopUp({ children, height }) {
  return (
    <div className="popup" style={{ height: height }}>
      {children}
    </div>
  );
}

export default PopUp;
