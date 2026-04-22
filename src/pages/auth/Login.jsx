import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import DynamicLogin from "../../components/DynamicLogin";
import PasswordInput from "../../components/PasswordInput";
import { UserContext } from "../../hooks/UserContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      navigate("/home");
    } catch (err) {
      console.error("Erro login:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("E-mail ou senha incorretos.");
      } else {
        toast.error("Erro ao conectar com o servidor.");
      }
    } finally {
      setLoading(false);
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
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-login mb-6"
          required
        />
        <label htmlFor="password">Insira sua senha</label>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/auth/reset-password" className="text-right mt-1">
          Esqueceu a senha
        </Link>
        <button
          type="submit"
          className={`button-std w-full ${isMobile ? "mt-10" : "mt-20"} ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "ENTRANDO..." : "LOGIN"}
        </button>
      </form>
      <div className="flex mt-6 gap-1 justify-center">
        <h6>Não possui uma conta? </h6>
        <Link to="/auth/register">Cadastre-se aqui</Link>
      </div>
    </DynamicLogin>
  );
}

export default Login;
