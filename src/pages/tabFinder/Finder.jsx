import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { MagnifyingGlass, X, MapPinLine } from "@phosphor-icons/react";
import NavigationBar from "../../components/NavigationBar";
import DonationCard from "../../components/DonationCard";
import { categoryColors, categoryIcons } from "../../services/Variables";
import { mockUsers } from "../../services/Mock";

function Finder() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDonation, setSelectedDonation] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedDonation ? "hidden" : "auto";
  }, [selectedDonation]);

  const donations = mockUsers.organizacoes
    .flatMap((org) =>
      org.doacoesSolicitadas.map((d) => {
        const [dia, mes] = d.dataCriacao.split("-");
        const formattedDate = `${dia}/${mes}`;

        return {
          title: d.titulo,
          description: d.descricao,
          category: d.categoria.toLowerCase(),
          requester: org.nome,
          location: d.pontoDeArrecadamento,
          city: org.cidade,
          id: `${org.id}-${d.titulo}`,
          date: formattedDate,
          image: org.imagem,
          rawDate: new Date(2025, parseInt(mes) - 1, parseInt(dia)),
          organization: {
            nome: org.nome,
            doacoesSolicitadas: org.doacoesSolicitadas,
            pontosDeArrecadamento: Array.isArray(d.pontoDeArrecadamento)
              ? d.pontoDeArrecadamento
              : [d.pontoDeArrecadamento],
          },
        };
      })
    )
    .sort((a, b) => b.rawDate - a.rawDate);

  const filteredDonations = donations.filter((donation) => {
    const search = searchTerm.toLowerCase();
    return (
      donation.title.toLowerCase().includes(search) ||
      donation.category.toLowerCase().includes(search) ||
      donation.requester.toLowerCase().includes(search)
    );
  });

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
        {filteredDonations.length > 0 ? (
          filteredDonations.map((d, i) => (
            <div
              key={i}
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
        {selectedDonation && (
          <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50">
            <div
              className={`bg-[var(--base-01)] text-[var(--base-05)]  shadow-lg p-6 relative animate-fadeIn
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
                <img
                  src={selectedDonation.image}
                  className={`border border-[var(--base-03)] rounded-full ${
                    isMobile ? "h-16" : "h-20"
                  }`}
                />
                <div>
                  <h3>{selectedDonation.organization.nome}</h3>
                  <p>
                    {selectedDonation.organization.doacoesSolicitadas?.length ||
                      0}{" "}
                    solicitações abertas
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex items-center gap-4 mt-6 mb-4">
                {(() => {
                  const color =
                    categoryColors[selectedDonation.category.toLowerCase()] ||
                    "bg-gray-300";
                  const Icon =
                    categoryIcons[selectedDonation.category.toLowerCase()] ||
                    null;
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
                {selectedDonation.description ||
                  "Descrição não informada para esta doação."}
              </p>
              <hr />
              <div className="mt-6">
                <p>Pontos de arrecadamento:</p>
                <div className="flex flex-col gap-2 mt-2">
                  {selectedDonation.organization.pontosDeArrecadamento
                    ?.length ? (
                    selectedDonation.organization.pontosDeArrecadamento.map(
                      (ponto, index) => (
                        <div
                          key={index}
                          className="flex gap-2 bg-[var(--base-02)] rounded-md px-4 py-2 items-center"
                        >
                          <MapPinLine size={20} />
                          <h5>{ponto}</h5>
                        </div>
                      )
                    )
                  ) : (
                    <p>Nenhum ponto de arrecadação informado.</p>
                  )}
                </div>
              </div>
              <hr className="my-8" />
              <div className="flex justify-center">
                <button className="button-std px-10">QUERO DOAR</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Finder;
