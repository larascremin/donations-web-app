import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import NavigationBar from "../../components/NavigationBar";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

function CreateDonation() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const doacao = location.state?.doacao || null;
  const isEditing = !!doacao;

  const [title, setTitle] = useState(doacao?.titulo || "");
  const [category, setCategory] = useState(doacao?.categoria || "");
  const [description, setDescription] = useState(doacao?.descricao || "");
  const [collectionPoint, setCollectionPoint] = useState(doacao?.pontosArrecadacao?.[0] || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title || !category || !description || !collectionPoint) {
      toast.error("Todos os campos precisam ser preenchidos");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        titulo: title,
        descricao: description,
        categoria: category,
        pontosArrecadacao: [collectionPoint],
      };

      if (isEditing) {
        await api.put(`/itens/${doacao.id}`, payload);
        toast.success("Solicitação atualizada com sucesso!");
      } else {
        await api.post("/itens", payload);
        toast.success("Solicitação criada com sucesso!");
      }

      setTimeout(() => navigate("/donation"), 1500);
    } catch (err) {
      console.error("Erro ao salvar solicitação:", err);
      toast.error(err.response?.data?.message || "Erro ao salvar solicitação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <div className={isMobile ? "" : "w-[360px] h-screen"}>
        <NavigationBar />
      </div>
      <div className={`flex-1 flex flex-col justify-between items-center ${isMobile ? "p-4" : "px-10"}`}>
        {isMobile ? (
          <>
            <h2 className="p-4">{isEditing ? "EDITAR SOLICITAÇÃO" : "CRIAR SOLICITAÇÃO"}</h2>
            <hr />
          </>
        ) : (
          <h1 className="p-10">{isEditing ? "EDITAR SOLICITAÇÃO" : "CRIAR SOLICITAÇÃO"}</h1>
        )}

        <form className="max-w-200 w-full" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="title">Item a ser solicitado</label>
          <input id="title" type="text" placeholder="Ex: Lenço umedecido..."
            value={title} onChange={(e) => setTitle(e.target.value)}
            className="input-login mb-6"
          />

          <label htmlFor="category">Categoria do Item</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="input-login mb-6">
            <option value="">Selecione uma categoria</option>
            <option value="ALIMENTO">ALIMENTO</option>
            <option value="MOBILIA">MOBÍLIA</option>
            <option value="VESTUARIO">VESTUÁRIO</option>
            <option value="HIGIENE">HIGIENE</option>
          </select>

          <label htmlFor="description">Breve Descrição</label>
          <textarea id="description" rows="5" placeholder="Ex: quantidade necessária, marca, detalhes..."
            value={description} onChange={(e) => setDescription(e.target.value)}
            className="input-login mb-6 resize-none"
          ></textarea>

          <label htmlFor="collectionPoint">Ponto de Arrecadação deste Item</label>
          <input id="collectionPoint" type="text" placeholder="Ex: Rua das Flores, 123 - Centro"
            value={collectionPoint} onChange={(e) => setCollectionPoint(e.target.value)}
            className="input-login"
          />
        </form>

        <button
          className={`button-std w-full max-w-60 mt-10 mb-20 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "SALVANDO..." : isEditing ? "ATUALIZAR" : "SALVAR"}
        </button>
      </div>
    </div>
  );
}

export default CreateDonation;
