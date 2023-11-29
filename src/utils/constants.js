export const HEADER_HEIGHT = "56px";

export const ROUTES = {
  HOME: "/",
  REGISTER: (profile) => `/cadastro/${profile}`,
  LOGIN: "/login",
  CHAT: "/chat",
  CHOOSE_PROFILE: "/persona",
  FEED: "/explorar",
  DASH_ADMIN: "/dash-admin",
  PREFERENCES: "/preferencias",
  ALBUM: (albumId) => `/album/${albumId}`,
  PERFIL: (idFotografo) => `/perfil-fotografo/${idFotografo}`,
  NOVO_ALBUM: "/cadastro-album",
  DASH_FOTOGRAFO: "/dash-fotografo",
  ARQUIVOS_ADMIN: "/dash-admin/arquivos",
  ARQUIVOS_FOTOGRAFO: "/dash-fotografo/arquivos",
  CALENDARIO: "/calendario",
  ALTERAR_IMAGEM: "/modal-editar-imagem",
};

export const PROFILE_TYPES = {
  0: "admin",
  1: "cliente",
  2: "fotógrafo",
};
