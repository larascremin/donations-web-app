import { useContext, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import NavigationBar from "../../components/NavigationBar";
import PasswordInput from "../../components/PasswordInput";
import profile01 from "../../assets/images/cj-profile-01.svg";
import { Camera } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import { UserContext } from "../../hooks/UserContext";
import api from "../../services/api";
import { logger } from "../../services/logger";

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
  const [cnpj, setCnpj] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const avatarInputRef = useRef(null);

  const isDoador = user?.tipo === "DOADOR";

  useEffect(() => {
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
          setCnpj(userData.cnpj || "");
        }
      } catch (error) {
        logger.error("Erro ao carregar perfil:", error);
        toast.error("Erro ao carregar perfil.");
      }
    };
    fetchUserProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (password && password.length < 6) {
      toast.error("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setLoading(true);

    try {
      const payload = {
        nomeCompleto: name,
        email,
        tipo: user.tipo,
        telefone: phone,
        cidade: city,
        bairro: neighborhood,
        rua: street,
        numero: number,
        cnpj,
        ...(password ? { senha: password } : {}),
      };
      const response = await api.put("/users/me", payload);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Perfil atualizado com sucesso!");
      setPassword("");
    } catch (error) {
      logger.error("Erro ao atualizar:", error);
      const errors = error.response?.data?.errors;
      toast.error(
        errors?.length
          ? errors.join(" | ")
          : error.response?.data?.message || "Erro ao atualizar perfil."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setAvatarLoading(true);
    try {
      const response = await api.post("/users/me/avatar", formData);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Foto atualizada com sucesso!");
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Upload de avatar não disponível para este perfil.");
      } else {
        toast.error(error.response?.data?.message || "Erro ao enviar foto.");
      }
    } finally {
      setAvatarLoading(false);
      e.target.value = "";
    }
  };

  const apiBase = new URL(import.meta.env.VITE_API_URL).origin;
  const avatarSrc = user?.avatarUrl
    ? `${apiBase}${user.avatarUrl}`
    : profile01;

  return (
    <div className="flex">
      <div className={isMobile ? "" : "w-[280px] h-screen"}>
        <NavigationBar />
      </div>
      <div className="flex-1 flex flex-col items-center overflow-y-auto">
        <div className="w-full">
          <div className={`w-full bg-[var(--blue)] rounded-b-2xl ${isMobile ? "h-30" : "h-40"}`}></div>
          <div className="relative inline-block">
            <img
              src={avatarSrc}
              onError={(e) => { e.currentTarget.src = profile01; }}
              className={`h-30 -mt-16 mb-4 ml-4 md:h-40 md:-mt-20 md:ml-20 md:mb-10 ${
                !isDoador ? "rounded-full border-2 border-[var(--base-04)]" : ""
              }`}
              alt="Avatar"
            />
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              disabled={avatarLoading}
              title="Alterar foto"
              className={`absolute bottom-5 right-0 bg-[var(--base-03)] hover:bg-[var(--base-04)] transition-colors rounded-full p-2 shadow-md ${
                avatarLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <Camera size={18} color="var(--base-06)" />
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>
        </div>

        <form className="w-full max-w-200 px-4 mb-30" onSubmit={handleUpdate}>
          {!isMobile && <h2 className="mb-10">Seus Dados</h2>}

          <label htmlFor="name">{isDoador ? "Nome completo" : "Nome da Org/Instituição"}</label>
          <input id="name" type="text" value={name}
            onChange={(e) => setName(e.target.value)} className="input-login mb-6" required
          />

          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} className="input-login mb-6 w-full" required
          />

          {!isDoador && (
            <>
              <label htmlFor="cnpj">CNPJ</label>
              <input id="cnpj" type="text" placeholder="00.000.000/0001-00"
                value={cnpj} onChange={(e) => setCnpj(e.target.value)} className="input-login mb-6"
              />

              <label htmlFor="phone">Telefone de Contato</label>
              <input id="phone" type="text" placeholder="(00) 00000-0000"
                value={phone} onChange={(e) => setPhone(e.target.value)} className="input-login mb-6"
              />

              <label htmlFor="city">Cidade</label>
              <input id="city" type="text" value={city}
                onChange={(e) => setCity(e.target.value)} className="input-login mb-6 w-full"
              />

              <label htmlFor="street">Endereço (Rua)</label>
              <input id="street" type="text" value={street}
                onChange={(e) => setStreet(e.target.value)} className="input-login mb-6 w-full"
              />

              <div className="flex w-full gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="neighborhood">Bairro</label>
                  <input id="neighborhood" type="text" value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)} className="input-login mb-6 w-full"
                  />
                </div>
                <div className="flex flex-col w-32 shrink-0">
                  <label htmlFor="number">Número</label>
                  <input id="number" type="text" value={number}
                    onChange={(e) => setNumber(e.target.value)} className="input-login mb-6 w-full"
                  />
                </div>
              </div>
            </>
          )}

          <label htmlFor="password">
            Nova Senha
            <span className="text-sm text-[var(--base-04)] ml-1">(deixe em branco para não alterar)</span>
          </label>
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} />

          <div className="flex justify-end mt-10">
            <button type="submit" disabled={loading}
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
