import background from "assets/img/banner-perfil-fotografo.png";
import backgroundPerfil from "assets/img/foto-perfil-fotografo.png";
import { HEADER_HEIGHT } from "utils/constants";
import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  banner: {
    height: `calc(30vh - ${HEADER_HEIGHT})`,
    maxWidth: "100%",
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxSizing: "border-box",
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  fotoPerfil: {
    position: "absolute",
    top: theme.spacing(-11),
    backgroundColor: theme.palette.white.main,
    padding: theme.spacing(1),
    height: "fit-content",
    width: "fit-content",
    borderRadius: "50%",
  },
  textoCabecalho: {
    maxWidth: "100%",
    padding: theme.spacing(12, 4, 4),
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    position: "relative",
  },
  section: {
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  sectionOne: {
    maxWidth: "48.5%",
    border: "1px solid black",
    justifyContent: "center",
    borderRadius: "4px",
    padding: "4px",
  },
  sectionTwo: {
    maxWidth: "48.5%",
    justifyContent: "center",
    borderRadius: "4px",
    border: "1px solid black",
    padding: "4px",
  },
  avaliacoes: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "36px",
    paddingBottom: "64px",
  },
}));
