import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import PasswordInput from "../../components/PasswordInput";
import DynamicLogin from "../../components/DynamicLogin";

function Login() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <DynamicLogin>
      <h2 className={isMobile ? "text-center mt-4 mb-10" : "mt-4 mb-20"}>
        Bem vindo(a) de volta!
      </h2>
      <form className="max-w-md">
        <label htmlFor="email">Insira seu e-mail</label>
        <input
          id="email"
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-login mb-6"
        />
        <label htmlFor="password">Insira sua senha</label>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="/auth/reset-password" className="text-right mt-1">
          Esqueceu a senha
        </a>
        <button className={`button-std w-full ${isMobile ? "mt-10" : "mt-20"}`}>
          LOGIN
        </button>
      </form>
      <div className="flex mt-2 gap-1 justify-center">
        <h6>Não possui uma conta? </h6>
        <a href="/auth/register">Cadastre-se aqui</a>
      </div>
    </DynamicLogin>
  );
}

export default Login;
