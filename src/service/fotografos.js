import api from "./api";

export const FOTOGRAFO = {
  LISTAR: (token) => api.get("/fotografos"),

  BUSCAR_FOTOGRAFO: (idFotografo, token) =>
    api.get(`/fotografos/buscar/id/${idFotografo}`),
};
