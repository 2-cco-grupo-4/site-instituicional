import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext()

const defaultValues = {
  autenticado: false,
  nome: '',
  tipoUsuario: null,
  temas: [],
  token: null
}

export const UserProvider = ({ children }) => {
    const [autenticado, setAutenticado] = useState(defaultValues.autenticado)
    const [nome, setNome] = useState(defaultValues.nome)
    const [tipoUsuario, setTipoUsuario] = useState(defaultValues.tipoUsuario)
    const [temas, setTemas] = useState(defaultValues.temas)
    const [email, setEmail] = useState(defaultValues.email)
    const [token, setToken] = useState(defaultValues.token)

    useEffect(() => {

      if(!!token) {
        setAutenticado(true)
      } else {
        setAutenticado(false)
      }
      // if(!!token) {
      //   setAutenticado(true)
      //   localStorage.setItem("token", token)
      // } else {
      //   const tokenStorage = localStorage.getItem("token")
      //   if(!!tokenStorage){
      //     localStorage.setItem("token", tokenStorage)
      //     setToken(tokenStorage)
      //   }
      // }
    },[token])

    return (
        <UserContext.Provider 
        value={{
          autenticado, 
          setAutenticado, 
          nome, 
          setNome, 
          tipoUsuario,
          setTipoUsuario,
          temas,
          setTemas,
          email, 
          setEmail, 
          token,
          setToken,
          }}
          >
          {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)