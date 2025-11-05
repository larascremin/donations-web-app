import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import DynamicLogin from "../../components/DynamicLogin";
import PasswordInput from "../../components/PasswordInput";
import api from "../../services/api";

function Register() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("INSTITUICAO");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const newUser = {
      nomeCompleto: name,
      email: email,
      senha: password,
      tipo: accountType,
    };

    try {
      await api.post("/users", newUser);

      alert("Conta criada com sucesso! Faça login.");
      navigate("/auth");

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Erro ao criar conta. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DynamicLogin>
      <h2 className={isMobile ? "text-center mt-4 mb-6" : "mt-4 mb-16"}>
        Crie sua conta
      </h2>

      {/* Exibe mensagem de erro se houver */}
      {error && (
        <p className="text-red-700 text-center font-semibold mb-4 bg-red-100 p-2 rounded border border-red-400">
          {error}
        </p>
      )}

      <form className="max-w-md mb-10 mt-4" onSubmit={handleRegister}>
        {/* --- Botões de Seleção de Tipo de Conta --- */}
        <div className="flex mb-6 bg-transparent rounded-lg overflow-hidden border border-[var(--base-04)]">
          <button
            type="button"
            className={`flex-1 py-3 px-4 text-sm font-semibold text-center cursor-pointer leading-tight transition-colors
              ${
                accountType === "INSTITUICAO"
                  ? "bg-[var(--base-05)] text-[var(--base-01)] border-[5px] border-[var(--base-01)] rounded-lg"
                  : "bg-[var(--base-01)] text-[var(--base-05)] border-transparent"
              }`}
            onClick={() => setAccountType("INSTITUICAO")}
          >
            SOU INSTITUIÇÃO
          </button>

          <button
            type="button"
            className={`flex-1 py-3 px-4 text-sm font-semibold text-center cursor-pointer leading-tight transition-colors
              ${
                accountType === "DOADOR"
                  ? "bg-[var(--base-05)] text-[var(--base-01)] border-[5px] border-[var(--base-01)] rounded-lg"
                  : "bg-[var(--base-01)] text-[var(--base-05)] border-transparent"
              }`}
            onClick={() => setAccountType("DOADOR")}
          >
            SOU DOADOR
          </button>
        </div>
        {/* --------------------------------------------------------- */}

        <label htmlFor="name">
          {accountType === "INSTITUICAO"
            ? "Insira o nome da Instituição/Org"
            : "Insira seu nome completo"}
        </label>
        <input
          id="name"
          type="text"
          placeholder={accountType === "INSTITUICAO" ? "Nome da Organização" : "Nome Sobrenome"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-login mb-5"
          required
        />

        <label htmlFor="email">Insira seu e-mail</label>
        <input
          id="email"
          type="email"
          placeholder="exemplo@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-login mb-5"
          required
        />

        <label htmlFor="password">Crie uma senha</label>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Botão de Registrar com estado de Loading */}
        <button
          type="submit"
          className={`button-std w-full ${isMobile ? "" : "mt-14"} ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "CRIANDO CONTA..." : "REGISTRAR"}
        </button>
      </form>

      <div className="flex mt-2 gap-1 justify-center">
        <h6>Já possui uma conta? </h6>
        <a href="/auth" className="font-bold hover:underline">
          Acesse aqui
        </a>
      </div>
    </DynamicLogin>
  );
}

export default Register;