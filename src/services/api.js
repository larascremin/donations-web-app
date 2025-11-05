import axios from "axios";

// Substitua pela URL real do seu backend se for diferente
export const BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: Antes de cada requisição, insere o Token se ele existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor: Se a API retornar 401 (Não autorizado), desloga o usuário
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expirou ou é inválido
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Opcional: Redirecionar para login
      // window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default api;