import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext()

const defaultValues = {
  autenticado: false,
  nome: 'Admin',
  tipoUsuario: null,
  temas: [],
  token: null
}

export const UserProvider = ({ children }) => {
    const [autenticado, setAutenticado] = useState(defaultValues.autenticado)
    const [name, setName] = useState(defaultValues.name)
    const [email, setEmail] = useState(defaultValues.email)
    const [senha, setSenha] = useState(defaultValues.senha)
    const [token, setToken] = useState(defaultValues.token)

    useEffect(() => {
      if(!!token) {
        setAutenticado(true)
        localStorage.setItem("token", token)
      } else {
        const tokenStorage = localStorage.getItem("token")
        if(!!tokenStorage){
          localStorage.setItem("token", tokenStorage)
          setToken(tokenStorage)
        }
      }
    },[token])

    return (
        <UserContext.Provider 
        value={{
          autenticado, 
          setAutenticado, 
          name, 
          setName, 
          email, 
          setEmail, 
          senha, 
          setSenha,
          token,
          setToken,
          }}
          >
          {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)