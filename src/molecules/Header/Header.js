import useStyles from "./Header.styles"
import OptionNav from "atoms/OptionNav"
import CustomButton from "atoms/CustomButton/CustomButton"
import { Box, Typography, Stack } from "@mui/material"
import { HEADER_HEIGHT, ROUTES } from "utils/constants"
import Container from "atoms/Container"
import { useUserContext } from "contexts"
import { useNavigate } from "react-router-dom"
import CustomPopover from "molecules/CustomPopover"
import LogoPicme from "atoms/LogoPicme"

const Header = ({ type }) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { autenticado } = useUserContext()

  const handleNavigation = (route) => {
    navigate(route)
  }

  return (
    <Container 
    height={HEADER_HEIGHT}    
    bgcolor="white.main"
    display='flex' 
    alignItems='center' 
    justifyContent='space-between'
    position="sticky"
    top={0}
    zIndex={1000}
    className={classes.navbar}
    >
        <LogoPicme />
        {type === 1 && 
          <Box display="flex" alignItems="center" justifyContent="space-between" className={classes.navbarNav}>
            <OptionNav title="Galeria" navigation="#galeria" />
            <OptionNav title="Quem Somos" navigation="#quem-somos" />
            <OptionNav title="Produto" navigation="#produto" />
            <OptionNav title="Explorar" navigation="#explorar" />
          </Box>
        }
        {autenticado ? 
         (
          <CustomPopover children={
            <Stack>Sair</Stack>
          } />
         ) : (
          type === 2 ? (
            <Box className={classes.navBotoes}>
              <Typography sx={{ marginRight: 2 }}>Já possui conta?</Typography>
              <CustomButton type="button" onClick={() => handleNavigation(ROUTES.LOGIN)} variant="outlined"color="secondary">
                Login
              </CustomButton>
           </Box>
          ) : (
            <Box className={classes.navBotoes}>
                <CustomButton 
                type="button" 
                onClick={() => handleNavigation(ROUTES.LOGIN)} 
                variant="outlined" 
                sx={{ marginRight: 2 }} 
                color="secondary"
                >
                  Login
                </CustomButton>
                <CustomButton 
                type="button" 
                onClick={() => handleNavigation(ROUTES.CHOOSE_PROFILE)} 
                variant="contained" 
                color="primary"
                >
                  Cadastro
                </CustomButton>
            </Box>
          )
         )
        }
          
    </Container>
  )
}

export default Header
