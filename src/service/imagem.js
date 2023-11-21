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
  VISUALIZAR_TEMA: (token, nomeTema) =>
    api.get(`/imagens/paths/${nomeTema}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
