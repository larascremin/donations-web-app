import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import NavigationBar from "../../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function CreateDonation() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [collectionPoint, setCollectionPoint] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!title || !category || !description || !collectionPoint) {
      setError("Todos os campos precisam ser preenchidos");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const payload = {
        titulo: title,
        descricao: description,
        categoria: category,
        pontosArrecadacao: [collectionPoint]
      };

      await api.post("/itens", payload);

      alert("Solicitação criada com sucesso!");
      navigate("/donation");

    } catch (err) {
      console.error("Erro ao criar solicitação:", err);
      setError(err.response?.data?.message || "Erro ao salvar solicitação. Tente novamente.");
    } finally {
      setLoading(false);
    }
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

        <form className="max-w-200 w-full" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="title">Item a ser solicitado</label>
          <input
            id="title"
            type="text"
            placeholder="Ex: Lenço umedecido..."
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
            {/* Certifique-se que os valores batem com o ENUM do Java */}
            <option value="ALIMENTO">ALIMENTO</option>
            <option value="MOBILIA">MOBÍLIA</option>
            <option value="VESTUARIO">VESTUÁRIO</option>
            <option value="HIGIENE">HIGIENE</option>
          </select>

          <label htmlFor="description">Breve Descrição</label>
          <textarea
            id="description"
            rows="5"
            placeholder="Ex: quantidade necessária, marca, detalhes..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-login mb-6 resize-none"
          ></textarea>

          <label htmlFor="collectionPoint">
            Ponto de Arrecadação deste Item
          </label>
          <input
            id="collectionPoint"
            type="text"
            placeholder="Ex: Rua das Flores, 123 - Centro"
            value={collectionPoint}
            onChange={(e) => setCollectionPoint(e.target.value)}
            className="input-login"
          />
        </form>

        {/* Exibição de Erro */}
        {error && (
            <h3 className="text-red-700 font-semibold mt-6 text-center bg-red-100 p-2 rounded w-full max-w-200">
                {error}
            </h3>
        )}

        <button
          className={`button-std w-full max-w-60 mt-10 mb-20 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "SALVANDO..." : "SALVAR"}
        </button>
      </div>
    </div>
  );
}

export default CreateDonation;