import React, { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import NavigationBar from "../../components/NavigationBar";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";

function CreateDonation() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { user, setUser } = useContext(UserContext);
  const doacao = location.state?.doacao || {};
  const [title, setTitle] = useState(doacao.titulo || "");
  const [category, setCategory] = useState(doacao.categoria || "");
  const [description, setDescription] = useState(doacao.descricao || "");
  const [collectionPoint, setCollectionPoint] = useState(
    doacao.pontoDeArrecadamento || ""
  );

  const handleSave = () => {
    if (!title || !category || !description || !collectionPoint) {
      alert("Preencha todos os campos");
      return;
    }
    if (doacao.id) {
      const updatedDoacoes = user.doacoesSolicitadas.map((d) =>
        d.id === doacao.id
          ? {
              ...d,
              titulo: title,
              categoria: category,
              descricao: description,
              pontoDeArrecadamento: collectionPoint,
            }
          : d
      );
      setUser({ ...user, doacoesSolicitadas: updatedDoacoes });
    } else {
      const newDoacao = {
        id: Date.now(),
        titulo: title,
        categoria: category,
        descricao: description,
        pontoDeArrecadamento: collectionPoint,
        dataCriacao: new Date().toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      };

      setUser({
        ...user,
        doacoesSolicitadas: [...user.doacoesSolicitadas, newDoacao],
      });
    }

    navigate("/donation");
  };

  return (
    <div className="flex">
      <div className={isMobile ? "" : "w-[360px] h-screen"}>
        <NavigationBar />
      </div>
      <div
        className={`flex-1 flex flex-col justify-between items-center ${
          isMobile ? "p-4" : "px-10"
        }`}
      >
        {isMobile ? (
          <>
            <h2 className="p-4">CRIAR SOLICITAÇÃO</h2>
            <hr />
          </>
        ) : (
          <h1 className="p-10">CRIAR SOLICITAÇÃO</h1>
        )}
        <form className="max-w-200">
          <label htmlFor="title">Item a ser solicitado</label>
          <input
            id="title"
            type="text"
            placeholder="Ex: Lenço umidecido..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-login mb-6"
          />
          <label htmlFor="category">Categoria do Item</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-login mb-6"
          >
            <option value="">Selecione uma categoria</option>
            <option value="ALIMENTO">ALIMENTO</option>
            <option value="MOBILIA">MOBILIA</option>
            <option value="VESTUARIO">VESTUARIO</option>
            <option value="HIGIENE">HIGIENE</option>
          </select>
          <label htmlFor="description">Breve Descrição</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            cols="40"
            placeholder="Ex: quantidade necessária, marca..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-login mb-6"
          ></textarea>
          <label htmlFor="collectionPoint">
            Pontos de Arrecadação deste Item
          </label>
          <input
            id="collectionPoint"
            type="text"
            placeholder="Ex: Ponto de Coleta, Endereço, Cidade, nº"
            value={collectionPoint}
            onChange={(e) => setCollectionPoint(e.target.value)}
            className="input-login"
          />
        </form>
        <button
          className="button-std w-full max-w-60 mt-10 mb-20"
          onClick={handleSave}
        >
          SALVAR
        </button>
      </div>
    </div>
  );
}

export default CreateDonation;
