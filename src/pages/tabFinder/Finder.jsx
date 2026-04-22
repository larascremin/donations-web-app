import { useState, useEffect, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { MagnifyingGlass, X, MapPinLine } from "@phosphor-icons/react";
import NavigationBar from "../../components/NavigationBar";
import DonationCard from "../../components/DonationCard";
import { categoryColors, categoryIcons } from "../../services/Variables";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";
import api from "../../services/api";

function Finder() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = selectedDonation ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedDonation]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await api.get("/itens");

      const listaDoBackend = response.data.content || [];

      const formattedData = listaDoBackend.map((item) => {
        const dateObj = new Date(item.dataCriacao);
        const formattedDate = dateObj.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
        });

        return {
          id: item.id,
          title: item.titulo,
          description: item.descricao,
          category: item.categoria?.toLowerCase() || "outros",
          requester: item.solicitanteNome || "Instituição",
          location: item.pontosArrecadacao?.[0] || "Local não informado",
          date: formattedDate,
          image: null,
          rawDate: dateObj,
          organization: {
            nome: item.solicitanteNome,
            pontosDeArrecadamento: item.pontosArrecadacao || [],
          },
        };
      });
      formattedData.sort((a, b) => b.rawDate - a.rawDate);
      setDonations(formattedData);
    } catch (error) {
      console.error("Erro ao buscar doações:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDonations = donations.filter((donation) => {
    const search = searchTerm.toLowerCase();
    return (
      donation.title.toLowerCase().includes(search) ||
      donation.category.toLowerCase().includes(search) ||
      donation.requester.toLowerCase().includes(search)
    );
  });

  const handleDonate = async () => {
    if (!user) {
      alert("Você precisa fazer login para realizar uma doação.");
      navigate("/auth");
      return;
    }
    if (!selectedDonation) return;

    try {
      await api.post("/doacoes", {
        titulo: selectedDonation.title,
        descricao: selectedDonation.description,
        categoria: selectedDonation.category.toUpperCase(),
        itemSolicitadoId: selectedDonation.id,
      });

      alert("Intenção de doação registrada com sucesso! Veja em 'Minhas Doações'.");
      setSelectedDonation(null);
      navigate("/donation");
    } catch (error) {
      console.error("Erro ao doar:", error);
      alert(
        error.response?.data?.message ||
          "Erro ao registrar doação. Tente novamente."
      );
    }
  };

  return (
    <div className="flex">
      <div className={isMobile ? "" : "w-[360px] h-screen"}>
        <NavigationBar />
      </div>

      <div
        className={`flex-1 flex flex-col items-center overflow-y-auto mb-24 ${
          isMobile ? "px-4" : "px-10"
        }`}
      >
        {isMobile ? (
          <h2 className="text-center p-6">DOAÇÕES SOLICITADAS</h2>
        ) : (
          <h1 className="text-center p-10">DOAÇÕES SOLICITADAS</h1>
        )}
        <div className="flex items-center w-full max-w-200 border border-[var(--base-04)] rounded-xl px-4 py-3 mb-4 shadow-sm focus-within:ring-2 focus-within:ring-[var(--l-blue)]">
          <MagnifyingGlass size={20} className="text-[var(--base-04)]" />
          <input
            type="text"
            placeholder="Digite para pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-3 w-full bg-transparent outline-none text-[var(--base-06)] placeholder-[var(--base-04)]"
          />
        </div>

        {loading ? (
          <p className="mt-10 text-[var(--base-05)]">Carregando doações...</p>
        ) : filteredDonations.length > 0 ? (
          filteredDonations.map((d) => (
            <div
              key={d.id}
              onClick={() => setSelectedDonation(d)}
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
          ))
        ) : (
          <p className="text-[var(--base-05)] mt-10">
            Nenhum resultado encontrado.
          </p>
        )}

        {/* --- MODAL DE DETALHES --- */}
        {selectedDonation && (
          <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50">
            <div
              className={`bg-[var(--base-01)] text-[var(--base-05)] shadow-lg p-6 relative animate-fadeIn
                ${
                  isMobile
                    ? "max-h-screen py-6 overflow-y-auto w-full "
                    : "rounded-2xl w-[90%] max-w-200"
                }
              `}
            >
              <button
                onClick={() => setSelectedDonation(null)}
                className="absolute top-4 right-4 text-[var(--base-05)] hover:text-[var(--base-07)]"
              >
                <X size={30} color="var(--base-03)" />
              </button>
              <div className="flex items-center gap-4 mb-6">
                {/* */}
                {selectedDonation.image && (
                  <img
                    src={selectedDonation.image}
                    alt={selectedDonation.organization.nome}
                    className={`border border-[var(--base-03)] rounded-full ${
                      isMobile ? "h-16" : "h-20"
                    }`}
                  />
                )}
                <div>
                  <h3>{selectedDonation.organization.nome}</h3>
                </div>
              </div>
              <hr />
              <div className="flex items-center gap-4 mt-6 mb-4">
                {(() => {
                  const color =
                    categoryColors[selectedDonation.category] || "bg-gray-300";
                  const Icon = categoryIcons[selectedDonation.category] || null;
                  return (
                    <div
                      className={`flex items-center gap-1 ${color} p-2 rounded-4xl`}
                    >
                      {Icon && <Icon size={20} color="var(--base-05)" />}
                    </div>
                  );
                })()}
                <h2 className="text-xl font-semibold">
                  {selectedDonation.title}
                </h2>
              </div>
              <p className="mb-6">
                {selectedDonation.description || "Sem descrição."}
              </p>
              <hr />
              <div className="mt-6">
                <p className="font-semibold mb-2">Pontos de arrecadação:</p>
                <div className="flex flex-col gap-2">
                  {selectedDonation.organization.pontosDeArrecadamento
                    ?.length > 0 ? (
                    selectedDonation.organization.pontosDeArrecadamento.map(
                      (ponto, index) => (
                        <div
                          key={index}
                          className="flex gap-2 bg-[var(--base-02)] rounded-md px-4 py-2 items-center"
                        >
                          <MapPinLine size={20} className="flex-shrink-0" />
                          <h5 className="break-words">{ponto}</h5>
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-sm text-[var(--base-04)]">
                      Nenhum ponto informado.
                    </p>
                  )}
                </div>
              </div>
              <hr className="my-8" />
              {user?.tipo === "DOADOR" && (
                <div className="flex justify-center">
                  <button className="button-std px-10" onClick={handleDonate}>
                    QUERO DOAR
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Finder;