import api from "./api";

export function getViewBarChartTemaContato() {
  return api.get('/admin/contagem-clientes-semana');
}