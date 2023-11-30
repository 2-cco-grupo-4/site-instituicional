import api from "./api";

export const CONTRATO = {
  CADASTRAR_ENDERECO: (payload, token) =>
    api.post("/enderecos", payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  CADASTRAR_SESSAO: (payload, token) =>
    api.post("/eventos/contrato", payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  CADASTRAR_PAGAMENTO: (payload, token) =>
    api.post("/eventos/cadastrarPagamento", payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  EXIBIR_CONTRATO: (id, token) =>
    api.get(`/eventos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  EDITAR_PAGAMENTO: (id, sessaoInfo) =>
    api.put(`/eventos/pagamento/${id}`, sessaoInfo),

  EDITAR_ENDERECO: (id, sessaoInfo) => api.put(`/enderecos/${id}`, sessaoInfo),

  EDITAR_SESSAO: (id, sessaoInfo) =>
    api.put(`/eventos/contrato/${id}`, sessaoInfo),

  GET_PAGAMENTO: (id, token) => api.get(`/eventos/pagamento/${id}`),

  GET_ENDERECO: (id, token) => api.get(`/enderecos/${id}`),
};
