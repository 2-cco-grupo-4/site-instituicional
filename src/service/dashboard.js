import api from "./api";

export const ADMIN = {
  CONTAGEM_TEMA_CONTATO: (token) =>
    api.get("/admin/contagem-tema-contato", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  CONTAGEM_CLIENTES_SEMANA: (token) =>
    api.get("/admin/contagem-clientes-semana", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  FAIXA_ETARIA_CLIENTES: (token) =>
    api.get("/admin/faixa-etaria-clientes", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  KPI_TOTAL_USUARIOS: (token) =>
    api.get("/admin/kpi-total-usuarios", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  KPI_SESSOES_REALIZADAS: (token) =>
    api.get("/admin/kpi-sessoes-realizadas", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  KPI_TOTAL_ACESSOS: (token) =>
    api.get("/admin/kpi-total-acessos", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
