import useStyles from "./LogoPicme.styles"
import logo from "../../assets/icons/logo-picme-reduzida-branca.svg";
import { useNavigate } from "react-router-dom"
import { ROUTES } from "utils/constants"

const LogoPicme = ({ height, ...props }) => {
  const classes = useStyles()
  const navigate = useNavigate()

  const handleNavigation = (route) => {
    navigate(route)
  }

  return (
    <img
      src={logo}
      onClick={() => handleNavigation(ROUTES.HOME)}
      className={classes.logo}
      alt="logo"
      height={height ?? 45}
      {...props}
    />
  )
}

export default LogoPicme