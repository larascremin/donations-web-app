import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import NavigationBar from "../../components/NavigationBar";
import PasswordInput from "../../components/PasswordInput";
import profile01 from "../../assets/images/cj-profile-01.svg";
import { UserContext } from "../../hooks/UserContext";

function Profile() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const isDoador = user?.role === "DOADOR";

  useEffect(() => {
    if (user) {
      setName(user.nome || "");
      setEmail(user.email || "");
      setPassword(user.senha || "");
      if (!isDoador) {
        setPhone(user.telefone || "");
        setCity(user.cidade || "");
        setStreet(user.rua || "");
        setNeighborhood(user.bairro || "");
        setNumber(user.numero || "");
      }
    }
  }, [user, isDoador]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      nome: name,
      email,
      senha: password,
      ...(isDoador
        ? {}
        : {
            telefone: phone,
            cidade: city,
            rua: street,
            bairro: neighborhood,
            numero: number,
          }),
    };

    setUser(updatedUser);
  };

  return (
    <div className="flex">
      <div className={isMobile ? "" : "w-[360px] h-screen"}>
        <NavigationBar />
      </div>
      <div className="flex-1 flex flex-col items-center overflow-y-auto">
        <div className="w-full">
          <div
            className={`w-full bg-[var(--blue)] rounded-b-2xl ${
              isMobile ? "h-30" : "h-40"
            }`}
          ></div>
          {isMobile ? (
            <></>
          ) : (
            <img
              src={!isDoador && user?.imagem ? user.imagem : profile01}
              className={`h-40 -mt-20 ml-20 ${
                !isDoador
                  ? "rounded-full border border-2 border-[var(--base-04)]"
                  : ""
              }`}
            />
          )}
        </div>
        {isMobile ? (
          <img
            src={!isDoador && user?.imagem ? user.imagem : profile01}
            className={`h-30 -mt-16 mb-10 ${
              !isDoador
                ? "rounded-full border border-2 border-[var(--base-04)]"
                : ""
            }`}
          />
        ) : (
          <></>
        )}
        <form className="w-full max-w-200 px-4 mb-30" onSubmit={handleUpdate}>
          {isMobile ? <></> : <h2 className="mb-10">Seus Dados</h2>}
          <label htmlFor="name">
            {isDoador ? "Nome completo" : "Nome da Org/Instituição"}
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-login mb-6"
          />

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="text"
            placeholder="exemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-login mb-6 w-full"
          />
          {!isDoador ? (
            <>
              <label htmlFor="phone">Telefone de Contato</label>
              <input
                id="phone"
                type="text"
                placeholder="(00) 0 0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-login mb-6"
              />
              <label htmlFor="city">Cidade</label>
              <input
                id="city"
                type="text"
                placeholder="Cidade"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-login mb-6 w-full"
              />
              <label htmlFor="street">Endereço</label>
              <input
                id="street"
                type="text"
                placeholder="Rua"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="input-login mb-6 w-full"
              />
              <div className="flex w-full">
                <div className="flex flex-col w-full mr-10">
                  <label htmlFor="neighborhood">Bairro</label>
                  <input
                    id="neighborhood"
                    type="text"
                    placeholder="Bairro"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="input-login mb-6 w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="number">Número</label>
                  <input
                    id="number"
                    type="text"
                    placeholder="000"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="input-login mb-6 w-full"
                  />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <label htmlFor="password">Senha</label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-end mt-10">
            <button
              type="submit"
              className={`button-std ${isMobile ? "w-full" : "w-60"}`}
            >
              ATUALIZAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
