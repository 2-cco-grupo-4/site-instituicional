import useStyles from "./Header.styles"
import logo from "assets/img/picme.png"
import OptionNav from "atoms/OptionNav"
import CustomButton from "atoms/CustomButton/CustomButton"
import { Box } from "@mui/material"
import { HEADER_HEIGHT } from "utils/constants"
import Container from "atoms/Container"

const Header = () => {
  const classes = useStyles()

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
        <img src={logo} className={classes.logo} alt="logo" />
        <Box display="flex" alignItems="center" justifyContent="space-between" className={classes.navbarNav}>
          <OptionNav title="Galeria" navigation="#galeria" />
          <OptionNav title="Quem Somos" navigation="#quem-somos" />
          <OptionNav title="Produto" navigation="#produto" />
          <OptionNav title="Explorar" navigation="#explorar" />
        </Box>
        <div className={classes.navBotoes}>
          <CustomButton type="button" variant="outlined" sx={{ marginRight: 2 }} color="secondary">Login</CustomButton>
          <CustomButton type="button" variant="contained" color="primary">Cadastro</CustomButton>
        </div>
    </Container>
  )
}

export default Header
