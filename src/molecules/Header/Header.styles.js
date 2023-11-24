import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  navbar: {
    backgroundColor: theme.palette.white.main,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.gray.main,
    // boxShadow: '0 1px 16px rgba(0,0,0,0.2)',
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  navbarNav: {
    width: "30%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  navBotoes: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  search: {
    width: "35vw",
    backgroundColor: theme.palette.gray.main,
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    boxShadow: "inset 0px 0px 4px rgba(0, 0, 0, 0.25)",
    "& > img": {
      margin: theme.spacing(1),
    },
    "& .MuiInputBase-input": {
      minWidth: "auto",
      width: "25vw",
    },
  },
  busca: {
    height: "70%",
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  navbarNavApp: {
    width: "auto",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbarBotoesApp: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  navbarLinksApp: {
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    fontSize: "14px",
  },
}));
