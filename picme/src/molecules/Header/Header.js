import { useStyles } from "./Header.styles"
import logo from "assets/img/picme.png"
import OptionNav from "atoms/OptionNav"
import CustomButton from "atoms/CustomButton/CustomButton"
import { Box } from "@mui/material"
import { HEADER_HEIGHT } from "constants/header"

const Header = () => {
  const classes = useStyles();

  return (
    <Box px={6} sx={classes.navbar}>
      <Box 
      height={HEADER_HEIGHT} 
      width='100%' 
      bgcolor={'#fff'}
      display='flex' 
      alignItems='center' 
      justifyContent='space-between'
      >
        <img src={logo} style={classes.logo} alt="logo" />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <OptionNav title="Galeria" navigation="#galeria" />
          <OptionNav title="Quem Somos" navigation="#quem-somos" />
          <OptionNav title="Produto" navigation="#produto" />
          <OptionNav title="Explorar" navigation="#explorar" />
        </Box>
        <div style={classes.navBotoes}>
          <CustomButton type="button" variant="outlined" sx={{ marginRight: 2 }} color="secondary">Login</CustomButton>
          <CustomButton type="button" variant="contained" color="primary">Cadastro</CustomButton>
        </div>
      </Box>
    </Box>
  )
}

export default Header
