import useStyles from "./Register.styles"
import Container from "atoms/Container"
import { FormControlLabel, Stack, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import LogoPicme from "atoms/LogoPicme"
import { useNavigate, useParams } from "react-router-dom"
import CustomButton from "atoms/CustomButton"
import InputMask from "react-input-mask"
import { useState } from "react"
import goBackArrow from "assets/icons/go-back-arrow.svg"
import { ROUTES } from "utils/constants"
import { toTitleCase } from "utils/helpers/string"
import { userDataSchema } from "./Register.schema"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useTheme } from "@mui/styles"
import { useAsyncState } from "hooks/useAsyncState"
import { CLIENTE } from "service/user"

const defaultValue = {
  nome: '',
  email: '',
  dataNasc: '',
  cpf: '',
  numCelular: '',
  senha: '',
}

const Register = () => {
  const theme = useTheme()
  const classes = useStyles()
  const navigate = useNavigate()
  const { profileType } = useParams()

  const [profile, setProfile] = useState(profileType)
  const [userData, setUserData, getUserData] = useAsyncState(defaultValue)
  const [btnLoading, setBtnLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver: yupResolver(userDataSchema)})

  const handleChange = (e) => {
    if(e.target.name === "nome"){
      e.target.value = toTitleCase(e.target.value)
    }
  }

  const handleProfileChange = (e) => {
    setProfile(e.target.value)
    navigate(ROUTES.REGISTER(e.target.value))
  }

  const onSubmitHandler = async (data) => {
    setBtnLoading(true)

    const payload = {...data, dataNasc: data["dataNasc"].replace(/\//g,"-")}
    delete payload["confirmarSenha"]
    
    await CLIENTE.CADASTRAR(payload)
    .then(response => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })
  }


  return (
    <Stack direction="row" alignItems="top">
      <Stack className={classes.banner}>
        <Container py={4}>
          <img 
          src={goBackArrow} 
          alt="go-back-arrow" 
          style={{cursor: "pointer"}}
          onClick={() => navigate(ROUTES.HOME)}
          />
        </Container>
      </Stack>
      <Stack className={classes.content}>
        <Container component="form" onSubmit={handleSubmit(onSubmitHandler)} py={4}>
          <Stack width="100%" minHeight="100%" alignItems="center" spacing={3}>
            <LogoPicme height={36}/>
            <Typography variant="subtitle-small-semibold">Cadastre-se</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="paragraph-medium-light">Sou um:</Typography>
              <RadioGroup 
              row 
              aria-labelledby="radio-profile-type" 
              name="profile"
              onChange={handleProfileChange}
              defaultValue={profileType} 
              >
                <FormControlLabel 
                value="cliente" 
                control={<Radio />} 
                label={<Typography variant="paragraph-medium-light">Cliente</Typography>} />

                <FormControlLabel 
                value="fotografo" 
                control={<Radio />}  
                label={<Typography variant="paragraph-medium-light">Fotógrafo</Typography>} 
                />

              </RadioGroup>
            </Stack>
            <Stack justifyContent="top" width="100%" spacing={2}>
              <TextField 
              id="name-ipt"
              name="nome"
              {...register("nome")}
              error={!!errors.nome}
              helperText={errors.nome?.message}
              label="Nome" 
              width="100%" 
              onChange={handleChange}
              />
              <Stack spacing={2}>
                <Stack direction="row" width="100%" alignItems="top" spacing={2}>
                  <TextField 
                  id="email-ipt" 
                  name="email" 
                  label="E-mail" 
                  {...register("email")}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                  />

                  <InputMask 
                  {...register("dataNasc")}
                  onChange={handleChange} 
                  mask="99/99/9999"
                  >
                    {() => <TextField id="data-ipt" name="dataNasc" fullWidth
                    label="Data de nascimento" placeholder="DD/MM/AAAA" 
                    error={!!errors.dataNasc} helperText={errors.dataNasc?.message}
                    />}
                  </InputMask>
                </Stack>
                <Stack direction="row" width="100%" alignItems="top" spacing={2}>
                  <InputMask mask="999.999.999-99" {...register("cpf")} onChange={handleChange} >
                    {() => <TextField id="cpf-ipt" name="cpf" label="CPF" fullWidth error={!!errors.cpf}
                    helperText={errors.cpf?.message} />} 
                  </InputMask>
                  
                  <InputMask mask="(99) 99999-9999" {...register("numCelular")} onChange={handleChange}>
                  {() => <TextField id="phone-ipt" name="numCelular" label="Telefone" fullWidth
                  error={!!errors.numCelular} helperText={errors.numCelular?.message}/>}
                  </InputMask>
                </Stack>
                <Stack direction="row" width="100%" alignItems="top" spacing={2}>
                  <TextField 
                  id="password-ipt" 
                  name="senha" 
                  type="password" 
                  label="Senha" 
                  fullWidth
                  {...register("senha")}
                  onChange={handleChange}
                  error={!!errors.senha}
                  helperText={errors.senha?.message}
                  />

                  <TextField 
                  id="verify-password-ipt" 
                  name="confirmarSenha" 
                  type="password" 
                  label="Confirmar Senha" 
                  fullWidth
                  {...register("confirmarSenha")}
                  onChange={handleChange}
                  helperText={errors.confirmarSenha?.message}
                  error={!!errors.confirmarSenha}
                  />
                </Stack>
              </Stack>
            </Stack>
            <CustomButton loading={btnLoading} variant="contained" color="secondary" type="submit" fullWidth>
              Continuar
            </CustomButton>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography sx={{fontWeight: 300}}>
                Já tem cadastro? 
              </Typography>
              <Typography 
              color="primary" 
              onClick={() => navigate(ROUTES.LOGIN)}
              sx={{fontWeight: "bold", cursor: "pointer"}}
              >
                Fazer login
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </Stack>
  )
}

export default Register