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

function Login() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        email: email,
        senha: password,
      };

      const response = await api.post("/auth/login", payload);
      const token = response.data.token;

      localStorage.setItem("token", token);

      navigate("/profile");
    } catch (err) {
      const errorMessage =
            err.response?.data?.errors?.[0] ||
            err.response?.data?.message ||
            "Credenciais inválidas ou erro no servidor.";
        setError(errorMessage);
    } finally {
        setLoading(false);
    }
};
  const commonFormContent = (
    <form className="flex-col login-form" onSubmit={handleLogin}>
      <LoginHeader title="Bem vindo(a) de volta!" />
      <div className="login-input-wrap">
        <StandardInput
          label={"Insira seu e-mail"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
        />
        <PasswordInput
          label={"Insira sua senha"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        <a className="reset-link" href="/auth/reset-password">
          Esqueceu sua senha?
        </a>
      </div>
      
      {}
      {error && <p className="error-message">{error}</p>}

      <div className="flex-col login-button-wrap">
        {}
        <button type="submit" className="std-button" disabled={loading}>
          {loading ? "ENTRANDO..." : "ENTRAR"}
        </button>
        <h6>
          Não possui uma conta? <a href="/auth/register">Cadastre-se Aqui</a>
        </h6>
      </div>
    </form>
  );

  return (
    <>
      {isMobile ? (
        <MobileLogin height="60%">{commonFormContent}</MobileLogin>
      ) : (
        <DesktopLogin>{commonFormContent}</DesktopLogin>
      )}
    </>
  );
}

export default Login;