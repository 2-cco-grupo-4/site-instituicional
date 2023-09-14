import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext()

const defaultValues = {
  autenticado: true,
  id: null,
  nome: null,
  tipoUsuario: null,
  temas: [],
  token: null
}

export const UserProvider = ({ children }) => {
  const [autenticado, setAutenticado] = useState(defaultValues.autenticado)
  const [id, setId] = useState(defaultValues.id)
  const [nome, setNome] = useState(defaultValues.nome)
  const [tipoUsuario, setTipoUsuario] = useState(defaultValues.tipoUsuario)
  const [temas, setTemas] = useState(defaultValues.temas)
  const [token, setToken] = useState(defaultValues.token)

  useEffect(() => {
    if (!!token) {
      setAutenticado(true)
      localStorage.setItem("token", token)
    } else {
      const tokenStorage = localStorage.getItem("token")
      if (!!tokenStorage) {
        localStorage.setItem("token", tokenStorage)
        setToken(tokenStorage)
      }
    }
  }, [token])

  useEffect(() => {
    if (!!nome) {
      localStorage.setItem("nome", nome)
    } else {
      const nomeStorage = localStorage.getItem("nome")
      if (!!nomeStorage) {
        localStorage.setItem("nome", nome)
        setNome(nomeStorage)
      }
    }
  })

  return (
    <UserContext.Provider
      value={{
        autenticado,
        setAutenticado,
        id,
        setId,
        nome,
        setNome,
        tipoUsuario,
        setTipoUsuario,
        temas,
        setTemas,
        token,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)