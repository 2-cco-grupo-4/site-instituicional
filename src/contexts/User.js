import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const defaultValues = {
  autenticado: false,
  id: null,
  nome: null,
  tipoUsuario: null,
  temas: [],
  token: null,
  tokenSolicitacao: null,
};

export const UserProvider = ({ children }) => {
  const [autenticado, setAutenticado] = useState(defaultValues.autenticado);
  const [id, setId] = useState(defaultValues.id);
  const [nome, setNome] = useState(defaultValues.nome);
  const [tipoUsuario, setTipoUsuario] = useState(defaultValues.tipoUsuario);
  const [temas, setTemas] = useState(defaultValues.temas);
  const [token, setToken] = useState(defaultValues.token);
  const [tokenSolicitacao, setTokenSolicitacao] = useState(null);

  useEffect(() => {
    if (!!token) {
      setAutenticado(true);
      localStorage.setItem("token", token);
    } else {
      const tokenStorage = localStorage.getItem("token");
      if (!!tokenStorage) {
        localStorage.setItem("token", tokenStorage);
        setToken(tokenStorage);
      }
    }
  }, [token]);

  useEffect(() => {
    if (!!nome) {
      localStorage.setItem("nome", nome);
    } else {
      const nomeStorage = localStorage.getItem("nome");
      if (!!nomeStorage) {
        localStorage.setItem("nome", nome);
        setNome(nomeStorage);
      }
    }
  }, [nome]);

  useEffect(() => {
    if (!!id) {
      localStorage.setItem("id", id);
    } else {
      const idStorage = localStorage.getItem("id");
      if (!!idStorage) {
        localStorage.setItem("id", idStorage);
        setId(idStorage);
      }
    }
  }, [id]);

  useEffect(() => {
    if (!!tipoUsuario) {
      localStorage.setItem("tipoUsuario", tipoUsuario);
    } else {
      const tipoUsuarioStorage = localStorage.getItem("tipoUsuario");
      if (!!tipoUsuarioStorage) {
        localStorage.setItem("tipoUsuario", tipoUsuarioStorage);
        setTipoUsuario(tipoUsuarioStorage);
      }
    }
  }, [tipoUsuario]);

  useEffect(() => {
    if (!!temas) {
      localStorage.setItem("temas", temas);
    } else {
      const temasStorage = localStorage.getItem("temas");
      if (!!temasStorage) {
        localStorage.setItem("temas", temasStorage);
        setTemas(temasStorage);
      }
    }
  }, [temas]);

  useEffect(() => {
    if (!!tokenSolicitacao) {
      localStorage.setItem("tokenSolicitacao", tokenSolicitacao);
    } else {
      const tokenSolicitacaoStorage = localStorage.getItem("tokenSolicitacao");
      if (!!tokenSolicitacaoStorage) {
        localStorage.setItem("tokenSolicitacao", tokenSolicitacaoStorage);
        setTokenSolicitacao(tokenSolicitacaoStorage);
      }
    }
  }, [tokenSolicitacao]);

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
        tokenSolicitacao,
        setTokenSolicitacao,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
