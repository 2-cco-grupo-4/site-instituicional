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


}