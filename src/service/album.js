import api from "./api";

export const ALBUM = {
  CADASTRAR: (payload, token) =>
    api.post("/albums", payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
