import api from "./api";

export const ALBUM = {
  CADASTRAR: (payload, token) =>
    api.post("/albums", payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  BUSCAR_ALBUM: (idAlbum, token) => api.get(`/albums/album?idAlbum=${idAlbum}`),

  LISTAR: (id, token) => api.get(`/albums?idFotografo=${id}`),

  BUSCAR_CAPAS_ALBUM: (id, token) => api.get(`/albums/capa?idFotografo=${id}`),

  LISTAR_AVALIACOES: (id, token) => api.get(`/avaliacoes?idFotografo=${id}`),
};
