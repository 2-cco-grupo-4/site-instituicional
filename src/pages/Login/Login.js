import useStyles from "./Login.styles"
import Container from "atoms/Container"
import { Box, Stack, TextField, Typography, useTheme } from "@mui/material"
import LogoPicme from "atoms/LogoPicme"
import { useNavigate } from "react-router-dom"
import CustomButton from "atoms/CustomButton"
import { useState } from "react"
import goBackArrow from "assets/icons/go-back-arrow.svg"
import { ROUTES } from "utils/constants"
import { userDataSchema } from "./Login.schema"

const Login = () => {
  const theme = useTheme()
  const classes = useStyles()
  const navigate = useNavigate()

  const defaultValue = {
    email: '',
    senha: '',
  }

  const [userData, setUserData] = useState(defaultValue)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    console.log(name, value)
    setUserData(values => ({...values, [name]: value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    userDataSchema.isValid(userData).then(
      console.log(userData)
    )
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
        <Container 
        component="form"
        onSubmit={handleSubmit} 
        py={4} 
        width="100%" 
        height="100vh" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        flexDirection="column"
        >
            <Box sx={{
              position: "absolute",
              top: theme.spacing(4)
            }}>
              <LogoPicme />
            </Box>

            <Stack width="100%" alignItems="center" spacing={3}>
              <Typography variant="subtitle-small-semibold">Login</Typography>
              <Stack width="100%" justifyContent="center">
                <TextField 
                id="email-ipt" 
                name="email" 
                label="E-mail" 
                width="auto" 
                sx={{marginBottom: 2}} 
                onChange={handleChange}
                />
                <TextField id="password-ipt" name="senha" type="password" label="Senha" onChange={handleChange}/>
              </Stack>
              <CustomButton variant="contained" color="secondary" type="submit" fullWidth>
                Entrar
              </CustomButton>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography sx={{fontWeight: 300}}>
                  Não tem um cadastro? 
                </Typography>
                <Typography 
                color="primary" 
                onClick={() => navigate(ROUTES.REGISTER("cliente"))}
                sx={{fontWeight: "bold", cursor: "pointer"}}
                >
                  Cadastre-se
                </Typography>
              </Stack>
            </Stack>
        </Container>
      </Stack>
    </Stack>
  )
}

export default Login