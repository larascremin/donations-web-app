import NavigationBar from "../../components/NavigationBar";
import { useMediaQuery } from "react-responsive";
import home01 from "../../assets/images/cj-home-01.svg";
import home02 from "../../assets/images/cj-home-02.svg";
import home05 from "../../assets/images/cj-home-05.svg";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../../services/Mock";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";

function Home() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const nome = user?.nome;

  const totalDoacoesAbertas = mockUsers.organizacoes.reduce(
    (acc, org) => acc + org.doacoesSolicitadas.length,
    0
  );

  const totalDoacoesRealizadas = mockUsers.doadores.reduce(
    (acc, doador) => acc + doador.doacoesRealizadas.length,
    0
  );

  return (
    <div className="flex">
      <div className={isMobile ? "" : "w-[360px] h-screen"}>
        <NavigationBar />
      </div>
      <div className="flex-1 h-screen flex flex-col justify-between items-center">
        <div
          className={
            isMobile
              ? "flex flex-col items-center gap-5 mt-10"
              : "flex flex-col items-center gap-6 mt-40"
          }
        >
          <h3 className="text-[var(--base-05)] px-15 text-center">
            Bem vindo(a) de volta, {nome}!
          </h3>
          <button
            className="button-std px-12"
            onClick={() => navigate("/finder")}
          >
            DOAR AGORA
          </button>
        </div>
        <div className={isMobile ? "flex flex-col gap-4" : "flex gap-6 "}>
          <div className="text-center bg-[var(--base-02)] py-6 w-62 rounded-lg">
            <h1 className={isMobile ? "text-[4rem] -m-4" : "text-[6rem] -m-4"}>
              {totalDoacoesAbertas}
            </h1>
            <h3>Doações Abertas</h3>
          </div>
          {isMobile ? (
            <></>
          ) : (
            <div className="text-center bg-[var(--base-02)] py-6 w-62 rounded-lg">
              <h1
                className={isMobile ? "text-[4rem] -m-4" : "text-[6rem] -m-4"}
              >
                {totalDoacoesRealizadas}
              </h1>
              <h3>Doações Realizadas</h3>
            </div>
          )}
        </div>
        {isMobile ? (
          <div className="mb-[90px]">
            <img src={home05} className="h-60" />
          </div>
        ) : (
          <div className="w-full flex justify-between items-baseline ">
            <img src={home01} className="h-50" />
            <img src={home02} className="h-100" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
