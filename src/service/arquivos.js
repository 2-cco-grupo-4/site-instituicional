import api from "./api";

export const ARQUIVOS_ADMIN = {
  EXPORTAR_TXT_PREFERENCIAS_TEMAS: (token) => {
    return api.get("/arquivo/preferencias-temas", {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob",
    });
  },

  IMPORTAR_TXT_TEMAS_TAGS: (token, file) => {
    const formData = new FormData();
    formData.append("file", file);

    return api.post("/arquivo/importar-temas-tags", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export const ARQUIVOS_FOTOGRAFO = {
  EXPORTAR_CSV_SESSOES: (token, idFotografo) => {
    return api.get(`/arquivo/sessoes-fotografos?idFotografo=${idFotografo}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob",
    });
  },
};
