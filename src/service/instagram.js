import api from "./api";

export const INSTAGRAM = {
  CODE_TO_TOKEN: (codigo) => api.post("/instagram", codigo),
  LONG_TOKEN: (payload) => api.get("/instagram/long_access_token", payload),
  REFRESH_TOKEN: (usuario) =>
    api.get("/instagram/refresh_access_token", usuario),
};
