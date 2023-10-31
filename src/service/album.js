import api from "./api";

export const ALBUM = {
  CADASTRAR: (payload, token) =>
    api.post("/albums", payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  BUSCAR_ALBUM: (idAlbum, token) =>
    api.get(`/albums/album?idAlbum=${idAlbum}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  LISTAR: (id, token) =>
    api.get(`/albums?idFotografo=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  LISTAR_AVALIACOES: (id, token) =>
    api.get(`/avaliacoes?idFotografo=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};


