import api from "./api";

export const AVALIACAO = {
  BUSCAR_AVALIACOES_FOTOGRAFO: (idFotografo, token) =>
    api.get(`/avaliacoes?idFotografo=${idFotografo}`),
};
