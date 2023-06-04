import useStyles from "./Header.styles"
import logo from "assets/img/picme.png"
import OptionNav from "atoms/OptionNav"
import CustomButton from "atoms/CustomButton/CustomButton"
import { Box, Typography, Stack } from "@mui/material"
import { HEADER_HEIGHT } from "utils/constants"
import Container from "atoms/Container"
import { useUserContext } from "contexts"
import { useNavigate } from "react-router-dom"
import CustomPopover from "molecules/CustomPopover"

const Header = ({ type }) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { isLogged } = useUserContext()

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
        <img src={logo} onClick={() => handleNavigation("/")} className={classes.logo} alt="logo" />
        {type === 1 && 
          <Box display="flex" alignItems="center" justifyContent="space-between" className={classes.navbarNav}>
            <OptionNav title="Galeria" navigation="#galeria" />
            <OptionNav title="Quem Somos" navigation="#quem-somos" />
            <OptionNav title="Produto" navigation="#produto" />
            <OptionNav title="Explorar" navigation="#explorar" />
          </Box>
        }
        {isLogged ? 
         (
          <CustomPopover children={
            <Stack>Sair</Stack>
          } />
         ) : (
          type === 2 ? (
            <Box className={classes.navBotoes}>
             <Typography sx={{ marginRight: 2 }}>Já possui conta?</Typography>
             <CustomButton type="button" onClick={() => handleNavigation("/login")} variant="outlined" sx={{ marginRight: 2 }} color="secondary">Login</CustomButton>
           </Box>
          ) : (
            <Box className={classes.navBotoes}>
                <CustomButton type="button" onClick={() => handleNavigation("/login")} variant="outlined" sx={{ marginRight: 2 }} color="secondary">Login</CustomButton>
                <CustomButton type="button" onClick={() => handleNavigation("/persona")} variant="contained" color="primary">
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
