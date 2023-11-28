import api from "./api";

export const TEMA = {
  PESQUISAR_TEMA: (nome) => api.get(`/temas/pesquisar?nome=${nome}`),

  LISTAR_TEMAS: (token) =>
    api.get("/temas", { headers: { Authorization: `Bearer ${token}` } }),
};
