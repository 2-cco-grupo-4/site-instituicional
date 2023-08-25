import background from "assets/img/banner-perfil-fotografo.png";
import backgroundPerfil from "assets/img/foto-perfil-fotografo.png";
import { HEADER_HEIGHT } from "utils/constants";
import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  banner: {
    height: `calc(30vh - ${HEADER_HEIGHT})`,
    maxWidth: "100%",
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxSizing: "border-box",
  },
  cabecalho: {
    width: "150px",
    height: "150px",
    backgroundImage: `url(${backgroundPerfil})`,
    objectFit: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "50%",
    position: "absolute",
    top: "150px",
    alignSelf: "center",
  },
}));
