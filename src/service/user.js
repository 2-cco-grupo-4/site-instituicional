import api from "./api"

export const CLIENTE = {
  CADASTRAR: (payload) => api.post("/clientes/cadastrar", payload),
  ENTRAR: (payload) => api.post("/entrar", payload),
  SAIR: () => api.patch("/clientes/sair", {email: "admin@email.com", senha: "$2a$12$knaHdd7zsqEV70S4gtOJsOtuVzV7q1iIUvE/hVcRJTdyuMl.Rhyo6"}),
}

export const FOTOGRAFO = {
  CADASTRAR: (payload) => api.post("/fotografos/cadastrar", payload),
  ENTRAR: (payload) => api.post("/fotografos/entrar", payload),
  SAIR: () => api.patch("/fotografos/sair"),
}

export const LOGIN = (usuario) => api.post("/login", usuario)
