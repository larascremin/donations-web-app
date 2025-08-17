import React, { useState } from "react";
import DynamicLogin from "../../components/DynamicLogin";
import { useMediaQuery } from "react-responsive";

function Reset() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [email, setEmail] = useState("");

  return (
    <DynamicLogin>
      <h2 className={isMobile ? "text-center mt-4 mb-10" : "mt-4 mb-16"}>
        Recuperar Senha
      </h2>
      <form className={`${isMobile ? "max-w-md" : "w-md"} my-10`}>
        <label htmlFor="email">Insira seu e-mail</label>
        <input
          id="email"
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-login mb-6"
        />
      </form>
      <button className="button-std w-full">ENVIAR</button>
      <div className="flex mt-2 gap-1 justify-center">
        <h6>Deseja voltar ao Login? </h6>
        <a href="/auth">Clique Aqui</a>
      </div>
    </DynamicLogin>
  );
}

export default Reset;
