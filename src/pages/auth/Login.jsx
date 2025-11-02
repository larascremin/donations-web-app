import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import DynamicLogin from "../../components/DynamicLogin";
import PasswordInput from "../../components/PasswordInput";
import { mockUsers } from "../../services/Mock";
import { UserContext } from "../../hooks/UserContext";
// import { postData } from "../../services/Methods";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleLogin = (e) => {
    e.preventDefault();

    const allUsers = [...mockUsers.doadores, ...mockUsers.organizacoes];
    const user = allUsers.find(
      (u) => u.email === email && u.senha === password
    );

    if (user) {
      setUser(user);
      navigate("/home");
    } else {
      setError("Email ou senha incorretos.");
    }
  };

  return (
    <DynamicLogin>
      <h2 className={isMobile ? "text-center mt-4 mb-10" : "mt-4 mb-20"}>
        Bem vindo(a) de volta!
      </h2>
      {error && <p className="mb-10 -mt-10 text-red-800 font-bold">{error}</p>}
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
