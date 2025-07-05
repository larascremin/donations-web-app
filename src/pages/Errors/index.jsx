import React from "react";
import "./style.css";
import { ArrowClockwise } from "phosphor-react";
import MOON_SVG from "../../assets/vectors/moon";
import PLUS_SVG from "../../assets/vectors/plus";
import TRIANGLE_SVG from "../../assets/vectors/triangle";
import HALF_MOON_SGV from "../../assets/vectors/half-moon";
import HEART_SVG from "../../assets/vectors/heart";
import POLYGON_SVG from "../../assets/vectors/polygon";
import STAR_SVG from "../../assets/vectors/start";

function Errors({ errorMessage }) {
  return (
    <div className="error-page">
      <MOON_SVG color={"var(--l-yellow)"} className="error-v01" />
      <div className="error-content">
        <h1>Ooops!</h1>
        <p>
          Parece que houve um problema, <br />
          {errorMessage}
        </p>
        <button className="std-button">
          RECARREGAR <ArrowClockwise size={22} color="#faf4e5" weight="bold" />
        </button>
      </div>
      <div className="error-vectors">
        <PLUS_SVG color={"var(--l-blue)"} className="error-v02" />
        <HALF_MOON_SGV color={"var(--green)"} className="error-v04" />
        <POLYGON_SVG color={"var(--yellow)"} className="error-v06" />
        <HEART_SVG color={"var(--l-pink)"} className="error-v05" />
        <TRIANGLE_SVG color={"var(--l-green)"} className="error-v03" />
        <STAR_SVG color={"var(--l-blue)"} className="error-v07" />
      </div>
    </div>
  );
}

export default Errors;
