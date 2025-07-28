// Arquivo: Register.jsx (COMPLETO E CORRIGIDO)

import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./style.css";
import StandardInput from "../../components/Standard Input";
import PasswordInput from "../../components/Password Input";
import LoginHeader from "../../components/Login Header";
import DesktopLogin from "../../components/Desktop Login";
import MobileLogin from "../../components/Mobile Login";

function Register() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("institution");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const userTypeForApi = accountType === "donor" ? "DOADOR" : "INSTITUICAO";

    const payload = {
      nomeCompleto: accountType === "institution" ? orgName : name,
      email: email,
      senha: password,
      tipo: userTypeForApi,
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      telefone: "",
      cnpj: "",
    };

    try {
      await api.post("/users", payload);
      navigate("/auth", {
        state: { message: "Cadastro realizado com sucesso! Faça seu login." },
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.errors?.[0] ||
        err.response?.data?.message ||
        "Ocorreu um erro ao fazer o cadastro. Verifique os dados e tente novamente.";
        
      setError(errorMessage);
      console.error("Erro no cadastro:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
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
            required
          />
        ) : (
          <StandardInput
            label="Seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome Completo"
            required
          />
        )}
        <StandardInput
          label="Insira seu e-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
        />
        <PasswordInput
          label="Insira sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="flex-col register-button-wrap">
        <button type="submit" className="std-button" disabled={loading}>
          {loading ? "CADASTRANDO..." : "CADASTRAR"}
        </button>
        <h6>
          Já possui uma conta? <a href="/auth">Clique aqui</a>
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