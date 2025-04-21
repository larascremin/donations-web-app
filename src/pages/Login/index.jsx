import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./style.css";
import PopUp from "../../components/PopUp";
import logo from "../../assets/images/colored-logo.svg";
import StandardInput from "../../components/Standard Input";
import PasswordInput from "../../components/Password Input";

function Login() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      {isMobile ? (
        <div className="login-mbl">
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
