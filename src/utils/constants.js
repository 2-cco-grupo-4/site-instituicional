export const HEADER_HEIGHT = '56px'

export const ROUTES = {
    HOME: "/",
    REGISTER: profile => (`/cadastro/${profile}`),
    LOGIN: "/login",
    CHOOSE_PROFILE: "/persona"
}

export const PROFILE_TYPES = {
    0: "admin",
    1: "cliente",
    2: "fotógrafo",
}