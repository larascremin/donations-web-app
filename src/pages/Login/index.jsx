import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import "./style.css";
import PopUp from "../../components/PopUp";
import StandardInput from "../../components/Standard Input";
import PasswordInput from "../../components/Password Input";
import HALF_MOON_SGV from "../../assets/vectors/half-moon";
import TRIANGLE_SVG from "../../assets/vectors/triangle";
import CIRCLE_SVG from "../../assets/vectors/plus";
import LoginHeader from "../../components/Login Header";
import PLUS_SVG from "../../assets/vectors/plus";
import HEART_SVG from "../../assets/vectors/heart";

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
        <div className="flex-col login-mbl">
          <div className="sob-overflow login-vectors">
            <HALF_MOON_SGV color="var(--green)" className="login-v01" />
            <div className="vectors-wrap">
              <TRIANGLE_SVG color="var(--l-blue)" className="login-v02" />
              <PLUS_SVG color="var(--l-yellow)" className="login-v03" />
            </div>
          </div>
          <PopUp>
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
                <a className="reset-link">Esqueceu sua senha?</a>
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
                  Não possui uma conta? <a href="/register">Cadastre-se Aqui</a>
                </h6>
              </div>
            </form>
          </PopUp>
        </div>
      ) : (
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
          <div className="flex-col login-right">
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
                <a className="reset-link">Esqueceu sua senha?</a>
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
                  Não possui uma conta? <a href="/register">Cadastre-se Aqui</a>
                </h6>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
