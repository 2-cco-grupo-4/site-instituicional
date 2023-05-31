import useStyles from "./Register.styles"
import Container from "atoms/Container"
import { FormControlLabel, Stack, Radio, RadioGroup, TextField, Typography, Grid, IconButton, SvgIcon, Button } from "@mui/material"
import LogoPicme from "atoms/LogoPicme"
import { useNavigate, useParams } from "react-router-dom"
import { DatePicker } from "@mui/x-date-pickers"
import CustomButton from "atoms/CustomButton"
import InputMask from "react-input-mask"
import { useState } from "react"
import goBackArrow from "assets/icons/go-back-arrow.svg"
import { ROUTES } from "utils/constants"

const Register = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { profileType } = useParams()
  const [profile, setProfile] = useState(profileType)
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [cpf, setCpf] = useState(null)
  const [phone, setPhone] = useState(null)
  const [password, setPassword] = useState('')

  const CONTENTS = [
    <TextField id="email-ipt" label="E-mail" />,
  
    <DatePicker id="data-ipt" label="Data de nascimento" format="DD/MM/YYYY"/>,
  
    <InputMask mask="999.999.999-99">
      {() => <TextField id="cpf-ipt" label="CPF"/>}
    </InputMask>,
  
    <InputMask mask="(99) 99999-9999">
      {() => <TextField id="phone-ipt" label="Telefone"/>}
    </InputMask>,
  
    <TextField id="password-ipt" type="password" label="Senha" />,
  
    <TextField id="verify-password-ipt" type="password" label="Confirmar Senha" />
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // fazer validações
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
                defaultValue={profileType} 
                onChange={(e) => setProfile(e.target.value)}
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
                <TextField id="name-ipt" label="Nome" sx={{marginBottom: 2}} width="100%" onChange={(e) => setName(e.target.value)}/>
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
              <CustomButton variant="contained" color="secondary" type="submit" fullWidth>Continuar</CustomButton>
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