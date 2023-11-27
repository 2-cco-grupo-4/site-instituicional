import api from "./api";

export const TEMA = {
  PESQUISAR_TEMA: (nome) => api.get(`/temas/pesquisar?nome=${nome}`),
  LISTAR_TEMA: (payload, token) =>
    api.get("/temas", payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
