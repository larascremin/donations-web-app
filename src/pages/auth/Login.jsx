import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import DynamicLogin from "../../components/DynamicLogin";
import PasswordInput from "../../components/PasswordInput";
// import { postData } from "../../services/Methods";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // const data = await postData("/api/auth/login", {
      //   email,
      //   senha: password,
      // });
      // if (data.token) {
      //   localStorage.setItem("token", data.token);
      // }
      console.log("logou");
      navigate("/home");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <DynamicLogin>
      <h2 className={isMobile ? "text-center mt-4 mb-10" : "mt-4 mb-20"}>
        Bem vindo(a) de volta!
      </h2>
      <form className="max-w-md" onSubmit={handleLogin}>
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
        <button
          type="submit"
          className={`button-std w-full ${isMobile ? "mt-10" : "mt-20"}`}
        >
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
