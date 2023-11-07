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
  VISUALIZAR_FOTOGRAFO: (token, idFotografo) =>
    api.get(`/imagens/albumFotografo?idFotografo=${idFotografo}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
