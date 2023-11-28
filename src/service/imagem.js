import api from "./api";

export const IMAGEM = {
  SALVAR: (token, paylod) => api.post("/imagens", paylod),
  VISUALIZAR: (token) => api.get("/imagens/paths"),
  VISUALIZAR_TEMA: (token, nomeTema) => api.get(`/imagens/paths/${nomeTema}`),
  SALVAR_S3: (token, formData, idAlbum) =>
    api.post(`/imagens/album/${idAlbum}/multiUpload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  GET_OBJECT: (idImagem) =>
    api.get(`/imagens/album/${idImagem}`, {
      responseType: "blob",
    }),
  TESTE_FEED: (token, idAlbum) => api.get(`/imagens/feed/${idAlbum}`),
};
