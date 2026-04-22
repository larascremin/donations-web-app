import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import DynamicLogin from "../../components/DynamicLogin";
import PasswordInput from "../../components/PasswordInput";
import api from "../../services/api";

function NewPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const token = searchParams.get("token");

  const handleNewPassword = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Token de recuperação inválido ou ausente.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/reset-password", { token, newPassword: password });
      toast.success("Senha redefinida com sucesso! Faça login com a nova senha.");
      setTimeout(() => navigate("/auth"), 2000);
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      toast.error(error.response?.data?.message || "Erro ao redefinir senha. O link pode ter expirado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DynamicLogin>
      <h2 className={isMobile ? "text-center mt-4 mb-10" : "mt-4 mb-16"}>
        Redefinir Senha
      </h2>
      <form className={`${isMobile ? "max-w-md" : "w-md"} my-10`} onSubmit={handleNewPassword}>
        <label htmlFor="password">Crie uma nova senha</label>
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
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
