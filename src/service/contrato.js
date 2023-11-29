import api from "./api"

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
  EDITAR_PAGAMENTO: (payload, token) =>
    api.put(`/eventos/pagamento/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  EDITAR_ENDERECO: (payload, token) =>
    api.put(`/enderecos/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  EDITAR_SESSAO: (payload, token) =>
    api.put(`/eventos/contrato/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),
}
