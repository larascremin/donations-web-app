import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import NavigationBar from "../../components/NavigationBar";
import FeedbackBanner from "../../components/FeedbackBanner";
import PasswordInput from "../../components/PasswordInput";
import profile01 from "../../assets/images/cj-profile-01.svg";
import { UserContext } from "../../hooks/UserContext";
import api from "../../services/api";

function Profile() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [number, setNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const isDoador = user?.tipo === "DOADOR";

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get("/users/me");
      const userData = response.data;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      setName(userData.nomeCompleto || "");
      setEmail(userData.email || "");
      setPassword("");

      if (!isDoador) {
        setPhone(userData.telefone || "");
        setCity(userData.cidade || "");
        setStreet(userData.rua || "");
        setNeighborhood(userData.bairro || "");
        setNumber(userData.numero || "");
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setLoading(true);

    try {
      const payload = {
        nomeCompleto: name,
        email,
        senha: password,
        tipo: user.tipo,
        telefone: phone,
        cidade: city,
        bairro: neighborhood,
        rua: street,
        numero: number,
      };

      const response = await api.put("/users/me", payload);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));

      setMessage({ text: "Perfil atualizado com sucesso!", type: "success" });
      setPassword("");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      if (error.response?.status === 400) {
        setMessage({ text: "Erro: Verifique os campos. A senha pode ser obrigatória.", type: "error" });
      } else {
        setMessage({ text: "Erro ao atualizar perfil. Tente novamente.", type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <div className={isMobile ? "" : "w-[360px] h-screen"}>
        <NavigationBar />
      </div>
      <div className="flex-1 flex flex-col items-center overflow-y-auto">
        <div className="w-full">
          <div
            className={`w-full bg-[var(--blue)] rounded-b-2xl ${isMobile ? "h-30" : "h-40"}`}
          ></div>
          <img
            src={user?.avatarUrl ? `${import.meta.env.VITE_API_URL}${user.avatarUrl}` : profile01}
            className={`h-30 -mt-16 mb-4 ml-4 md:h-40 md:-mt-20 md:ml-20 md:mb-10 ${
              !isDoador ? "rounded-full border-2 border-[var(--base-04)]" : ""
            }`}
          />
        </div>

        <form className="w-full max-w-200 px-4 mb-30" onSubmit={handleUpdate}>
          {!isMobile && <h2 className="mb-10">Seus Dados</h2>}
          <FeedbackBanner message={message.text} variant={message.type || "error"} />

          <label htmlFor="name">
            {isDoador ? "Nome completo" : "Nome da Org/Instituição"}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-login mb-6"
          />

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-login mb-6 w-full"
          />

          {!isDoador && (
            <>
              <label htmlFor="phone">Telefone de Contato</label>
              <input
                id="phone"
                type="text"
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-login mb-6"
              />
              <label htmlFor="city">Cidade</label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input-login mb-6 w-full"
              />
              <label htmlFor="street">Endereço (Rua)</label>
              <input
                id="street"
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="input-login mb-6 w-full"
              />
              <div className="flex w-full gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="neighborhood">Bairro</label>
                  <input
                    id="neighborhood"
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="input-login mb-6 w-full"
                  />
                </div>
                <div className="flex flex-col w-32 shrink-0">
                  <label htmlFor="number">Número</label>
                  <input
                    id="number"
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="input-login mb-6 w-full"
                  />
                </div>
              </div>
            </>
          )}

          <label htmlFor="password">
            Confirmar Senha ou Nova Senha
            <span className="text-sm text-red-500 ml-1">(Obrigatório*)</span>
          </label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-end mt-10">
            <button
              type="submit"
              disabled={loading}
              className={`button-std ${isMobile ? "w-full" : "w-60"} ${loading ? "opacity-70" : ""}`}
            >
              {loading ? "SALVANDO..." : "ATUALIZAR"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
