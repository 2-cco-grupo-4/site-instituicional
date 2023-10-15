import useStyles from "./LogoPicme.styles";
import logoDash from "../../assets/icons/logo-picme-reduzida-branca.svg";
import logo from "../../assets/icons/logo-picme-azul.svg";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "utils/constants";

const LogoPicme = ({ height, dash, ...props }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <img
      src={dash ? logoDash : logo}
      onClick={() => handleNavigation(ROUTES.HOME)}
      className={classes.logo}
      alt="logo"
      height={height ?? 30}
      {...props}
    />
  );
};

export default LogoPicme;
