import useStyles from "./Header.styles"
import OptionNav from "atoms/OptionNav"
import CustomButton from "atoms/CustomButton/CustomButton"
import { Box, Typography, Stack, InputBase } from "@mui/material"
import { HEADER_HEIGHT, ROUTES } from "utils/constants"
import Container from "atoms/Container"
import { useUserContext } from "contexts"
import { useNavigate } from "react-router-dom"
import CustomPopover from "molecules/CustomPopover"
import LogoPicme from "atoms/LogoPicme"
import iconSearch from "assets/icons/search.svg"

const Header = ({ type }) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { autenticado } = useUserContext()

  const handleNavigation = (route) => {
    navigate(route)
  }

  const Content = () => {
    switch (type) {
      case 1:
        return (
          <Box className={classes.navbarNav}>
            <OptionNav title="Galeria" navigation="#galeria" />
            <OptionNav title="Quem Somos" navigation="#quem-somos" />
            <OptionNav title="Produto" navigation="#produto" />
            <OptionNav title="Explorar" navigation="#explorar" />
          </Box>
        )
      case 2: 
        return (
          <Box className={classes.search}>
            <img src={iconSearch} alt="search-icon" />
            <InputBase placeholder="Pesquise imagens do seu interesse" inputProps={{"aria-label": "search"}}/>
          </Box>
        )
      case 3: 
        return <></>
    }
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
        <Content />
        {autenticado ? 
         (
          <CustomPopover>
            <Stack>Sair</Stack>
          </CustomPopover>
         ) : (
          type === 3 ? (
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
