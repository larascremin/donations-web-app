import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { MagnifyingGlass, X, MapPinLine } from "@phosphor-icons/react";
import NavigationBar from "../../components/NavigationBar";
import DonationCard from "../../components/DonationCard";
import finder01 from "../../assets/images/cj-finder-01.svg";
import { categoryColors, categoryIcons } from "../../services/Variables";

function Finder() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDonation, setSelectedDonation] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedDonation ? "hidden" : "auto";
  }, [selectedDonation]);

  const donations = [
    {
      title: "Fraldas Tamanho PP",
      date: "24/08",
      category: "higiene",
      requester: "Paróquia de São Ludgero",
      location: 4,
    },
    {
      title: "Cobertores de Solteiro",
      date: "02/09",
      category: "vestuario",
      requester: "Abrigo Esperança",
      location: 6,
    },
    {
      title: "Cesta Básica Completa",
      date: "10/09",
      category: "alimento",
      requester: "Centro Social Santa Clara",
      location: 8,
    },
    {
      title: "Berço Infantil",
      date: "15/09",
      category: "mobilia",
      requester: "Creche Anjo da Guarda",
      location: 1,
    },
    {
      title: "Pacotes de Leite em Pó",
      date: "20/09",
      category: "alimento",
      requester: "Casa do Menino Jesus",
      location: 12,
    },
    {
      title: "Roupas de Bebê (0 a 6 meses)",
      date: "25/09",
      category: "vestuario",
      requester: "Projeto Vida Nova",
      location: 5,
    },
    {
      title: "Kit de Higiene Pessoal",
      date: "28/09",
      category: "higiene",
      requester: "Lar São Vicente de Paulo",
      location: 10,
    },
    {
      title: "Colchão de Solteiro",
      date: "03/10",
      category: "mobilia",
      requester: "Associação Cuidar+",
      location: 2,
    },
    {
      title: "Cestas de Alimentos Não Perecíveis",
      date: "07/10",
      category: "alimento",
      requester: "Igreja Batista Central",
      location: 7,
    },
    {
      title: "Casacos de Inverno Adulto",
      date: "12/10",
      category: "vestuario",
      requester: "Instituto Luz do Amanhã",
      location: 9,
    },
  ];

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
        className={`flex-1 flex flex-col items-center overflow-y-auto ${
          isMobile ? "px-4" : "px-10"
        }`}
      >
        {isMobile ? (
          <h2 className="text-center p-6">DOAÇÕES SOLICITADAS</h2>
        ) : (
          <h1 className="text-center p-10">DOAÇÕES SOLICITADAS</h1>
        )}

        {/* 🔍 Search bar */}
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
              className={`bg-[var(--base-01)] text-[var(--base-05)] rounded-2xl shadow-lg p-6 relative animate-fadeIn ${
                isMobile ? "h-screen py-12" : "w-[90%] max-w-200"
              }`}
            >
              <button
                onClick={() => setSelectedDonation(null)}
                className="absolute top-4 right-4 text-[var(--base-05)] hover:text-[var(--base-07)]"
              >
                <X size={30} color="var(--base-03)" />
              </button>
              <div className="flex items-center gap-4 mb-6">
                <img src={finder01} className={isMobile ? "h-16" : ""} />
                <div>
                  <h3>Pastoral de São Ludgero</h3>
                  <p>34 solicitações abertas</p>
                </div>
              </div>
              <hr />
              <div className="flex items-center gap-2 mt-6 mb-3">
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
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Ut euismod, nulla in dapibus vehicula ."}
              </p>
              <hr />
              <div className="mt-6">
                <p>Pontos de arrecadamento:</p>
                <div className="flex flex-col gap-2 mt-2">
                  {/* quando tiver dados fazer map p nao ter repeticao de codigo */}
                  <div className="flex gap-2 bg-[var(--base-02)] rounded-md px-2 py-1.5 items-center">
                    <MapPinLine size={20} />
                    <h5>Panificadora Phillipe, Rua ababzzb, nº 253</h5>
                  </div>
                  <div className="flex gap-2 bg-[var(--base-02)] rounded-md px-2 py-1.5 items-center">
                    <MapPinLine size={20} />
                    <h5>Predio Projedata, Rua ababzzb, nº 456</h5>
                  </div>
                  <div className="flex gap-2 bg-[var(--base-02)] rounded-md px-2 py-1.5 items-center">
                    <MapPinLine size={20} />
                    <h5>Bloco A e B na Unibve, Rua ababzzb, nº 026</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Finder;
