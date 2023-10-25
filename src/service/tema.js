import api from "./api";

export const TEMA = {
  PESQUISAR_TEMA: (nome) => api.get(`/temas/pesquisar?nome=${nome}`),
};
