import api from "./api";

export const IMAGEM = {
  SALVAR: (token, paylod) =>
    api.post("/imagens", paylod, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  VISUALIZAR: (token) =>
    api.get("/imagens/paths", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
