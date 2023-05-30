import { createContext, useContext, useState } from "react"

const UserContext = createContext()

const defaultValues = {
  isLogged: true,
  name: 'Admin',
  email: 'ryan@email.com',
  senha: '1234'
}

export const UserProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(defaultValues.isLogged)
    const [name, setName] = useState(defaultValues.name)
    const [email, setEmail] = useState(defaultValues.email)
    const [senha, setSenha] = useState(defaultValues.senha)

    return (
        <UserContext.Provider value={{isLogged, setIsLogged, name, setName, email, setEmail, senha, setSenha}}>
          {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)