import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import DynamicLogin from "../../components/DynamicLogin";
import api from "../../services/api";

function Reset() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await api.post("/auth/forgot-password", { email });
      
      setMessage({
        text: "Se o e-mail estiver cadastrado, você receberá um link de recuperação em instantes.",
        type: "success"
      });
      setEmail("");

    } catch (error) {
      console.error("Erro ao solicitar reset:", error);
       setMessage({
        text: error.response?.data?.message || "Erro ao tentar enviar e-mail. Tente novamente.",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DynamicLogin>
      <h2 className={isMobile ? "text-center mt-4 mb-10" : "mt-4 mb-16"}>
        Recuperar Senha
      </h2>

      {/* Feedback para o usuário */}
      {message.text && (
        <div className={`p-3 mb-6 rounded text-center text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
        </div>
      )}

      <form className={`${isMobile ? "max-w-md" : "w-md"} my-10`} onSubmit={handleResetPassword}>
        <label htmlFor="email">Insira seu e-mail</label>
        <input
          id="email"
          type="email"
          placeholder="exemplo@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-login mb-6"
          required
        />
        
        <button 
            type="submit" 
            className={`button-std w-full ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            disabled={loading}
        >
          {loading ? "ENVIANDO..." : "ENVIAR"}
        </button>
      </form>
      
      <div className="flex mt-2 gap-1 justify-center">
        <h6>Deseja voltar ao Login? </h6>
        <a href="/auth" className="font-bold hover:underline">Clique Aqui</a>
      </div>
    </DynamicLogin>
  );
}

export default Reset;