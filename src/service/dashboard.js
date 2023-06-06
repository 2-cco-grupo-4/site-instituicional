import api from "./api";

export const ADMIN = {
  CONTAGEM_TEMA_CONTATO: api.get('/admin/contagem-tema-contato'),
  CONTAGEM_CLIENTES_SEMANA: api.get('/admin/contagem-clientes-semana'),
  FAIXA_ETARIA_CLIENTES: api.get('/admin/faixa-etaria-clientes'),
  FAIXA_ETARIA_CLIENTES_TEMA: (tema) => api.get(`/admin/faixa-etaria-clientes-tema/${tema}`),
  TOTAL_CLIENTES_FOTOGRAFOS: api.get('/admin/total-clientes-fotografos'),

}