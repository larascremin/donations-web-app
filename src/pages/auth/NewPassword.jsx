import React, { useState } from "react";
import DynamicLogin from "../../components/DynamicLogin";
import { useMediaQuery } from "react-responsive";

function NewPassword() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [password, setPassword] = useState("");

  return (
    <DynamicLogin>
      <h2 className={isMobile ? "text-center mt-4 mb-10" : "mt-4 mb-16"}>
        Redefinir Senha
      </h2>
      <form className={`${isMobile ? "max-w-md" : "w-md"} my-10`}>
        <label htmlFor="password">Crie uma nova senha</label>
        <input
          id="password"
          type="text"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-login mb-6"
        />
      </form>
      <button className="button-std w-full">REDEFINIR</button>
      <div className="flex mt-2 gap-1 justify-center">
        <h6>Deseja voltar ao Login? </h6>
        <a href="/auth">Clique Aqui</a>
      </div>
    </DynamicLogin>
  );
}

export default NewPassword;
