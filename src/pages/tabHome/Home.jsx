import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import NavigationBar from "../../components/NavigationBar";
import home01 from "../../assets/images/cj-home-01.svg";
import home02 from "../../assets/images/cj-home-02.svg";
import home05 from "../../assets/images/cj-home-05.svg";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";
import api from "../../services/api";

function Home() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  const [totalSolicitacoes, setTotalSolicitacoes] = useState(0);
  const [totalDoacoes, setTotalDoacoes] = useState(0);
  const [loading, setLoading] = useState(true);

  const nome = user?.nomeCompleto?.split(" ")[0] || "Visitante";
  const isDoador = user?.tipo === "DOADOR";

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const resItens = await api.get("/itens?size=1");
      setTotalSolicitacoes(resItens.data.totalElements || 0);

      let resDoacoes;
      if (isDoador) {
        resDoacoes = await api.get("/doacoes/me?size=1");
      } else {
        resDoacoes = await api.get("/doacoes?size=1");
      }
      setTotalDoacoes(resDoacoes.data.totalElements || 0);

    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <div className={isMobile ? "" : "w-[360px] h-screen"}>
        <NavigationBar />
      </div>
      <div className="flex-1 h-screen flex flex-col justify-between items-center overflow-y-auto">
        <div
          className={
            isMobile
              ? "flex flex-col items-center gap-5 mt-10 px-4"
              : "flex flex-col items-center gap-6 mt-40"
          }
        >
          <h3 className="text-[var(--base-05)] text-center">
            Bem vindo(a) de volta, <span className="font-bold">{nome}</span>!
          </h3>
          {/* Só mostra o botão de doar se for doador */}
          {isDoador && (
            <button
              className="button-std px-12"
              onClick={() => navigate("/finder")}
            >
              DOAR AGORA
            </button>
          )}
        </div>

        {/* --- CARDS DE ESTATÍSTICA --- */}
        <div className={isMobile ? "flex flex-col gap-4 mt-10" : "flex gap-6"}>
          <div className="text-center bg-[var(--base-02)] py-6 w-62 rounded-lg shadow-sm transition-transform hover:scale-105">
            <h1 className={isMobile ? "text-[4rem] -m-4" : "text-[6rem] -m-4"}>
              {loading ? "-" : totalSolicitacoes}
            </h1>
            <h3>Solicitações Abertas</h3>
          </div>

          {/* Mostra o segundo card se NÃO for mobile, OU se for mobile mostra também */}
          <div className="text-center bg-[var(--base-02)] py-6 w-62 rounded-lg shadow-sm transition-transform hover:scale-105">
            <h1
              className={isMobile ? "text-[4rem] -m-4" : "text-[6rem] -m-4"}
            >
              {loading ? "-" : totalDoacoes}
            </h1>
            <h3>
                {isDoador ? "Minhas Doações" : "Doações Totais"}
            </h3>
          </div>
        </div>

        {/* --- IMAGENS DE FUNDO --- */}
        {isMobile ? (
          <div className="mb-[90px] mt-10">
            <img src={home05} className="h-60" alt="Ilustração home" />
          </div>
        ) : (
          <div className="w-full flex justify-between items-baseline px-10">
            <img src={home01} className="h-50" alt="Ilustração esquerda" />
            <img src={home02} className="h-100" alt="Ilustração direita" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;