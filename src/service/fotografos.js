import api from "./api";

export const FOTOGRAFO = {
  LISTAR: (token) =>
    api.get("/fotografos", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
