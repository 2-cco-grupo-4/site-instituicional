import { makeStyles } from "@mui/styles";
import backgroundPerfil from "assets/img/foto-perfil-fotografo.png";


export default makeStyles(() => ({
  sectionOne: {
    maxWidth: "30%",

  },
  sectionTwo: {
    maxWidth: "70%",
    height: "30px",
    border: "1px solid red",
  },
  conversation: {
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid red",
    height: "38px",
  },
  boxChat: {
    border: "1px solid red",
    height: "52px",
  },
  fotoPerfil: {
    width: "50px",
    height: "50px",
    backgroundImage: `url(${backgroundPerfil})`,
    backgroundSize: "cover",
  }
}));
