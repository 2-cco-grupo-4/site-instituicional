import background from "assets/img/banner-fotografo.jpg";
import { HEADER_HEIGHT } from "utils/constants";
import { makeStyles } from "@mui/styles";
// import useMediaQuery from '@mui/material/useMediaQuery'

export default makeStyles((theme) => ({
  banner: {
    height: `calc(100vh - ${HEADER_HEIGHT})`,
    width: "100%",
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxSizing: "border-box",
    [theme.breakpoints.down("md")]: {
      height: `calc(60vh - ${HEADER_HEIGHT})`,
    },
    [theme.breakpoints.down("sm")]: {
      backgroundSize: "cover",
      height: `calc(50vh - ${HEADER_HEIGHT})`,
    },
  },
  separator: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.white.main,
    boxShadow: "0 1px 16px 0px rgba(0,0,0,0.5)",
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  pointer: {
    position: "absolute",
    zIndex: 10,
    width: 0,
    height: 0,
    top: "98%",
    border: "16px solid transparent",
    borderTopColor: theme.palette.secondary.main,
  },
  section: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  sectionInvertida: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "row-reverse",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  pastedPhoto: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: theme.spacing(8),
    },
  },
  pastedPhotoInvertida: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      width: "70%",
      marginTop: theme.spacing(8),
    },
  },

  /* 
    Medias Querys:
    320px — 480px: dispositivos móveis
    481px — 768px: iPads, tablets
    769px — 1024px: telas pequenas, laptops
    1025px — 1200px: desktops, telas grandes
    1201px e acima —  telas muito grandes, TVs
  */
}));
