import api from "./api";

export const INSTAGRAM = {
  CODE_TO_TOKEN: (token, codigo) =>
    api.post("/instagram", {
      params: { codigo: codigo },
      headers: { Authorization: `Bearer ${token}` },
    }),
  LONG_TOKEN: (token, payload) =>
    api.get("/instagram/long_access_token", payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  REFRESH_TOKEN: (token, usuario) =>
    api.get("/instagram/refresh_access_token", usuario, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
