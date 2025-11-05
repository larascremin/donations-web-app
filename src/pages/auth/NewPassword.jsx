import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import DynamicLogin from "../../components/DynamicLogin";
import PasswordInput from "../../components/PasswordInput";
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
         token: token,
         newPassword: password,
       });

       alert("Senha redefinida com sucesso! Faça login com a nova senha.");
       navigate("/auth");

    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      setMessage({
        text: error.response?.data?.message || "Erro ao redefinir senha. O link pode ter expirado.",
        type: "error"
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

       {/* Feedback */}
       {message.text && (
        <div className={`p-3 mb-6 rounded text-center text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
        </div>
      )}

      <form className={`${isMobile ? "max-w-md" : "w-md"} my-10`} onSubmit={handleNewPassword}>
        <label htmlFor="password">Crie uma nova senha</label>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button 
            type="submit" 
            className={`button-std w-full mt-6 ${loading ? "opacity-70" : ""}`}
            disabled={loading}
        >
            {loading ? "SALVANDO..." : "REDEFINIR"}
        </button>
      </form>
      
      <div className="flex mt-2 gap-1 justify-center">
        <h6>Deseja voltar ao Login? </h6>
        <a href="/auth" className="font-bold hover:underline">Clique Aqui</a>
      </div>
    </DynamicLogin>
  );
}

export default NewPassword;