import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./style.css";
import PopUp from "../../components/PopUp";
import logo from "../../assets/images/colored-logo.svg";
import StandardInput from "../../components/Standard Input";
import PasswordInput from "../../components/Password Input";
import HALF_MOON_SGV from "../../assets/vectors/half-moon";
import TRIANGLE_SVG from "../../assets/vectors/triangle";
import { Circle } from "phosphor-react";
import CIRCLE_SVG from "../../assets/vectors/plus";

function Login() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      {isMobile ? (
        <div className="flex-col login-mbl">
          <div className="login-vectors">
            <HALF_MOON_SGV
              width={92}
              height={48}
              color="var(--green)"
              className="login-v01"
            />
            <div className="vectors-wrap">
              <TRIANGLE_SVG
                width={76}
                height={64}
                color="var(--l-blue)"
                className="login-v02"
              />
              <CIRCLE_SVG
                width={75}
                height={72}
                color="var(--l-yellow)"
                className="login-v03"
              />
            </div>
          </div>
          <PopUp>
            <form className="flex-col login-form ">
              <div className="flex-col centralized">
                <img src={logo} className="resized-logo" />
                <h4>Bem vindo(a) de volta!</h4>
              </div>
              <div className="login-input-wrap">
                <StandardInput
                  label={"Insira seu e-mail"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                />
                <PasswordInput
                  label={"Insira sua senha"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <a className="reset-link">Esqueceu sua senha?</a>
              </div>
              <div className="flex-col login-button-wrap">
                <button type="submit" className="std-button">
                  ENTRAR
                </button>
                <h6>
                  Não possui uma conta? <a>Cadastre-se Aqui</a>
                </h6>
              </div>
            </form>
          </PopUp>
        </div>
      ) : (
        <p>desktop</p>
      )}
    </>
  );
}

export default Login;
