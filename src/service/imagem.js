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
  SALVAR_S3: (token, formData, idAlbum) =>
    api.post(`/imagens/album/${idAlbum}/multiUpload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }),
  GET_OBJECT: (idImagem) =>
    api.get(`/imagens/album/${idImagem}`, {
      responseType: "blob",
    }),
  TESTE_FEED: (token, idAlbum) =>
    api.get(`/imagens/feed/${idAlbum}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
