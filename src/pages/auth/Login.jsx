import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import DynamicLogin from "../../components/DynamicLogin";
import PasswordInput from "../../components/PasswordInput";
import { UserContext } from "../../hooks/UserContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/home");
    } catch (err) {
      console.error("Erro login:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
          setError("E-mail ou senha incorretos.");
      } else {
          setError("Erro ao conectar com o servidor.");
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

      {/* Mensagem de erro com destaque visual */}
      {error && (
        <p className="mb-6 -mt-4 text-red-700 text-center bg-red-100 p-3 rounded border border-red-400 font-medium">
          {error}
        </p>
      )}

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
        <div className="text-right mt-1">
            <a href="/auth/reset-password" className="text-sm hover:underline text-[var(--base-05)]">
            Esqueceu a senha?
            </a>
        </div>

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
        <a href="/auth/register" className="font-bold hover:underline">
            Cadastre-se aqui
        </a>
      </div>
    </DynamicLogin>
  );
}

export default Login;