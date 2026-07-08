import { useState, useEffect, useContext, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { MagnifyingGlass, X, MapPinLine, Funnel } from "@phosphor-icons/react";
import NavigationBar from "../../components/NavigationBar";
import { toast } from "react-toastify";
import DonationCard from "../../components/DonationCard";
import { categoryColors, categoryIcons } from "../../services/Variables";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import api from "../../services/api";
import { logger } from "../../services/logger";

const PAGE_SIZE = 10;

function Finder() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [searchTerm, setSearchTerm] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cidade, setCidade] = useState("");
  const [dataFrom, setDataFrom] = useState("");
  const [dataTo, setDataTo] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [selectedDonation, setSelectedDonation] = useState(null);
  const [comentario, setComentario] = useState("");
  const [donating, setDonating] = useState(false);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    document.body.style.overflow = selectedDonation ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedDonation]);

  const fetchDonations = useCallback(async (pageNum) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.set("search", searchTerm.trim());
      if (categoria) params.set("categoria", categoria);
      if (cidade.trim()) params.set("cidade", cidade.trim());
      if (dataFrom) params.set("dataFrom", `${dataFrom}T00:00:00`);
      if (dataTo) params.set("dataTo", `${dataTo}T23:59:59`);
      params.set("page", pageNum);
      params.set("size", PAGE_SIZE);

      const response = await api.get(`/itens?${params.toString()}`);
      const { content = [] } = response.data;
      const tp = response.data.page?.totalPages ?? 1;

      const formatted = content.map((item) => {
        const dateObj = item.dataCriacao ? new Date(item.dataCriacao) : null;
        const dateLabel =
          dateObj && !isNaN(dateObj.getTime())
            ? dateObj.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
            : "";
        return {
          id: item.id,
          title: item.titulo,
          description: item.descricao,
          category: item.categoria?.toLowerCase() || "outros",
          requester: item.solicitanteNome || "Instituição",
          location: item.pontosArrecadacao?.[0] || "Local não informado",
          date: dateLabel,
          organization: {
            nome: item.solicitanteNome,
            pontosDeArrecadamento: item.pontosArrecadacao || [],
          },
        };
      });

      setDonations(formatted);
      setTotalPages(tp);
      setPage(pageNum);
    } catch (error) {
      logger.error("Erro ao buscar doações:", error);
      toast.error("Erro ao carregar solicitações.");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, categoria, cidade, dataFrom, dataTo]);

  useEffect(() => {
    const timer = setTimeout(() => fetchDonations(0), 400);
    return () => clearTimeout(timer);
  }, [fetchDonations]);

  const handleOpenDonation = (d) => {
    setSelectedDonation(d);
    setComentario("");
  };

  const handleDonate = async () => {
    if (!user) { navigate("/auth"); return; }
    if (!selectedDonation) return;

    setDonating(true);
    try {
      await api.post("/doacoes", {
        titulo: selectedDonation.title,
        descricao: selectedDonation.description,
        categoria: selectedDonation.category.toUpperCase(),
        itemSolicitadoId: selectedDonation.id,
        ...(comentario.trim() ? { comentario: comentario.trim() } : {}),
      });
      toast.success("Doação registrada com sucesso!");
      setSelectedDonation(null);
      navigate("/donation");
    } catch (error) {
      logger.error("Erro ao doar:", error);
      toast.error(error.response?.data?.message || "Erro ao registrar doação.");
    } finally {
      setDonating(false);
    }
  };

  const hasActiveFilters = categoria || cidade || dataFrom || dataTo;

  const clearFilters = () => {
    setCategoria("");
    setCidade("");
    setDataFrom("");
    setDataTo("");
  };

  return (
    <div className="flex">
      <div className={isMobile ? "" : "w-[280px] h-screen"}>
        <NavigationBar />
      </div>

      <div className={`flex-1 flex flex-col items-center overflow-y-auto mb-24 ${isMobile ? "px-4" : "px-10"}`}>
        {isMobile ? (
          <h2 className="text-center p-6">DOAÇÕES SOLICITADAS</h2>
        ) : (
          <h1 className="text-center p-10">DOAÇÕES SOLICITADAS</h1>
        )}

        {/* Barra de busca */}
        <div className="flex items-center w-full max-w-200 gap-2 mb-2">
          <div className="flex-1 flex items-center border border-[var(--base-04)] rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[var(--l-blue)]">
            <MagnifyingGlass size={20} className="text-[var(--base-04)]" />
            <input
              type="text"
              placeholder="Pesquisar por título, categoria ou instituição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-3 w-full bg-transparent outline-none text-[var(--base-06)] placeholder-[var(--base-04)]"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")}>
                <X size={16} color="var(--base-04)" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-1 px-3 py-3 rounded-xl border transition-colors ${
              showFilters || hasActiveFilters
                ? "border-[var(--green)] text-[var(--green)] bg-[var(--bg-green)]"
                : "border-[var(--base-04)] text-[var(--base-04)]"
            }`}
            title="Filtros"
          >
            <Funnel size={20} />
            {hasActiveFilters && (
              <span className="text-xs font-bold">•</span>
            )}
          </button>
        </div>

        {/* Painel de filtros */}
        {showFilters && (
          <div className="w-full max-w-200 border border-[var(--base-03)] rounded-xl p-4 mb-4 bg-[var(--base-02)]">
            <div className={`grid gap-3 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
              <div>
                <label className="text-sm text-[var(--base-05)] mb-1 block">Categoria</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="input-login"
                >
                  <option value="">Todas as categorias</option>
                  <option value="ALIMENTO">Alimento</option>
                  <option value="MOBILIA">Mobília</option>
                  <option value="VESTUARIO">Vestuário</option>
                  <option value="HIGIENE">Higiene</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-[var(--base-05)] mb-1 block">Cidade</label>
                <input
                  type="text"
                  placeholder="Ex: São Paulo"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="input-login"
                />
              </div>

              <div>
                <label className="text-sm text-[var(--base-05)] mb-1 block">De</label>
                <input
                  type="date"
                  value={dataFrom}
                  onChange={(e) => setDataFrom(e.target.value)}
                  className="input-login"
                />
              </div>

              <div>
                <label className="text-sm text-[var(--base-05)] mb-1 block">Até</label>
                <input
                  type="date"
                  value={dataTo}
                  onChange={(e) => setDataTo(e.target.value)}
                  className="input-login"
                />
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-3 text-sm text-[var(--base-04)] hover:text-[var(--base-06)] underline"
              >
                Limpar filtros
              </button>
            )}
          </div>
        )}

        {/* Lista */}
        {loading ? (
          <div className="flex flex-col gap-3 w-full max-w-200 mt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-[var(--base-03)] animate-pulse" />
            ))}
          </div>
        ) : donations.length > 0 ? (
          <>
            {donations.map((d) => (
              <div
                key={d.id}
                onClick={() => handleOpenDonation(d)}
                className="cursor-pointer w-full max-w-200"
              >
                <DonationCard
                  title={d.title}
                  date={d.date}
                  category={d.category}
                  requester={d.requester}
                  location={d.location}
                />
              </div>
            ))}

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex items-center gap-4 mt-6 mb-4 text-[var(--base-05)]">
                <button
                  onClick={() => fetchDonations(page - 1)}
                  disabled={page === 0}
                  className="px-4 py-2 rounded-lg border border-[var(--base-03)] disabled:opacity-40 hover:bg-[var(--base-02)] transition-colors"
                >
                  ← Anterior
                </button>
                <span className="text-sm">
                  Página {page + 1} de {totalPages}
                </span>
                <button
                  onClick={() => fetchDonations(page + 1)}
                  disabled={page + 1 >= totalPages}
                  className="px-4 py-2 rounded-lg border border-[var(--base-03)] disabled:opacity-40 hover:bg-[var(--base-02)] transition-colors"
                >
                  Próxima →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 mt-16 text-[var(--base-04)]">
            <p className="text-lg">Nenhuma solicitação encontrada.</p>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-sm underline hover:text-[var(--base-06)]">
                Limpar filtros
              </button>
            )}
          </div>
        )}

        {/* Modal de detalhes */}
        {selectedDonation && (
          <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50">
            <div
              className={`bg-[var(--base-01)] text-[var(--base-05)] shadow-lg p-6 relative animate-fadeIn
                ${isMobile ? "max-h-screen py-6 overflow-y-auto w-full" : "rounded-2xl w-[90%] max-w-200"}`}
            >
              <button
                onClick={() => setSelectedDonation(null)}
                className="absolute top-4 right-4"
              >
                <X size={30} color="var(--base-03)" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div>
                  <h3>{selectedDonation.organization.nome}</h3>
                </div>
              </div>
              <hr />

              <div className="flex items-center gap-4 mt-6 mb-4">
                {(() => {
                  const color = categoryColors[selectedDonation.category] || "bg-gray-300";
                  const Icon = categoryIcons[selectedDonation.category] || null;
                  return (
                    <div className={`flex items-center gap-1 ${color} p-2 rounded-4xl`}>
                      {Icon && <Icon size={20} color="var(--base-05)" />}
                    </div>
                  );
                })()}
                <h2 className="text-xl font-semibold">{selectedDonation.title}</h2>
              </div>

              <p className="mb-6">{selectedDonation.description || "Sem descrição."}</p>
              <hr />

              <div className="mt-6">
                <p className="font-semibold mb-2">Pontos de arrecadação:</p>
                <div className="flex flex-col gap-2">
                  {selectedDonation.organization.pontosDeArrecadamento?.length > 0 ? (
                    selectedDonation.organization.pontosDeArrecadamento.map((ponto, index) => (
                      <div
                        key={index}
                        className="flex gap-2 bg-[var(--base-02)] rounded-md px-4 py-2 items-center"
                      >
                        <MapPinLine size={20} className="flex-shrink-0" />
                        <h5 className="break-words">{ponto}</h5>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-[var(--base-04)]">Nenhum ponto informado.</p>
                  )}
                </div>
              </div>

              {user?.tipo === "DOADOR" && (
                <>
                  <hr className="my-6" />
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium">
                      Comentário <span className="text-[var(--base-04)] font-normal">(opcional — descreva o que vai entregar)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ex: Tenho 2 caixas de leite e macarrão..."
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      className="input-login resize-none"
                    />
                    <div className="flex justify-center mt-2">
                      <button
                        className={`button-std px-10 ${donating ? "opacity-70 cursor-not-allowed" : ""}`}
                        onClick={handleDonate}
                        disabled={donating}
                      >
                        {donating ? "REGISTRANDO..." : "QUERO DOAR"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Finder;
