import api from "./api";
// const { token, id } = useUserContext();

export const ADMIN = {
  CONTAGEM_TEMA_CONTATO: (token, mes, ano) =>
    api.get(`/dashboard/admin/contagem-tema-contato?mes=${mes}&ano=${ano}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  CONTAGEM_CLIENTES_SEMANA: (token) =>
    api.get("/dashboard/admin/contagem-clientes-semana", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  FAIXA_ETARIA_CLIENTES: (token) =>
    api.get("/dashboard/admin/faixa-etaria-clientes", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  BASE_USUARIOS_CADASTRADOS: (token) =>
    api.get("/dashboard/admin/total-clientes-fotografos", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  CONTATOS_CONVERTIDOS_SESSOES: (token) =>
    api.get("/dashboard/admin/sessoes-finalizadas-canceladas", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  PROGRESSAO_NOVOS_USUARIOS: (token) =>
    api.get("/dashboard/admin/progressao-usuarios-mes", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  PROGRESSAO_SESSOES_MES: (token) =>
    api.get("/dashboard/admin/progressao-sessoes-mes", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  PAGAMENTS_MAIS_UTILIZADOS: (token, mes, ano) =>
    api.get(`/dashboard/admin/formas-pagamento-mais-utilizadas?mes=${mes}&ano=${ano}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  FLUXO_CONVERSAO_SESSOES: (token, mes, ano) =>
    api.get(`/dashboard/admin/fluxo-conversao-contatos?mes=${mes}&ano=${ano}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  ESTADOS_MAIS_SESSOES: (token, mes, ano) =>
    api.get(`/dashboard/admin/estados-mais-sessoes-agendadas?mes=${mes}&ano=${ano}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  KPI_TOTAL_USUARIOS: (token) =>
    api.get("/dashboard/admin/kpi-total-usuarios", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  KPI_SESSOES_REALIZADAS: (token) =>
    api.get("/dashboard/admin/kpi-sessoes-realizadas", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  KPI_TOTAL_ACESSOS: (token) =>
    api.get("/dashboard/admin/kpi-total-acessos", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export const FOTOGRAFO = {
  KPI_VALOR_MEDIO_COBRADO: (token, idFotografo) =>
    // console.log(`Depurador PFFF: ID: ${idFotografo} | Token: ${token}`),
    api.get(`/dashboard/fotografo/valor-medio-cobrado`, {
      params: { idFotografo },
      headers: { Authorization: `Bearer ${token}` },
    }),
  KPI_SESSOES_AGENDADAS_MES: (token, idFotografo) =>
    api.get(`/dashboard/fotografo/sessoes-agendadas-mes`, {
      params: { idFotografo },
      headers: { Authorization: `Bearer ${token}` },
    }),
  KPI_PROPOSTAS_RECEBIDAS_MES: (token, idFotografo) =>
    api.get(`/dashboard/fotografo/propostas-recebidas-mes`, {
      params: { idFotografo },
      headers: { Authorization: `Bearer ${token}` },
    }),
  KPI_VARIACAO_LUCRO_MENSAL: (token, idFotografo) =>
    api.get(`/dashboard/fotografo/variacao-lucro-mensal`, {
      params: { idFotografo },
      headers: { Authorization: `Bearer ${token}` },
    }),
  AVALIACAO_MEDIA_TEMA: (token, idFotografo) =>
    api.get(`/dashboard/fotografo/avaliacao-media-tema`, {
      params: { idFotografo },
      headers: { Authorization: `Bearer ${token}` },
    }),
  VARIACAO_LUCRO_ULTIMOS_MESES: (token, idFotografo) =>
    api.get(`/dashboard/fotografo/variacao-lucro-ultimos-meses`, {
      params: { idFotografo },
      headers: { Authorization: `Bearer ${token}` },
    }),
  CONTATOS_CONVERTIDOS_SESSOES: (token, idFotografo) =>
    api.get(`/dashboard/fotografo/contatos-convertidos-sessoes`, {
      params: { idFotografo },
      headers: { Authorization: `Bearer ${token}` },
    }),
};
