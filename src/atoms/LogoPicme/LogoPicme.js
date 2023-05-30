import useStyles from "./LogoPicme.styles"
import logo from "assets/img/picme.png"
import { useNavigate } from "react-router-dom"

const LogoPicme = ({ route, ...props }) => {
  const classes = useStyles()
  const navigate = useNavigate()

  const handleNavigation = () => {
    navigate(route)
  }

  return (
    <img 
    src={logo} 
    onClick={() => handleNavigation(route)} 
    className={classes.logo} 
    alt="logo" 
    {...props} 
    />
  )
}

export default LogoPicme