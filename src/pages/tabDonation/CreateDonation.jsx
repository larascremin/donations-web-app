import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import NavigationBar from "../../components/NavigationBar";
import FeedbackBanner from "../../components/FeedbackBanner";
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
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSave = async () => {
    if (!title || !category || !description || !collectionPoint) {
      setMessage({ text: "Todos os campos precisam ser preenchidos", type: "error" });
      return;
    }

    setMessage({ text: "", type: "" });
    setLoading(true);

    try {
      const payload = {
        titulo: title,
        descricao: description,
        categoria: category,
        pontosArrecadacao: [collectionPoint],
      };

      await api.post("/itens", payload);
      setMessage({ text: "Solicitação criada com sucesso!", type: "success" });
      setTimeout(() => navigate("/donation"), 1500);
    } catch (err) {
      console.error("Erro ao criar solicitação:", err);
      setMessage({
        text: err.response?.data?.message || "Erro ao salvar solicitação. Tente novamente.",
        type: "error",
      });
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

          <label htmlFor="collectionPoint">Ponto de Arrecadação deste Item</label>
          <input
            id="collectionPoint"
            type="text"
            placeholder="Ex: Rua das Flores, 123 - Centro"
            value={collectionPoint}
            onChange={(e) => setCollectionPoint(e.target.value)}
            className="input-login"
          />
        </form>
        <FeedbackBanner message={message.text} variant={message.type || "error"} />
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
