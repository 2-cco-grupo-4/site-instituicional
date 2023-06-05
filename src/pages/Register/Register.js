import useStyles from "./Register.styles"
import Container from "atoms/Container"
import { FormControlLabel, Stack, Radio, RadioGroup, TextField, Typography, Grid } from "@mui/material"
import LogoPicme from "atoms/LogoPicme"
import { useNavigate, useParams } from "react-router-dom"
import CustomButton from "atoms/CustomButton"
import InputMask from "react-input-mask"
import { useState } from "react"
import goBackArrow from "assets/icons/go-back-arrow.svg"
import { ROUTES } from "utils/constants"
import { toTitleCase } from "utils/string"
import { userDataSchema } from "./Register.schema"

const defaultValue = {
  nome: '',
  email: '',
  dataNasc: '',
  cpf: '',
  numCelular: '',
  senha: '',
}

const Register = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { profileType } = useParams()

  const [profile, setProfile] = useState(profileType)
  const [userData, setUserData] = useState(defaultValue)
  const [confirmarSenha, setConfirmarSenha] = useState('')

  const handleChange = (e) => {
    const name = e.target.name

    if(name === "nome"){
      e.target.value = toTitleCase(e.target.value)
    }

    const value = e.target.value

    console.log(name, value)
    setUserData(values => ({...values, [name]: value}))
  }

  const handleProfileChange = (e) => {
    setProfile(e.target.value)
  }

  const CONTENTS = [
    <TextField id="email-ipt" name="email" label="E-mail" onChange={handleChange}/>,
  
    <InputMask 
    onChange={handleChange} 
    mask="99/99/9999"
    >
      {() => <TextField id="data-ipt" name="dataNasc"
    label="Data de nascimento" placeholder="DD/MM/AAAA" />}
    </InputMask>,
  
    <InputMask mask="999.999.999-99" onChange={handleChange}>
      {() => <TextField id="cpf-ipt" name="cpf" label="CPF" />}
    </InputMask>,
  
    <InputMask mask="(99) 99999-9999" onChange={handleChange}>
      {() => <TextField id="phone-ipt" name="numCelular" label="Telefone"/>}
    </InputMask>,
  
    <TextField id="password-ipt" name="senha" type="password" label="Senha" onChange={handleChange}/>,
  
    <TextField 
    id="verify-password-ipt" 
    name="confirmarSenha" 
    type="password" 
    label="Confirmar Senha" 
    onChange={(e) => setConfirmarSenha(e.target.value)}
    />
  ]  

  const handleSubmit = (e) => {
    e.preventDefault()
    setUserData(current => ({...current, dataNasc: userData["dataNasc"].replace(/\//g,"-")}))
    userDataSchema.isValid(userData).then((valid) => {
      if(valid) {
        console.log(userData)
      }
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
        <Container py={4}>
          <form onSubmit={handleSubmit}>
            <Stack width="100%" minHeight="100%" alignItems="center" spacing={3}>
              <LogoPicme />
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
              <Stack justifyContent="center">
                <TextField 
                id="name-ipt"
                inputProps={{
                  name: "nome"
                }}
                label="Nome" 
                sx={{marginBottom: 2}} 
                width="100%" 
                onChange={handleChange}
                />
                <Grid container rowSpacing={2} columnSpacing={{ xs: 2 }}>
                  {
                    CONTENTS.map((content, index) => (
                      <Grid item xs={6} key={index}>
                        {content}
                      </Grid>
                    ))
                  }
                </Grid>
              </Stack>
              <CustomButton variant="contained" color="secondary" type="submit" fullWidth>
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
          </form>
        </Container>
      </Stack>
    </Stack>
  )
}

export default Register