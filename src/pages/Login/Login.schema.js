import * as yup from 'yup'

export const userDataSchema = yup.object().shape({
  email: yup.string().email().required("Campo obrigatório"),
  senha: yup.string().max(50).required("Campo obrigatório")
}).required()