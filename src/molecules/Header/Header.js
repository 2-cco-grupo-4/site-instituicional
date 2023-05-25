import useStyles from "./Header.styles"
import logo from "assets/img/picme.png"
import OptionNav from "atoms/OptionNav"
import CustomButton from "atoms/CustomButton/CustomButton"
import { Box, Typography } from "@mui/material"
import { HEADER_HEIGHT } from "utils/constants"
import Container from "atoms/Container"
import { useUserContext } from "contexts"
import CustomPopover from "molecules/CustomPopover"

const Header = ({ type }) => {
  const classes = useStyles()
  const { isLogged } = useUserContext()

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
          <CustomPopover />
         ) : (
          type === 2 ? (
            <Box className={classes.navBotoes}>
             <Typography sx={{ marginRight: 2 }}>Já possui conta?</Typography>
             <CustomButton type="button" variant="outlined" sx={{ marginRight: 2 }} color="secondary">Login</CustomButton>
           </Box>
          ) : (
            <Box className={classes.navBotoes}>
                <CustomButton type="button" variant="outlined" sx={{ marginRight: 2 }} color="secondary">Login</CustomButton>
                <CustomButton type="button" variant="contained" color="primary">
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
