import api from "./api";

export const INSTAGRAM = {
  CODIGO_PARA_TOKEN: (token, codigo) =>
    api.post(`/instagram?codigo=${codigo}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  LONG_TOKEN: (token, accessToken) =>
    api.get(`/instagram/longAccessToken?accessToken=${accessToken}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  REFRESH_TOKEN: (token, usuario) =>
    api.get("/instagram/refresh_access_token", usuario, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
