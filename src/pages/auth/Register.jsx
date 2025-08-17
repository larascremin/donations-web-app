import React, { useState } from "react";
import DynamicLogin from "../../components/DynamicLogin";
import { useMediaQuery } from "react-responsive";

function Register() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("institution");

  return (
    <DynamicLogin>
      <h2 className={isMobile ? "text-center mt-4 mb-6" : "mt-4 mb-16"}>
        Crie sua conta
      </h2>
      <form className="max-w-md mb-10 mt-4">
        <div className="flex mb-5 bg-transparent rounded-lg overflow-hidden border border-[var(--base-04)]">
          <button
            type="button"
            className={`flex-1 py-3 px-4 text-sm font-semibold text-center cursor-pointer leading-tight transition-colors
      bg-[var(--base-01)] text-[var(--base-01)]
      hover:bg-[var(--base-02)]
      ${
        accountType === "institution"
          ? "bg-[var(--base-05)] text-[var(--base-01)] border-[5px] border-[var(--base-01)] rounded-lg"
          : "border-transparent text-[var(--base-05)]"
      }`}
            onClick={() => setAccountType("institution")}
          >
            SOU INSTITUIÇÃO
          </button>

          <button
            type="button"
            className={`flex-1 py-3 px-4 text-sm font-semibold text-center cursor-pointer leading-tight transition-colors
      bg-[var(--base-01)] text-[var(--base-01)]
      hover:bg-[var(--base-02)]
      ${
        accountType === "donor"
          ? "bg-[var(--base-05)] text-[var(--base-01)] border-[5px] border-[var(--base-01)] rounded-lg"
          : "border-transparent text-[var(--base-05)]"
      }`}
            onClick={() => setAccountType("donor")}
          >
            SOU DOADOR
          </button>
        </div>

        <label htmlFor="name">
          {accountType === "institution"
            ? "Insira o nome da Instituição/Org"
            : "Insira seu nome completo"}
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nome Sobrenome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-login mb-5"
        />
        <label htmlFor="email">Insira seu e-mail</label>
        <input
          id="email"
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-login mb-5"
        />
        <label htmlFor="password">Crie uma senha</label>
        <input
          id="password"
          type="text"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-login"
        />
      </form>
      <button className={`button-std w-full ${isMobile ? "" : "mt-14"}`}>
        REGISTRAR
      </button>
      <div className="flex mt-2 gap-1 justify-center">
        <h6>Já possui uma conta? </h6>
        <a href="/auth">Acesse aqui</a>
      </div>
    </DynamicLogin>
  );
}

export default Register;
