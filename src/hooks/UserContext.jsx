import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedToken && storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      } catch (e) {
        console.warn("Dados de usuário corrompidos no localStorage. Limpando...");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoadingUser(false);
  }, []);

  const login = async (email, senha) => {
    try {
      const responseAuth = await api.post("/auth/login", { email, senha });
      const { token } = responseAuth.data;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const responseUser = await api.get("/users/me");
      const userData = responseUser.data;

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

    } catch (error) {
      logout();
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    api.defaults.headers.common["Authorization"] = null;
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
}