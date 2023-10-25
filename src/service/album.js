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
};
