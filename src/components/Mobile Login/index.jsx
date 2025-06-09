import React from "react";
import "./style.css";
import PLUS_SVG from "../../assets/vectors/plus";
import TRIANGLE_SVG from "../../assets/vectors/triangle";
import HALF_MOON_SGV from "../../assets/vectors/half-moon";
import PopUp from "../PopUp";

function MobileLogin({ children, height }) {
  return (
    <div className="flex-col login-mbl">
      <div className="sob-overflow login-vectors">
        <HALF_MOON_SGV color="var(--green)" className="login-v01" />
        <div className="vectors-wrap">
          <TRIANGLE_SVG color="var(--l-blue)" className="login-v02" />
          <PLUS_SVG color="var(--l-yellow)" className="login-v03" />
        </div>
      </div>
      <PopUp height={height}>{children}</PopUp>
    </div>
  );
}

export default MobileLogin;
