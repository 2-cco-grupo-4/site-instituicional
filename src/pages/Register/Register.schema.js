import * as yup from 'yup'

const userDataSchema = yup.object({
  nome: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  dataNasc: yup.string().required("Campo obrigatório"),
  cpf: yup.string().required("Campo obrigatório"),
  numCelular: yup.string().required("Campo obrigatório"),
  senha: yup.string().required("Campo obrigatório")
}).required()

export { userDataSchema }