import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import DynamicLogin from "../../components/DynamicLogin";
// import { postData } from "../../services/Methods";

function Reset() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // const data = await postData("/api/auth/forgot-password", { email });
      console.log("enviou email para resetar senha");
      navigate("/home");
    } catch (e) {
      console.log(e.message);
    }
  };

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
      <button className="button-std w-full" onClick={handleResetPassword}>
        ENVIAR
      </button>
      <div className="flex mt-2 gap-1 justify-center">
        <h6>Deseja voltar ao Login? </h6>
        <a href="/auth">Clique Aqui</a>
      </div>
    </DynamicLogin>
  );
}

export default Reset;
