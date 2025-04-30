import React from "react";
import "./style.css";
import HEART_SVG from "../../assets/vectors/heart";
import HALF_MOON_SGV from "../../assets/vectors/half-moon";
import PLUS_SVG from "../../assets/vectors/plus";
import TRIANGLE_SVG from "../../assets/vectors/triangle";

function DesktopLogin({ children }) {
  return (
    <div className="login-dsk">
      <div className="flex-col login-left">
        <p className="decoration-text">
          “A transformação social
          <br /> começa com um gesto:
          <br /> o de <span>doar</span>.”
        </p>
        <div className="sob-overflow login-vectors">
          <div className="sob-overflow vectors-wrap">
            <TRIANGLE_SVG color="var(--l-blue)" className="login-v02" />
            <PLUS_SVG color="var(--l-yellow)" className="login-v03" />
          </div>
          <div className="sob-overflow vectors-wrap">
            <HEART_SVG color="var(--l-pink)" className="login-v04" />
            <HALF_MOON_SGV color="var(--green)" className="login-v01" />
          </div>
        </div>
      </div>
      <div className="login-right">{children}</div>
    </div>
  );
}

export default DesktopLogin;
