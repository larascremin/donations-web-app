import { useMediaQuery } from "react-responsive";
import NavigationBar from "../../components/NavigationBar";
import { Check, X, PencilSimple } from "@phosphor-icons/react";
import donation01 from "../../assets/images/cj-donation-01.svg";
import donation02 from "../../assets/images/cj-donation-02.svg";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import api from "../../services/api";
import { logger } from "../../services/logger";

function Donation() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { user } = useContext(UserContext);
  const [itemsList, setItemsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const isDonator = user?.tipo === "DOADOR";

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = isDonator
        ? await api.get("/doacoes/me")
        : await api.get("/itens/me");
      setItemsList(response.data.content || []);
    } catch (error) {
      logger.error("Erro ao buscar dados:", error);
      toast.error("Não foi possível carregar as doações.");
    } finally {
      setLoading(false);
    }
  }, [isDonator]);

  useEffect(() => {
    if (user) fetchData();
  }, [user, fetchData]);

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

  const confirmToast = (message, onConfirm) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="font-semibold mb-3">{message}</p>
          <div className="flex gap-2">
            <button
              className="bg-red-500 text-white px-4 py-1 rounded font-medium"
              onClick={() => {
                closeToast();
                onConfirm();
              }}
            >
              Sim
            </button>
            <button
              className="bg-gray-200 text-gray-700 px-4 py-1 rounded font-medium"
              onClick={closeToast}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false }
    );
  };

  const handleConfirm = (id) => {
    confirmToast("Confirmar entrega desta doação?", async () => {
      try {
        await api.put(`/doacoes/${id}`);
        toast.success("Doação confirmada!");
        fetchData();
      } catch (error) {
        logger.error("Erro ao confirmar:", error);
        toast.error("Erro ao confirmar doação.");
      }
    });
  };

  const handleDelete = (id) => {
    const msg = isDonator
      ? "Cancelar esta doação? Essa ação não pode ser desfeita."
      : "Excluir esta solicitação? Todas as doações vinculadas também serão removidas.";

    confirmToast(msg, async () => {
      try {
        await api.delete(isDonator ? `/doacoes/${id}` : `/itens/${id}`);
        setItemsList((prev) => prev.filter((item) => item.id !== id));
        toast.success(isDonator ? "Doação cancelada." : "Solicitação excluída.");
      } catch (error) {
        logger.error("Erro ao deletar:", error);
        if (error.response?.status === 403) {
          toast.error("Você não pode excluir a solicitação de outra instituição.");
        } else {
          toast.error("Erro ao excluir. Tente novamente.");
        }
      }
    });
  };

  const visibleItems = isDonator && statusFilter
    ? itemsList.filter((item) => item.status === statusFilter)
    : itemsList;

  return (
    <div className="flex">
      <div className={isMobile ? "" : "w-[280px] h-screen"}>
        <NavigationBar />
      </div>
      <div className={`flex-1 flex flex-col items-center overflow-y-auto ${isMobile ? "p-4" : "px-10 py-10"}`}>

        {isDonator ? (
          <div className="relative w-full flex flex-col justify-center items-center bg-[var(--l-pink)] max-w-140 py-6 gap-4 rounded-2xl overflow-hidden">
            <h2 className="z-10">{isMobile ? "Faça uma nova doação" : "Faça uma nova doação agora"}</h2>
            <button className="button-std z-10 px-10" onClick={() => navigate("/finder")}>QUERO DOAR</button>
            <img src={donation01} className="absolute -bottom-2 right-4 w-32 opacity-70 z-0 pointer-events-none rotate-10" />
            <img src={donation01} className="absolute top-2 left-6 w-20 opacity-70 z-0 pointer-events-none -rotate-10" />
          </div>
        ) : (
          <div className="relative w-full flex flex-col justify-center items-center bg-[var(--l-blue)] max-w-140 py-6 gap-4 rounded-2xl overflow-hidden">
            <h2 className="z-10">Solicite uma nova doação</h2>
            <button className="button-std px-10 z-10" onClick={() => navigate("/donation/form")}>SOLICITAR</button>
            <img src={donation02} className="absolute -bottom-2 right-4 w-32 opacity-70 z-0 pointer-events-none rotate-10" />
            <img src={donation02} className="absolute top-2 left-6 w-20 opacity-70 z-0 pointer-events-none -rotate-10" />
          </div>
        )}

        <div className="w-full max-w-200 mt-6 mb-2 flex items-center justify-between">
          {isMobile ? (
            <h2>{isDonator ? "SUAS DOAÇÕES" : "DOAÇÕES ABERTAS"}</h2>
          ) : (
            <h1>{isDonator ? "SUAS DOAÇÕES" : "DOAÇÕES ABERTAS"}</h1>
          )}

          {isDonator && itemsList.length > 0 && (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border border-[var(--base-03)] rounded-lg px-3 py-2 bg-[var(--base-01)] text-[var(--base-05)]"
            >
              <option value="">Todos os status</option>
              <option value="PENDENTE">Pendentes</option>
              <option value="CONFIRMADA">Confirmadas</option>
            </select>
          )}
        </div>

        <div className="w-full max-w-200 mb-20">
          {loading ? (
            <div className="flex flex-col gap-3 mt-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 rounded-xl bg-[var(--base-03)] animate-pulse" />
              ))}
            </div>
          ) : visibleItems.length === 0 ? (
            <div className="flex flex-col items-center gap-4 mt-10 text-[var(--base-04)]">
              <p>
                {statusFilter
                  ? `Nenhuma doação com status "${statusFilter}".`
                  : isDonator
                  ? "Você ainda não fez nenhuma doação."
                  : "Você ainda não tem solicitações abertas."}
              </p>
              {!statusFilter && (
                <button
                  className="button-std px-8"
                  onClick={() => navigate(isDonator ? "/finder" : "/donation/form")}
                >
                  {isDonator ? "ENCONTRAR DOAÇÕES" : "CRIAR SOLICITAÇÃO"}
                </button>
              )}
            </div>
          ) : (
            <>
              {isDonator && visibleItems.map((doacao) => (
                <div key={doacao.id}
                  className={`flex justify-between items-center border border-[var(--base-03)] rounded-lg p-3 mb-4
                    ${doacao.status === "CONFIRMADA" ? "bg-white" : "bg-[var(--base-02)]"}`}
                >
                  <div>
                    <h3 className="mb-1">{doacao.titulo}</h3>
                    {doacao.comentario && (
                      <p className="text-xs text-[var(--base-04)] mb-1 italic">"{doacao.comentario}"</p>
                    )}
                    <p className="text-sm">
                      Status:{" "}
                      <span className={
                        doacao.status === "CONFIRMADA"
                          ? "text-green-600 font-bold"
                          : "text-orange-500"
                      }>
                        {doacao.status}
                      </span>
                    </p>
                  </div>
                  {doacao.status === "CONFIRMADA" ? (
                    <div className="flex items-center">
                      {!isMobile && <Check size={40} color="var(--pink)" className="mr-4" />}
                      <button onClick={() => handleDelete(doacao.id)} className="p-2" title="Remover">
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

              {!isDonator && visibleItems.map((item) => (
                <div key={item.id}
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
                    <p className="text-xs text-[var(--base-04)]">
                      Doações recebidas: <span className="font-semibold">{item.doacoesRecebidas}</span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="flex w-14 h-14 bg-[var(--base-04)] rounded-md justify-center items-center shadow-md hover:opacity-80"
                      onClick={() => navigate("/donation/form", { state: { doacao: item } })}
                      title="Editar"
                    >
                      <PencilSimple size={36} color="var(--base-01)" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex w-14 h-14 bg-[var(--base-04)] rounded-md justify-center items-center shadow-md hover:bg-red-400 transition-colors"
                      title="Excluir"
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
