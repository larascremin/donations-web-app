import { useMediaQuery } from "react-responsive";
import NavigationBar from "../../components/NavigationBar";
import { Check, X, PencilSimple } from "@phosphor-icons/react";
import donation01 from "../../assets/images/cj-donation-01.svg";
import donation02 from "../../assets/images/cj-donation-02.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";

function Donation() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { user, setUser, mockUsers, setMockUsers } = useContext(UserContext);
  const isDonator = user?.role === "DOADOR";

  const formatDate = (dateString) => {
    if (dateString === "HOJE") return "HOJE";

    const date = new Date(dateString.split("-").reverse().join("-"));
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(date);
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
            <img
              src={donation01}
              alt=""
              className="absolute -bottom-2 right-4 w-32 opacity-70 z-0 pointer-events-none rotate-10"
            />
            <img
              src={donation01}
              alt=""
              className="absolute top-2 left-6 w-20 opacity-70 z-0 pointer-events-none -rotate-10"
            />
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
            <img
              src={donation02}
              alt=""
              className="absolute -bottom-2 right-4 w-32 opacity-70 z-0 pointer-events-none rotate-10"
            />
            <img
              src={donation02}
              alt=""
              className="absolute top-2 left-6 w-20 opacity-70 z-0 pointer-events-none -rotate-10"
            />
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

        <div className="w-full max-w-200">
          {isDonator && user?.doacoesRealizadas?.length > 0 && (
            <>
              {user.doacoesRealizadas.map((doacao) => {
                const details = mockUsers.organizacoes
                  .flatMap((org) => org.doacoesSolicitadas)
                  .find((d) => d.id === doacao.id);
                if (!details) return null;
                const handleConfirm = () => {
                  const formattedDate = "HOJE";

                  const updatedUser = {
                    ...user,
                    doacoesRealizadas: user.doacoesRealizadas.map((d) =>
                      d.id === doacao.id
                        ? {
                            ...d,
                            confirmado: true,
                            dataConfirmacao: formattedDate,
                          }
                        : d
                    ),
                  };

                  setUser(updatedUser);

                  const updatedMockUsers = { ...mockUsers };
                  const userIndex = updatedMockUsers.doadores.findIndex(
                    (d) => d.id === user.id
                  );
                  if (userIndex !== -1) {
                    updatedMockUsers.doadores[userIndex] = updatedUser;
                    setMockUsers(updatedMockUsers);
                  }
                };

                return doacao.confirmado ? (
                  <div
                    key={doacao.id}
                    className="flex justify-between items-center border border-[var(--base-03)] rounded-lg p-3 mb-4"
                  >
                    <div>
                      <h3 className="mb-1">{details.titulo}</h3>
                      {!isMobile && <p>Para: {details.pontoDeArrecadamento}</p>}
                      <p>
                        Doado em:{" "}
                        {doacao.dataConfirmacao
                          ? formatDate(doacao.dataConfirmacao)
                          : "PENDENTE"}
                      </p>
                    </div>
                    {!isMobile && (
                      <Check size={40} color="var(--pink)" className="mr-4" />
                    )}
                  </div>
                ) : (
                  <div
                    key={doacao.id}
                    className="flex justify-between items-center border border-[var(--base-03)] bg-[var(--base-02)] rounded-lg p-3 mb-4"
                  >
                    <div>
                      <h3 className="mb-1">{details.titulo}</h3>
                      {!isMobile && <p>Para: {details.pontoDeArrecadamento}</p>}
                      <p>Doado em: PENDENTE</p>
                    </div>
                    <button
                      onClick={handleConfirm}
                      className="flex w-14 h-14 flex-shrink-0 bg-[var(--base-04)] rounded-md justify-center items-center mr-3 shadow-md"
                    >
                      <Check size={40} color="var(--base-01)" />
                    </button>
                  </div>
                );
              })}
            </>
          )}
          {!isDonator &&
            Array.isArray(user?.doacoesSolicitadas) &&
            user.doacoesSolicitadas.length > 0 &&
            user.doacoesSolicitadas.map((doacao) => {
              const dataFormatada = formatDate(doacao.dataCriacao);
              const handleDelete = () => {
                const updatedUser = {
                  ...user,
                  doacoesSolicitadas: user.doacoesSolicitadas.filter(
                    (d) => d.id !== doacao.id
                  ),
                };
                setUser(updatedUser);

                const updatedMockUsers = { ...mockUsers };
                const orgIndex = updatedMockUsers.organizacoes.findIndex(
                  (org) => org.id === user.id
                );
                if (orgIndex !== -1) {
                  updatedMockUsers.organizacoes[orgIndex] = updatedUser;
                  setMockUsers(updatedMockUsers);
                  localStorage.setItem(
                    "mockUsers",
                    JSON.stringify(updatedMockUsers)
                  ); // ✅ garante persistência
                }
              };

              return (
                <div
                  key={doacao.id}
                  className="flex justify-between items-center border border-[var(--base-03)] rounded-lg p-3 mb-4"
                >
                  <div>
                    <h3 className="mb-1">{doacao.titulo}</h3>
                    {!isMobile && (
                      <p>Ponto de arrecadação: {doacao.pontoDeArrecadamento}</p>
                    )}
                    <p>Criado em: {dataFormatada}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex w-14 h-14 bg-[var(--base-04)] rounded-md justify-center items-center shadow-md">
                      <PencilSimple
                        size={36}
                        color="var(--base-01)"
                        onClick={() =>
                          navigate("/donation/form", { state: { doacao } })
                        }
                      />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex w-14 h-14 bg-[var(--base-04)] rounded-md justify-center items-center shadow-md"
                    >
                      <X size={36} color="var(--base-01)" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Donation;
