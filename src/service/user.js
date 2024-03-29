import api from "./api";

export const CLIENTE = {
  CADASTRAR: (payload) => api.post("/clientes/cadastrar", payload),
  ENTRAR: (payload) => api.post("/entrar", payload),
  SAIR: (usuario) => api.patch("/sair", usuario),
};

export const FOTOGRAFO = {
  CADASTRAR: (payload) => api.post("/fotografos/cadastrar", payload),
  ENTRAR: (payload) => api.post("/fotografos/entrar", payload),
  SAIR: (usuario) => api.patch("/fotografos/sair", usuario),
  ATUALIZAR_TOKEN_INSTAGRAM: (idFotografo, codigo, token) =>
    api.patch(`/fotografos/atualizarToken`, null, {
      params: { idFotografo, codigo },
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export const LOGIN = (usuario) => api.post("/login", usuario);
