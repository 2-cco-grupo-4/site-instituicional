import * as yup from "yup"

const today = new Date()
today.setHours(0, 0, 0, 0)

export const contractSchema = yup.object({
  tema: yup.string().required("Campo obrigatório"),
  data: yup.date().min(today, "Data inválida").required("Campo obrigatório"),
  horario: yup.string().required("Campo obrigatório"),
  cep: yup.string().required("Campo obrigatório"),
  estado: yup.string().required("Campo obrigatório"),
  cidade: yup.string().required("Campo obrigatório"),
  bairro: yup.string().required("Campo obrigatório"),
  rua: yup.string().required("Campo obrigatório"),
  numero: yup.string().required("Campo obrigatório"),
  complemento: yup.string(),
})
