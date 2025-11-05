import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import DynamicLogin from "../../components/DynamicLogin";
import PasswordInput from "../../components/PasswordInput";
import { saveMockData, UserContext } from "../../hooks/UserContext";
import { mockUsers } from "../../services/Mock";

function Register() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { setUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("INSTITUICAO");

  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(),
      nome: name,
      email,
      senha: password,
      role: accountType,
    };

    if (accountType === "INSTITUICAO") {
      mockUsers.organizacoes.push({
        ...newUser,
        telefone: "",
        cidade: "",
        rua: "",
        bairro: "",
        numero: "",
        imagem: null,
        doacoesSolicitadas: [],
      });
    } else {
      mockUsers.doadores.push({
        ...newUser,
        doacoesRealizadas: [],
      });
    }

    saveMockData();
    setUser(newUser);
    navigate("/home");
  };

  return (
    <DynamicLogin>
      <h2 className={isMobile ? "text-center mt-4 mb-6" : "mt-4 mb-16"}>
        Crie sua conta
      </h2>
      <form className="max-w-md mb-10 mt-4">
        <div className="flex mb-6 bg-transparent rounded-lg overflow-hidden border border-[var(--base-04)]">
          <button
            type="button"
            className={`flex-1 py-3 px-4 text-sm font-semibold text-center cursor-pointer leading-tight transition-colors
      bg-[var(--base-01)] text-[var(--base-01)]
      
      ${
        accountType === "INSTITUICAO"
          ? "bg-[var(--base-05)] text-[var(--base-01)] border-[5px] border-[var(--base-01)] rounded-lg"
          : "border-transparent text-[var(--base-05)]"
      }`}
            onClick={() => setAccountType("INSTITUICAO")}
          >
            SOU INSTITUIÇÃO
          </button>

          <button
            type="button"
            className={`flex-1 py-3 px-4 text-sm font-semibold text-center cursor-pointer leading-tight transition-colors
      bg-[var(--base-01)] text-[var(--base-01)]
      
      ${
        accountType === "DOADOR"
          ? "bg-[var(--base-05)] text-[var(--base-01)] border-[5px] border-[var(--base-01)] rounded-lg"
          : "border-transparent text-[var(--base-05)]"
      }`}
            onClick={() => setAccountType("DOADOR")}
          >
            SOU DOADOR
          </button>
        </div>

        <label htmlFor="name">
          {accountType === "INSTITUICAO"
            ? "Insira o nome da Instituição/Org"
            : "Insira seu nome completo"}
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nome Sobrenome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-login mb-5"
        />
        <label htmlFor="email">Insira seu e-mail</label>
        <input
          id="email"
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-login mb-5"
        />
        <label htmlFor="password">Crie uma senha</label>

        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <button
        className={`button-std w-full ${isMobile ? "" : "mt-14"}`}
        onClick={handleRegister}
      >
        REGISTRAR
      </button>
      <div className="flex mt-2 gap-1 justify-center">
        <h6>Já possui uma conta? </h6>
        <a href="/auth">Acesse aqui</a>
      </div>
    </DynamicLogin>
  );
}

export default Register;
