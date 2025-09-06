import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import DynamicLogin from "../../components/DynamicLogin";
import PasswordInput from "../../components/PasswordInput";
// import { postData } from "../../services/Methods";

function NewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // const queryParams = new URLSearchParams(location.search); //link gerado pelo spring mail
  // const token = queryParams.get("token");

  const handleNewPassword = async (e) => {
    e.preventDefault();

    try {
      // const data = await postData("/api/auth/reset-password", {
      //   token,
      //   newPassword: password,
      // });
      console.log("nova senha definida");
      navigate("/home");
    } catch (e) {
      console.log(e.messge);
    }
  };
  return (
    <DynamicLogin>
      <h2 className={isMobile ? "text-center mt-4 mb-10" : "mt-4 mb-16"}>
        Redefinir Senha
      </h2>
      <form className={`${isMobile ? "max-w-md" : "w-md"} my-10`}>
        <label htmlFor="password">Crie uma nova senha</label>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <button className="button-std w-full" onClick={handleNewPassword}>
        REDEFINIR
      </button>
      <div className="flex mt-2 gap-1 justify-center">
        <h6>Deseja voltar ao Login? </h6>
        <a href="/auth">Clique Aqui</a>
      </div>
    </DynamicLogin>
  );
}

export default NewPassword;
