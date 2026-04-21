import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import DynamicLogin from "../../components/DynamicLogin";
import PasswordInput from "../../components/PasswordInput";
import FeedbackBanner from "../../components/FeedbackBanner";
import api from "../../services/api";

function NewPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const token = searchParams.get("token");

  const handleNewPassword = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage({ text: "Token de recuperação inválido ou ausente.", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await api.post("/auth/reset-password", {
        token,
        newPassword: password,
      });
      setMessage({ text: "Senha redefinida com sucesso! Faça login com a nova senha.", type: "success" });
      setTimeout(() => navigate("/auth"), 2000);
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      setMessage({
        text: error.response?.data?.message || "Erro ao redefinir senha. O link pode ter expirado.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DynamicLogin>
      <h2 className={isMobile ? "text-center mt-4 mb-10" : "mt-4 mb-16"}>
        Redefinir Senha
      </h2>
      <FeedbackBanner message={message.text} variant={message.type || "error"} />
      <form className={`${isMobile ? "max-w-md" : "w-md"} my-10`} onSubmit={handleNewPassword}>
        <label htmlFor="password">Crie uma nova senha</label>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className={`button-std w-full mt-6 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "SALVANDO..." : "REDEFINIR"}
        </button>
      </form>
      <div className="flex mt-2 gap-1 justify-center">
        <h6>Deseja voltar ao Login? </h6>
        <Link to="/auth">Clique Aqui</Link>
      </div>
    </DynamicLogin>
  );
}

export default NewPassword;
