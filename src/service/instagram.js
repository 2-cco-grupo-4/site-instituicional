import api from "./api";

export const INSTAGRAM = {
  CODE_TO_TOKEN: (payload) => api.post("/instagram/access_token", payload),
  LONG_TOKEN: (payload) => api.get("/instagram/long_access_token", payload),
  REFRESH_TOKEN: (usuario) =>
    api.get("/instagram/refresh_access_token", usuario),
};
