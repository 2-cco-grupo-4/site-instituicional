import * as yup from 'yup'

const userDataSchema = yup.object({
  nome: yup.string().required("Campo obrigatório").min(1, "Nome inválido").max(32, "Máximo 32 caractéres"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  dataNasc: yup.string().required("Campo obrigatório"),
  cpf: yup.string().required("Campo obrigatório"),
  numCelular: yup.string().required("Campo obrigatório"),
  senha: yup.string().required("Campo obrigatório").min(8,"Mínimo de 8 caractéres").max(32, "Máximo de 32 caractéres"),
  confirmarSenha: yup.string().oneOf([yup.ref('senha'), null], 'Senhas não coincidem').required("Campo obrigatório")
}).required()

export { userDataSchema }