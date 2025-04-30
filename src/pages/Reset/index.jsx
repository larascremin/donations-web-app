import React from "react";
import "./style.css";
import { useMediaQuery } from "react-responsive";
import MobileLogin from "../../components/Mobile Login";
import StandardInput from "../../components/Standard Input";
import LoginHeader from "../../components/Login Header";
import DesktopLogin from "../../components/Desktop Login";

function Reset() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      {isMobile ? (
        <MobileLogin>
          <LoginHeader title="Resete sua senha" />
          <form className="flex-col reset-form">
            <StandardInput label="Insira seu e-mail" />
            <div className="button-wrapper">
              <button className="std-button">ENVIAR</button>
              <a href="/auth">Retornar ao Login</a>
            </div>
          </form>
        </MobileLogin>
      ) : (
        <DesktopLogin>
          <form className="flex-col reset-form">
            <LoginHeader title="Resete sua senha" />
            <StandardInput label="Insira seu e-mail" />
            <div className="button-wrapper">
              <button className="std-button">ENVIAR</button>
              <a href="/auth">Voltar para o Login</a>
            </div>
          </form>
        </DesktopLogin>
      )}
    </>
  );
}

export default Reset;
