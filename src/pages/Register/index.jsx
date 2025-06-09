import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./style.css";
import StandardInput from "../../components/Standard Input";
import PasswordInput from "../../components/Password Input";
import LoginHeader from "../../components/Login Header";
import DesktopLogin from "../../components/Desktop Login";
import MobileLogin from "../../components/Mobile Login";

function Register() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [accountType, setAccountType] = useState("institution");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Attempting to register with details:", {
      accountType,
      name: accountType === "donor" ? name : undefined,
      orgName: accountType === "institution" ? orgName : undefined,
      email,
      password,
    });
  };

  const commonFormContent = (
    <form className="flex-col register-form" onSubmit={handleRegister}>
      <LoginHeader title="Crie uma conta" />
      <div className="account-type-selector">
        <button
          type="button"
          className={`account-type-button ${
            accountType === "institution" ? "active" : ""
          }`}
          onClick={() => setAccountType("institution")}
        >
          SOU INSTITUIÇÃO
        </button>
        <button
          type="button"
          className={`account-type-button ${
            accountType === "donor" ? "active" : ""
          }`}
          onClick={() => setAccountType("donor")}
        >
          SOU DOADOR
        </button>
      </div>
      <div className="register-input-wrap">
        {accountType === "institution" ? (
          <StandardInput
            label="Nome da Organização/Instituição"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="Nome da Organização"
          />
        ) : (
          <StandardInput
            label="Seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome Completo"
          />
        )}
        <StandardInput
          label="Insira seu e-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <PasswordInput
          label="Insira sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
      </div>
      <div className="flex-col register-button-wrap">
        <button type="submit" className="std-button">
          CADASTRAR {}
        </button>
        <h6>
          Já possui uma conta? <a href="/auth">Clique aqui</a> {}
        </h6>
      </div>
    </form>
  );

  return (
    <>
      {isMobile ? (
        <MobileLogin height="80%">{commonFormContent}</MobileLogin>
      ) : (
        <DesktopLogin>{commonFormContent}</DesktopLogin>
      )}
    </>
  );
}

export default Register;
