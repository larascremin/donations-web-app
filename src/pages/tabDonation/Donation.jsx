import { useMediaQuery } from "react-responsive";
import NavigationBar from "../../components/NavigationBar";
import FeedbackBanner from "../../components/FeedbackBanner";
import { Check, X, PencilSimple } from "@phosphor-icons/react";
import donation01 from "../../assets/images/cj-donation-01.svg";
import donation02 from "../../assets/images/cj-donation-02.svg";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/UserContext";
import api from "../../services/api";

function Donation() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { user } = useContext(UserContext);
  const [itemsList, setItemsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const isDonator = user?.tipo === "DOADOR";

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let response;
      if (isDonator) {
        response = await api.get("/doacoes/me");
        setItemsList(response.data.content || []);
      } else {
        response = await api.get("/itens");
        setItemsList(response.data.content || []);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setMessage({ text: "Não foi possível carregar as doações.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "---";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "---";
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const handleConfirm = async (id) => {
    try {
      await api.put(`/doacoes/${id}`);
      fetchData();
    } catch (error) {
      console.error("Erro ao confirmar:", error);
      setMessage({ text: "Erro ao confirmar doação.", type: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;

    try {
      const endpoint = isDonator ? `/doacoes/${id}` : `/itens/${id}`;
      await api.delete(endpoint);
      setItemsList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao excluir:", error);
      setMessage({ text: "Erro ao excluir item.", type: "error" });
    }
  };

  return (
    <div className="flex">
      <div className={isMobile ? "" : "w-[360px] h-screen"}>
        <NavigationBar />
      </div>
      <div
        className={`flex-1 flex flex-col items-center overflow-y-auto ${
          isMobile ? "p-4" : "px-10 py-10"
        }`}
      >
        {/* --- CABEÇALHO (Banners) --- */}
        {isDonator ? (
          <div className="relative w-full flex flex-col justify-center items-center bg-[var(--l-pink)] max-w-140 py-6 gap-4 rounded-2xl overflow-hidden">
            <h2 className="z-10">
              {isMobile ? "Faça uma nova doação" : "Faça uma nova doação agora"}
            </h2>
            <button
              className="button-std z-10 px-10"
              onClick={() => navigate("/finder")}
            >
              QUERO DOAR
            </button>
            <img src={donation01} className="absolute -bottom-2 right-4 w-32 opacity-70 z-0 pointer-events-none rotate-10" />
            <img src={donation01} className="absolute top-2 left-6 w-20 opacity-70 z-0 pointer-events-none -rotate-10" />
          </div>
        ) : (
          <div className="relative w-full flex flex-col justify-center items-center bg-[var(--l-blue)] max-w-140 py-6 gap-4 rounded-2xl overflow-hidden">
            <h2 className="z-10">Solicite uma nova doação</h2>
            <button
              className="button-std px-10 z-10"
              onClick={() => navigate("/donation/form")}
            >
              SOLICITAR
            </button>
            <img src={donation02} className="absolute -bottom-2 right-4 w-32 opacity-70 z-0 pointer-events-none rotate-10" />
            <img src={donation02} className="absolute top-2 left-6 w-20 opacity-70 z-0 pointer-events-none -rotate-10" />
          </div>
        )}

        {isMobile ? (
          <h2 className="p-6">
            {isDonator ? "SUAS DOAÇÕES" : "DOAÇÕES ABERTAS"}
          </h2>
        ) : (
          <h1 className="p-10">
            {isDonator ? "SUAS DOAÇÕES" : "DOAÇÕES ABERTAS"}
          </h1>
        )}

        <FeedbackBanner message={message.text} variant={message.type || "error"} />

        {/* --- LISTAGEM --- */}
        <div className="w-full max-w-200 mb-20">
          {loading ? (
            <p className="text-center text-[var(--base-04)]">Carregando...</p>
          ) : itemsList.length === 0 ? (
             <p className="text-center text-[var(--base-04)] mt-4">Nenhum item encontrado.</p>
          ) : (
            <>
              {/* === VISÃO DO DOADOR === */}
              {isDonator && itemsList.map((doacao) => (
                <div
                  key={doacao.id}
                  className={`flex justify-between items-center border border-[var(--base-03)] rounded-lg p-3 mb-4 
                    ${doacao.status === 'CONFIRMADA' ? 'bg-white' : 'bg-[var(--base-02)]'}`}
                >
                  <div>
                    <h3 className="mb-1">{doacao.titulo}</h3>
                    {/* Backend atual não retorna o ponto de arrecadação neste DTO, deixei comentado por enquanto */}
                    {/* {!isMobile && <p>Para: {doacao.pontoDeArrecadamento || "Instituição"}</p>} */}
                    <p className="text-sm">
                      Status: <span className={doacao.status === 'CONFIRMADA' ? "text-green-600 font-bold" : "text-orange-500"}>
                        {doacao.status}
                      </span>
                    </p>
                  </div>

                  {doacao.status === 'CONFIRMADA' ? (
                    <div className="flex items-center">
                        {!isMobile && <Check size={40} color="var(--pink)" className="mr-4" />}
                         {/* Opcional: Botão de excluir para limpar histórico */}
                         <button onClick={() => handleDelete(doacao.id)} className="p-2">
                            <X size={24} color="var(--base-04)" />
                         </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                        <button
                        onClick={() => handleConfirm(doacao.id)}
                        className="flex w-14 h-14 flex-shrink-0 bg-[var(--base-04)] rounded-md justify-center items-center shadow-md hover:bg-[var(--green)] transition-colors"
                        title="Confirmar entrega"
                        >
                        <Check size={40} color="var(--base-01)" />
                        </button>
                        <button
                        onClick={() => handleDelete(doacao.id)}
                        className="flex w-14 h-14 flex-shrink-0 bg-red-400 rounded-md justify-center items-center shadow-md hover:bg-red-500 transition-colors"
                        title="Cancelar doação"
                        >
                        <X size={36} color="white" />
                        </button>
                    </div>
                  )}
                </div>
              ))}

              {/* === VISÃO DA INSTITUIÇÃO === */}
              {!isDonator && itemsList.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border border-[var(--base-03)] rounded-lg p-3 mb-4 bg-white"
                >
                  <div>
                    <h3 className="mb-1">{item.titulo}</h3>
                    {!isMobile && item.pontosArrecadacao && (
                      <p className="text-sm text-[var(--base-05)]">
                         {item.pontosArrecadacao[0]} 
                         {item.pontosArrecadacao.length > 1 && ` (+${item.pontosArrecadacao.length - 1})`}
                      </p>
                    )}
                    <p className="text-sm mt-1">Criado em: {formatDate(item.dataCriacao)}</p>
                    <p className="text-xs text-[var(--base-04)]">Doações recebidas: {item.doacoesRecebidas}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex w-14 h-14 bg-[var(--base-04)] rounded-md justify-center items-center shadow-md hover:opacity-80">
                      <PencilSimple
                        size={36}
                        color="var(--base-01)"
                        onClick={() =>
                          navigate("/donation/form", { state: { doacao: item } })
                        }
                      />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex w-14 h-14 bg-[var(--base-04)] rounded-md justify-center items-center shadow-md hover:bg-red-400 transition-colors"
                    >
                      <X size={36} color="var(--base-01)" />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Donation;