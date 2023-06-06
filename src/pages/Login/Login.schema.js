import * as yup from 'yup'

export const userDataSchema = yup.object({
  email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
  senha: yup.string().required("Campo obrigatório").min(8,"Mínimo de 8 caractéres").max(32, "Máximo de 32 caractéres"),
}).required()