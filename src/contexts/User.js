import { createContext, useContext, useState } from "react"

const UserContext = createContext()

const defaultValues = {
  isLogged: true,
  userName: 'Ryan Miyazato',
}

export const UserProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(defaultValues.isLogged)
    const [userName, setUserName] = useState(defaultValues.userName)

    return (
        <UserContext.Provider value={{isLogged, setIsLogged, userName, setUserName}}>
          {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)