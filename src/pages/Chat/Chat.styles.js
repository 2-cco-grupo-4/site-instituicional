import { makeStyles } from "@mui/styles";
import backgroundPerfil from "assets/img/foto-perfil-fotografo.png";

export default makeStyles(() => ({
  sectionOne: {
    maxWidth: "40%",
    borderLeft: "1px solid grey",
  },
  boxPerfil: {
    // border: "1px solid red",
    borderTop: "1px solid grey",
    height: "84px",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
  },
  chatContainer: {
    display: "flex",
    padding: "12px",
    border: "2px solid black",
    borderLeft: "0px",
    borderRight: "0px",
  },
  sectionTwo: {
    maxWidth: "60%",
    height: "30px",
    border: "1px solid red",
  },
}));
