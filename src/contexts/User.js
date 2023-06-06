import { createContext, useContext, useState } from "react"

const UserContext = createContext()

const defaultValues = {
  autenticado: false,
  id: 1,
  nome: 'Admin',
  tipoUsuario: 0,
  temas: []
}

export const UserProvider = ({ children }) => {
    const [autenticado, setAutenticado] = useState(defaultValues.autenticado)
    const [name, setName] = useState(defaultValues.name)
    const [email, setEmail] = useState(defaultValues.email)
    const [senha, setSenha] = useState(defaultValues.senha)

    return (
        <UserContext.Provider value={{autenticado, setAutenticado, name, setName, email, setEmail, senha, setSenha}}>
          {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)