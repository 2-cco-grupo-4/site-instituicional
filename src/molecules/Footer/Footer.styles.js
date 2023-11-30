import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  footer: {
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.white.main,
    position: "relative",
    marginTop: "auto",
  },
  nav: {
    textDecoration: "none !important",
    color: "inherit !important",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline !important",
    },
  },
}));
