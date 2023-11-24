import api from "./api";

export const PESQUISA = {
  TERMO: (termo, token) =>
    api.get(`/pesquisa?termo=${termo}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
