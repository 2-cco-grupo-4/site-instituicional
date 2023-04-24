import { useStyles } from "./Header.styles"
import logo from "assets/img/picme.png"
import OptionNav from "atoms/OptionNav"
import Button from "atoms/Button"


const Header = () => {
  const classes = useStyles();

  return (
    <nav style={classes.navbar}>
        <div style={classes.menu}>
            <img src={logo} style={classes.logo} alt="logo" />
            <div style={classes.navbarNav}>
              <OptionNav title="Galeria" navigation="#galeria" />
              <OptionNav title="Quem Somos" navigation="#quem-somos" />
              <OptionNav title="Produto" navigation="#produto" />
              <OptionNav title="Explorar" navigation="#explorar" />
            </div>
            <div style={classes.navBotoes}>
                <Button style={classes.btnLogin} title="Login" onClick="location.href='login.html'" color="secondary"/>
                <Button title="Cadastro" onClick="location.href='login.html'" color="primary"/>
            </div>
        </div>
    </nav>
  )
}

export default Header
