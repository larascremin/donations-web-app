import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import DynamicLogin from "../../components/DynamicLogin";
import PasswordInput from "../../components/PasswordInput";
import api from "../../services/api";
import { logger } from "../../services/logger";

const getPasswordStrength = (password) => {
  if (!password) return null;
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "Fraca", color: "bg-red-400", width: "w-1/3" };
  if (score <= 3) return { label: "Média", color: "bg-yellow-400", width: "w-2/3" };
  return { label: "Forte", color: "bg-green-500", width: "w-full" };
};

function Register() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [accountType, setAccountType] = useState("INSTITUICAO");
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(password);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/users", {
        nomeCompleto: name,
        email,
        senha: password,
        tipo: accountType,
        ...(accountType === "INSTITUICAO" && cnpj ? { cnpj } : {}),
      });
      toast.success("Conta criada com sucesso! Faça login.");
      navigate("/auth");
    } catch (err) {
      logger.error(err);
      toast.error("Não foi possível criar a conta. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DynamicLogin>
      <h2 className={isMobile ? "text-center mt-4 mb-6" : "mt-4 mb-16"}>
        Crie sua conta
      </h2>
      <form className="w-full max-w-md mb-10 mt-4" onSubmit={handleRegister}>
        <div className="flex mb-6 bg-transparent rounded-lg overflow-hidden border border-[var(--base-04)]">
          <button
            type="button"
            className={`flex-1 py-3 px-4 text-sm font-semibold text-center cursor-pointer leading-tight transition-colors
              ${accountType === "INSTITUICAO"
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
              ${accountType === "DOADOR"
                ? "bg-[var(--base-05)] text-[var(--base-01)] border-[5px] border-[var(--base-01)] rounded-lg"
                : "bg-[var(--base-01)] text-[var(--base-05)] border-transparent"
              }`}
            onClick={() => setAccountType("DOADOR")}
          >
            SOU DOADOR
          </button>
        </div>

        <label htmlFor="name">
          {accountType === "INSTITUICAO" ? "Insira o nome da Instituição/Org" : "Insira seu nome completo"}
        </label>
        <input id="name" type="text"
          placeholder={accountType === "INSTITUICAO" ? "Nome da Organização" : "Nome Sobrenome"}
          value={name} onChange={(e) => setName(e.target.value)}
          className="input-login mb-5" required
        />

        <label htmlFor="email">Insira seu e-mail</label>
        <input id="email" type="email" placeholder="exemplo@email.com"
          value={email} onChange={(e) => setEmail(e.target.value)}
          className="input-login mb-5" required
        />

        {accountType === "INSTITUICAO" && (
          <>
            <label htmlFor="cnpj">CNPJ <span className="text-sm text-[var(--base-04)]">(opcional)</span></label>
            <input id="cnpj" type="text" placeholder="00.000.000/0001-00"
              value={cnpj} onChange={(e) => setCnpj(e.target.value)}
              className="input-login mb-5"
            />
          </>
        )}

        <label htmlFor="password">Crie uma senha</label>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        {/* Indicador de força de senha */}
        {password && (
          <div className="mt-2 mb-1">
            <div className="h-1.5 w-full bg-[var(--base-03)] rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
            </div>
            <p className="text-xs text-[var(--base-04)] mt-1">
              Força da senha: <span className="font-medium">{strength.label}</span>
              {password.length < 6 && <span className="ml-2 text-red-400">— mínimo 6 caracteres</span>}
            </p>
          </div>
        )}

        {!password && (
          <p className="text-xs text-[var(--base-04)] mt-2 mb-1">
            Use letras maiúsculas, números e símbolos para uma senha mais forte.
          </p>
        )}

        <button
          type="submit"
          className={`button-std w-full mt-6 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "CRIANDO CONTA..." : "REGISTRAR"}
        </button>
      </form>

      <div className="flex mt-2 gap-1 justify-center">
        <h6>Já possui uma conta? </h6>
        <Link to="/auth">Acesse aqui</Link>
      </div>
    </DynamicLogin>
  );
}

export default Register;
