import api from "./api";


export const FOTOGRAFO = {
  LISTAR_EVENTOS: (idfotografo, token) => api.get(`/eventos/sessoes/${idfotografo}`, {
    headers: { Authorization: `Bearer ${token}` }, 
  }), 

  CADASTRAR_EVENTO: (payload, token) => api.post("/eventos/cadastrarExterno", payload, {
    headers: { Authorization: `Bearer ${token}` }, 
  })

}