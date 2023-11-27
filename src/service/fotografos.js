import api from "./api";

export const FOTOGRAFO = {
  LISTAR: (token) =>
    api.get("/fotografos", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  BUSCAR_FOTOGRAFO: (idFotografo, token) =>
    api.get(`/fotografos/buscar/id/${idFotografo}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
