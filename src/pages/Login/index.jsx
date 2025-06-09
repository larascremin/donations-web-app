import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import "./style.css";
import StandardInput from "../../components/Standard Input";
import PasswordInput from "../../components/Password Input";
import LoginHeader from "../../components/Login Header";
import DesktopLogin from "../../components/Desktop Login";
import MobileLogin from "../../components/Mobile Login";

function Login() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEntrar = () => {
    navigate("/home");
  };

  return (
    <>
      {isMobile ? (
        <MobileLogin height="60%">
          <form className="flex-col login-form ">
            <LoginHeader title="Bem vindo(a) de volta!" />
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
              <a className="reset-link" href="/auth/reset-password">
                Esqueceu sua senha?
              </a>
            </div>
            <div className="flex-col login-button-wrap">
              <button
                type="submit"
                className="std-button"
                onClick={handleEntrar}
              >
                ENTRAR
              </button>
              <h6>
                Não possui uma conta?{" "}
                <a href="/auth/register">Cadastre-se Aqui</a>
              </h6>
            </div>
          </form>
        </MobileLogin>
      ) : (
        <DesktopLogin>
          <form className="flex-col login-form">
            <LoginHeader title="Bem vindo(a) de volta!" />
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
              <a className="reset-link" href="/auth/reset-password">
                Esqueceu sua senha?
              </a>
            </div>
            <div className="flex-col login-button-wrap">
              <button
                type="submit"
                className="std-button"
                onClick={handleEntrar}
              >
                ENTRAR
              </button>
              <h6>
                Não possui uma conta?{" "}
                <a href="/auth/register">Cadastre-se Aqui</a>
              </h6>
            </div>
          </form>
        </DesktopLogin>
      )}
    </>
  );
}

export default Login;
