import React from "react";
import "./style.css";
import { useMediaQuery } from "react-responsive";
import MobileLogin from "../../components/Mobile Login";
import LoginHeader from "../../components/Login Header";
import PasswordInput from "../../components/Password Input";
import DesktopLogin from "../../components/Desktop Login";

function NewPassowrd() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      {isMobile ? (
        <MobileLogin height="58%">
          <form className="flex-col password-form">
            <LoginHeader title="Resetar sua Senha" />
            <div className="login-input-wrap">
              <PasswordInput label="Insira uma nova senha" />
              <PasswordInput label="Confirme sua senha" />
            </div>
            <div className="flex-col button-wrapper">
              <button className="std-button">RESETAR</button>
              <a href="/auth/reset-password">Receber Link Novamente</a>
            </div>
          </form>
        </MobileLogin>
      ) : (
        <DesktopLogin>
          <form className="flex-col password-form-dsk">
            <LoginHeader title="Resetar sua Senha" />
            <div className="login-input-wrap">
              <PasswordInput label="Insira uma nova senha" />
              <PasswordInput label="Confirme sua senha" />
            </div>
            <div className="flex-col button-wrapper">
              <button className="std-button">RESETAR</button>
              <a href="/auth/reset-password">Receber Link Novamente</a>
            </div>
          </form>
        </DesktopLogin>
      )}
    </>
  );
}

export default NewPassowrd;
